import { NavigationActions as routerRedux } from '../utils';
import { login, setPassword } from '../services/api';
import request from '../utils/request';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    * login({ payload, callback }, { call, put, take }) {
      try {
        const { data } = yield call(login, payload);
        yield put({
          type: 'changeLoginStatus',
          payload: data,
        });
        yield put({
          type: 'loginSuccess',
          payload: {
            token: data.access_token,
          },
        });
        yield put({
          type: 'global/initial',
        });

        yield take('global/initial/@@end');

        yield put(
          routerRedux.navigate({
            routeName: 'Dashboard',
          })
        );
      } catch (e) {
        yield put({
          type: 'loginFailure',
          payload: {
            error: e.status,
          },
        });
      }
    },
    * setPassword({ payload }, { call, put }) {
      try {
        const { data } = yield call(setPassword, payload);
        yield put({
          type: 'loginSuccess',
          payload: {
            token: data.access_token,
          },
        });
        request.defaults.headers.common.Authorization = `Bearer ${
          data.access_token
        }`;
        yield put(routerRedux.push('/projects/'));
      } catch (e) {
        yield put({
          type: 'loginFailure',
          payload: {
            error: e.status,
          },
        });
      }
    },
    * logout(_, { put }) {
      try {
        request.defaults.headers.common.Authorization = null;
        routerRedux.replace('/user/login');
      } finally {
        yield put({
          type: 'logoutSuccess',
        });
        yield put(routerRedux.replace('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    loginSuccess(state, { payload }) {
      return {
        ...state,
        token: payload.token,
      };
    },
    logoutSuccess(state) {
      return {
        ...state,
        token: null,
      };
    },
    loginFailure(state, { payload }) {
      return {
        ...state,
        status: payload.error,
      };
    },
  },
};
