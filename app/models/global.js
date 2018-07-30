import axios from 'axios';
import * as R from 'ramda';
import { getConstants, getAllPermissions } from '../services/api';
import { initKeychain } from '../utils/keychain';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    title: 'Nodus 管理系统',
    company: {
      name: 'Node Capital',
    },
    constants: null,
    projectTags: [],
    financeStage: [],
    permissions: [],
  },

  effects: {
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
    *initial({ callback }, { select, put, call, all, take }) {
      const token = yield select(state => state.login.token);
      const companies = yield select(state => state.login.companies);
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        axios.defaults.headers.common['X-Company-ID'] = R.path([0, 'id'])(
          companies,
        );
      }
      try {
        const res = yield call(getAllPermissions);
        yield put({
          type: 'getPermissions',
          payload: res.data,
        });

        yield all([
          put({
            type: 'user/fetchCurrent',
          }),
          put({
            type: 'fund/fetch',
          }),
          put({
            type: 'initRealm',
          }),
        ]);
        yield take('fund/fetch/@@end');
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
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
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
  },
};
