import R from 'ramda';
import {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} from '../services/api';

const paginate = (state, action, key) => {
  const oldData = R.pathOr([], [key, 'index', 'data'])(state);
  const newData = R.pathOr([], ['payload', 'data'])(action);
  const pagination = R.pathOr({}, ['payload', 'pagination'])(action);

  if (R.path(['current'])(pagination) === 1) {
    return action.payload;
  }

  return {
    ...action.payload,
    data: R.concat(oldData, newData),
  };
};

export default {
  namespace: 'colleague',
  state: {
    list: null,
    search: null,
    current: null,
  },
  effects: {
    /**
     * 用户列表
     * @param payload
     * @param call
     * @param put
     */
    *index({ payload = {} }, { call, put }) {
      try {
        const res = yield call(getUsers, payload);
        yield put({
          type: 'list',
          payload: res.data,
          params: payload,
        });
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * 用户搜索
     * @param payload
     * @param call
     * @param put
     */
    *search({ payload = {}, callback }, { call, put }) {
      try {
        const res = yield call(getUsers, payload);
        yield put({
          type: 'searchlist',
          payload: res.data,
          params: payload,
        });

        if (callback) {
          yield call(callback, res.data);
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * 用户详情
     * @param payload
     * @param callback
     * @param call
     * @param put
     * @param all
     */
    *get({ payload, callback }, { call, put }) {
      try {
        const res = yield call(getUserById, payload);
        yield put({
          type: 'detail',
          payload: res.data,
        });

        if (callback) {
          yield call(callback, res.data);
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * 创建用户
     * @param payload
     * @param callback
     * @param call
     */
    *create({ payload, callback }, { call, put }) {
      try {
        const res = yield call(createUser, {
          ...payload,
        });

        yield put({
          type: 'refresh',
        });

        if (callback) {
          yield call(callback, res.data);
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * 更新用户
     * @param id
     * @param payload
     * @param callback
     * @param call
     */
    *save({ payload, callback }, { call, put, take }) {
      try {
        const res = yield call(updateUserById, {
          ...payload,
        });

        yield put({
          type: 'get',
          payload: payload.id,
        });
        yield take('get/@@end');

        yield put({
          type: 'refresh',
        });

        if (callback) {
          yield call(callback, res.data);
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * 删除用户
     * @param id
     * @param callback
     * @param call
     */
    *delete({ payload, callback }, { put, call }) {
      try {
        const res = yield call(deleteUserById, payload);

        yield put({
          type: 'refresh',
        });

        if (callback) {
          yield call(callback, res.data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *refresh({ payload, callback }, { all, put, call, select }) {
      try {
        // search
        const search = yield select(state =>
          R.path(['resource', 'search'])(state),
        );
        if (!R.isNil(search)) {
          yield put({
            type: 'search',
            payload: search.params,
          });
        }

        // refresh all
        yield put({
          type: 'index',
        });

        if (callback) {
          yield call(callback);
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
        list: {
          index: paginate(state, action, 'list'),
          params: action.params,
        },
      };
    },
    detail(state, action) {
      return {
        ...state,
        current: action.payload,
      };
    },
    searchlist(state, action) {
      return {
        ...state,
        search: {
          index: action.payload,
          params: action.params,
        },
      };
    },
    clearCurrent(state) {
      return {
        ...state,
        current: null,
      };
    },
    clearSearch(state) {
      return {
        ...state,
        search: null,
      };
    },
  },
};
