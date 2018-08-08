import R from 'ramda';
import { Platform } from 'react-native';
import {
  getUser,
  getUsers,
  getUserById,
  updateUserById,
  createUser,
  updateUserProfile,
  updateUserPassword,
  deleteUserById,
  adminResetPassword,
  modifyCompany,
  createCompany,
  getSMSCode,
} from '../services/api';
import { transformSorter } from '../utils/';
import { uploadImage } from '../services/upload';

export default {
  namespace: 'user',

  state: {
    index: null,
    show: null,
    currentUser: {},
  },

  effects: {
    *index({ payload = {} }, { call, put }) {
      try {
        let req = {
          ...payload,
        };
        if (payload.sorter) {
          req = R.omit(['sorter'])(req);
          req.sort = transformSorter(payload.sorter);
        }
        const res = yield call(getUsers, req);
        yield put({
          type: 'list',
          payload: res.data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *create({ payload, callback }, { call, put }) {
      try {
        const res = {
          ...payload,
          role: R.pathOr(null, ['role', 'name'])(payload),
          permissions: payload.permissions.map(i => ({
            name: i,
          })),
        };
        yield call(createUser, res);
        yield put({
          type: 'index',
        });
        if (callback) {
          callback();
        }
      } catch (e) {
        console.log(e);
      }
    },
    *fetchUserById({ payload }, { call, put }) {
      try {
        const user = yield call(getUserById, payload);
        yield put({
          type: 'show',
          payload: user.data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *fetchCurrent(_, { call, put }) {
      try {
        const { data } = yield call(getUser);

        // sensor login and set profile
        global.s().login(`${data.id}`);
        const company = R.path(['companies', 0])(data);
        global.s()[Platform.OS === 'ios' ? 'set' : 'profileSet']({
          realname: data.realname,
          companyName: company.name,
          companyID: company.id,
        });

        yield put({
          type: 'saveCurrentUser',
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 更改自己的用户信息
     * @param payload
     * @param callback
     * @param call
     * @param put
     */
    *updateUserProfile({ payload, callback }, { call, put }) {
      try {
        let uploadRes;
        /**
         * 上传头像
         */
        if (payload.avatar_url) {
          uploadRes = yield call(uploadImage, {
            image: payload.avatar_url,
            type: 'avatar',
          });
        }
        yield call(updateUserProfile, {
          ...payload,
          avatar_url: R.prop('url')(R.head()(uploadRes || [])),
        });
        yield put({
          type: 'fetchCurrent',
        });
        if (callback) {
          callback();
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 修改用户库中的用户信息
     * @param payload
     * @param callback
     * @param call
     * @param put
     */
    *updateUserById({ payload, callback }, { call, put }) {
      try {
        let permissions = null;
        if (payload.permissions) {
          permissions = payload.permissions.map(i => ({
            name: i,
          }));
        }

        const user = yield call(updateUserById, {
          ...payload,
          permissions,
          role: R.pathOr(null, ['role', 'name'])(payload),
        });
        yield put({
          type: 'show',
          payload: user.data,
        });
        if (callback) {
          callback();
          console.log('user', user);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *changeUserPassword({ payload, callback }, { call, put }) {
      try {
        yield call(updateUserPassword, payload);
        if (callback) {
          callback();
        }
        yield put({
          type: 'login/logout',
        });
      } catch (e) {
        console.log(e);
      }
    },
    *deleteUser({ payload, callback }, { call }) {
      try {
        yield call(deleteUserById, payload);
        if (callback) {
          callback();
        }
      } catch (e) {
        console.log(e);
      }
    },
    *adminResetPassword({ payload, callback }, { call }) {
      try {
        yield call(adminResetPassword, payload);
        if (callback) {
          callback();
        }
      } catch (e) {
        console.log(e);
      }
    },
    *createCompany({ payload, callback }, { call }) {
      try {
        yield call(createCompany, {
          ...payload,
        });
        if (callback) {
          callback();
        }
      } catch (error) {
        console.log(error);
      }
    },
    *updateCompany({ payload, callback }, { call, put }) {
      try {
        yield call(modifyCompany, {
          ...payload,
        });
        yield put({
          type: 'fetchCurrent',
        });
        if (callback) {
          callback();
        }
      } catch (error) {
        console.log(error);
      }
    },
    *sendSMS({ payload, callback }, { call }) {
      try {
        yield call(getSMSCode, payload);
        if (callback) {
          callback();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  reducers: {
    list(state, action) {
      return {
        ...state,
        index: action.payload,
      };
    },
    show(state, action) {
      return {
        ...state,
        show: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
