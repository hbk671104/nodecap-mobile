import JPush from 'jpush-react-native';
import { NavigationActions as routerRedux } from '../utils';
import { login, setPassword, getLoginSMSCode } from '../services/api';
import request from '../utils/request';
import { NavigationActions } from 'react-navigation';
import { clearKeychain } from '../utils/keychain';
import R from 'ramda';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    in_individual: true,
  },

  effects: {
    *login({ payload }, { call, put }) {
      try {
        const { data } = yield call(login, payload);
        yield put({
          type: 'changeLoginStatus',
          payload: data,
        });
        if (data.password_reset_token) {
          yield put(
            routerRedux.navigate({
              routeName: 'SetPassword',
              params: {
                resetToken: data.password_reset_token,
              },
            }),
          );
        } else {
          yield put({
            type: 'loginSuccess',
            payload: {
              token: data.access_token,
              companies: data.companies,
            },
          });

          yield put.resolve({
            type: 'global/bootstrap',
            fromLogin: true,
          });
        }
      } catch (e) {
        yield put({
          type: 'loginFailure',
          payload: {
            error: e.status,
          },
        });
      }
    },
    *setPassword({ payload }, { call, put }) {
      try {
        const { data } = yield call(setPassword, payload);
        yield put({
          type: 'loginSuccess',
          payload: {
            token: data.access_token,
            companies: data.companies,
          },
        });

        yield put.resolve({
          type: 'global/bootstrap',
          fromLogin: true,
        });
      } catch (e) {
        yield put({
          type: 'loginFailure',
          payload: {
            error: e.status,
          },
        });
      }
    },
    *logout({ callback }, { call, put }) {
      try {
        request.defaults.headers.common.Authorization = null;
        request.defaults.headers.common['X-Company-ID'] = null;
        // clearKeychain();

        // sensor logout
        global.s().logout();

        // jpush remove corresponding info
        JPush.deleteAlias(() => null);
        JPush.cleanTags(() => null);

        if (callback) {
          yield call(callback);
        }
      } finally {
        yield put({
          type: 'logoutSuccess',
        });
      }
    },
    *switch(_, { put, select }) {
      const in_individual = yield select(state =>
        R.path(['login', 'in_individual'])(state),
      );
      const companies = yield select(state =>
        R.path(['login', 'companies'])(state),
      );
      const user = yield select(state =>
        R.path(['user', 'currentUser'])(state),
      );
      const realname = R.path(['realname'])(user);
      const companyName = R.path([0, 'name'])(companies);
      const companyID = R.path([0, 'id'])(companies);
      const input = {
        realname,
        companyName,
        companyID,
      };
      try {
        if (in_individual) {
          request.defaults.headers.common['X-Company-ID'] = companyID;
          JPush.setTags([`company_${companyID}`], () => null);
          global.setProfile({
            ...input,
            client_type: '企业版',
          });
        } else {
          request.defaults.headers.common['X-Company-ID'] = null;
          JPush.cleanTags(() => null);
          global.setProfile({
            ...input,
            client_type: '个人版',
          });
        }

        yield put(
          routerRedux.navigate({
            routeName: in_individual ? 'Main' : 'Individual',
          }),
        );

        yield put({
          type: 'switchVersion',
        });
      } catch (error) {
        console.log(error);
      }
    },
    *sendSMS({ payload, callback }, { call }) {
      try {
        yield call(getLoginSMSCode, payload);
        if (callback) {
          callback();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  reducers: {
    switchVersion(state) {
      return {
        ...state,
        in_individual: R.not(state.in_individual),
      };
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
        companies: payload.companies,
      };
    },
    logoutSuccess(state) {
      return {
        ...state,
        token: null,
        companies: null,
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
