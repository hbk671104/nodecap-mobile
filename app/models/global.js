import axios from 'axios';
import * as R from 'ramda';
import { NavigationActions } from 'react-navigation';

import { getConstants, getAllPermissions, getAllRoles } from '../services/api';
import { initKeychain } from '../utils/keychain';
import { Storage } from '../utils';

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
    *bootstrap({ callback, fromLogin = false }, { call, put, all, select }) {
      try {
        // put => non-blocking, put.resolve => blocking
        yield all([
          put.resolve({
            type: 'startup',
          }),
          put.resolve({
            type: 'initial',
          }),
        ]);

        // const recommended = yield call(
        //   Storage.get,
        //   'project_recommended',
        //   false,
        // );

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
    *startup(_, { put, call }) {
      try {
        const res = yield call(getConstants);

        yield put({
          type: 'getConstants',
          payload: res.data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *initial(_, { select, put, call, all }) {
      const token = yield select(state => state.login.token);
      const companies = yield select(state => state.login.companies);
      const in_individual = yield select(state =>
        R.path(['login', 'in_individual'])(state),
      );

      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        axios.defaults.headers.common['X-Company-ID'] = in_individual
          ? null
          : R.path([0, 'id'])(companies);
      }
      try {
        const res = yield call(getAllPermissions);
        yield put({
          type: 'getPermissions',
          payload: res.data,
        });

        yield all([
          put.resolve({
            type: 'user/fetchCurrent',
          }),
          put.resolve({
            type: 'fund/fetch',
          }),
          put.resolve({
            type: 'roles',
          }),
          // put.resolve({
          //   type: 'initRealm',
          // }),
        ]);
      } catch (e) {
        console.log(e);
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
