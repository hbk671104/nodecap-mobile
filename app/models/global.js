import * as R from 'ramda';
import { NavigationActions } from 'react-navigation';
import JPush from 'jpush-react-native';
// import Config from 'react-native-config';
import Config from '../runtime';

import { getConstants, getAllPermissions, getAllRoles } from '../services/api';
import { initKeychain } from '../utils/keychain';
import request from '../utils/request';
// import { Storage } from '../utils';

export default {
  namespace: 'global',

  state: {
    title: 'Hotnode',
    constants: null,
    projectTags: [],
    financeStage: [],
    permissions: [],
    roles: [],
  },

  effects: {
    *bootstrap({ callback, fromLogin = false }, { call, put, select }) {
      try {
        // put => non-blocking, put.resolve => blocking
        yield put.resolve({
          type: 'initial',
        });

        if (fromLogin) {
          yield put(NavigationActions.back());
        } else {
          const in_individual = yield select(state =>
            R.path(['login', 'in_individual'])(state),
          );

          yield put(
            NavigationActions.navigate({
              routeName: in_individual ? 'Individual' : 'Main',
            }),
          );
        }

        if (callback) {
          yield call(callback);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *startup({ callback }, { call, put }) {
      try {
        yield put.resolve({
          type: 'getConstant',
        });

        // sensor set profile
        global.setProfile({
          client_type: '个人版',
        });

        yield put(
          NavigationActions.navigate({
            routeName: 'Individual',
          }),
        );

        if (callback) {
          yield call(callback);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *initial(_, { select, put }) {
      const in_individual = yield select(state =>
        R.path(['login', 'in_individual'])(state),
      );

      if (R.isNil(request.defaults.headers.common.Authorization)) {
        const token = yield select(state => R.path(['login', 'token'])(state));
        request.defaults.headers.common.Authorization = `Bearer ${token}`;
      }

      try {
        yield put.resolve({
          type: in_individual ? 'initIndividualEnd' : 'initInstitutionEnd',
        });
      } catch (e) {
        console.log(e);
      }
    },
    *getPermission(_, { call, put }) {
      try {
        const res = yield call(getAllPermissions);

        yield put({
          type: 'getPermissions',
          payload: res.data,
        });
      } catch (error) {
        console.log(error);
      }
    },
    *getConstant(_, { call, put }) {
      try {
        const res = yield call(getConstants);

        yield put({
          type: 'getConstants',
          payload: res.data,
        });
      } catch (error) {
        console.log(error);
      }
    },
    *initRealm({ callback }, { call }) {
      try {
        yield call(initKeychain);
        if (callback) {
          callback();
        }
      } catch (error) {
        console.log(error);
      }
    },
    *initIndividualEnd({ callback }, { call, put, select, all }) {
      try {
        // http header config
        request.defaults.baseURL = Config.API_INDIVIDUAL_URL;
        request.defaults.headers.common['X-Company-ID'] = null;

        const companies = yield select(state =>
          R.path(['login', 'companies'])(state),
        );
        const user = yield select(state =>
          R.path(['user', 'currentUser'])(state),
        );

        // sensor input
        const realname = R.path(['realname'])(user);
        const user_id = R.path(['id'])(user);
        const companyName = R.pathOr('void', [0, 'name'])(companies);
        const companyID = R.pathOr(0, [0, 'id'])(companies);
        const input = {
          realname,
          companyName,
          companyID,
        };
        global.s().login(`${user_id}`);
        global.setProfile({
          ...input,
          client_type: '个人版',
        });

        // JPush
        JPush.setAlias(`user_${user_id}`, () => null);
        JPush.cleanTags(() => null);

        // constant
        yield all([
          put.resolve({
            type: 'getConstant',
          }),
          put.resolve({
            type: 'user/fetchCurrent',
          }),
        ]);

        if (callback) {
          yield call(callback);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *initInstitutionEnd({ callback }, { call, put, all, select }) {
      try {
        // http headers
        request.defaults.baseURL = Config.API_URL;
        const companies = yield select(state =>
          R.path(['login', 'companies'])(state),
        );
        const companyID = R.pathOr(0, [0, 'id'])(companies);
        request.defaults.headers.common['X-Company-ID'] = companyID;

        const user = yield select(state =>
          R.path(['user', 'currentUser'])(state),
        );

        // sensor input
        const realname = R.path(['realname'])(user);
        const user_id = R.path(['id'])(user);
        const companyName = R.pathOr('void', [0, 'name'])(companies);
        const input = {
          realname,
          companyName,
          companyID,
        };
        global.s().login(`${user_id}`);
        global.setProfile({
          ...input,
          client_type: '企业版',
        });

        // JPush
        JPush.setAlias(`user_${user_id}`, () => null);
        JPush.setTags([`company_${companyID}`], () => null);

        yield all([
          put.resolve({
            type: 'getConstant',
          }),
          put.resolve({
            type: 'getPermission',
          }),
          put.resolve({
            type: 'user/fetchCurrent',
          }),
          put.resolve({
            type: 'fund/fetch',
          }),
          put.resolve({
            type: 'roles',
          }),
        ]);

        if (callback) {
          yield call(callback);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *roles({ callback }, { call, put }) {
      try {
        const res = yield call(getAllRoles);
        yield put({
          type: 'getRoles',
          payload: res.data,
        });
        if (callback) {
          callback();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  reducers: {
    getConstants(state, { payload }) {
      return {
        ...state,
        constants: payload,
      };
    },
    getPermissions(state, { payload }) {
      return {
        ...state,
        permissions: payload,
      };
    },
    getFinanceStage(state, { payload }) {
      return {
        ...state,
        financeStage: payload,
      };
    },
    getProjectTags(state, { payload }) {
      return {
        ...state,
        projectTags: payload,
      };
    },
    getRoles(state, { payload }) {
      return {
        ...state,
        constants: {
          ...state.constants,
          roles: payload,
        },
      };
    },
  },
};
