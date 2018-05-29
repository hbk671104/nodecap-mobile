import { createAction, NavigationActions, Storage } from '../utils'
import { login } from '../services/api';

export default {
  namespace: 'app',
  state: {
    login: false,
    loading: true,
    fetching: false,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
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
  effects: {
    *loadStorage(action, { call, put }) {
      const login = yield call(Storage.get, 'login', false)
      yield put(createAction('updateState')({ login, loading: false }))
    },
    *login({ payload }, { call, put }) {
      yield put(createAction('updateState')({ fetching: true }))
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
        request.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
        Storage.set('login', data.access_token)
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
    *logout(action, { call, put }) {
      yield call(Storage.set, 'login', false)
      yield put(createAction('updateState')({ login: false }))
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' })
    },
  },
}
