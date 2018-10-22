import {
  createAction,
  NavigationActions as routerRedux,
  Storage,
} from '../utils';
import codePush from 'react-native-code-push';
import codePushSaga from 'react-native-code-push-saga';
import { login } from '../services/api';
import request from '../utils/request';
import store from '../../index';

export default {
  namespace: 'app',
  state: {
    login: false,
    loading: true,
    fetching: false,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
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
    *checkCodePush(_, { spawn }) {
      if (global.__DEV__) {
        return;
      }

      codePush.allowRestart();
      yield spawn(codePushSaga, {
        codePushStatusDidChange: e => {
          if (e === codePush.SyncStatus.DOWNLOADING_PACKAGE) {
            store.dispatch(
              routerRedux.navigate({
                routeName: 'CodePush',
              }),
            );
          }
          store.dispatch({
            type: 'codePush/changeState',
            payload: e,
          });
        },
        codePushDownloadDidProgress: progress => {
          const percent = (
            progress.receivedBytes / progress.totalBytes
          ).toFixed(2);
          store.dispatch({
            type: 'codePush/changePercent',
            payload: percent,
          });
        },
        syncOptions: {
          installMode: codePush.InstallMode.ON_NEXT_RESTART,
          syncOnResume: true,
          syncOnInterval: 60,
        },
      });
    },
    *loadStorage(action, { call, put, take }) {
      yield put({
        type: 'checkCodePush',
      });
      yield take('checkCodePush/@@end');
      const token = yield call(Storage.get, 'login', false);
      yield put(createAction('updateState')({ login: token, loading: false }));
    },
    *login({ payload }, { call, put }) {
      yield put(createAction('updateState')({ fetching: true }));
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
        request.defaults.headers.common.Authorization = `Bearer ${
          data.access_token
        }`;
        Storage.set('login', data.access_token);
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
      yield call(Storage.set, 'login', false);
      yield put(createAction('updateState')({ login: false }));
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' });
    },
  },
};
