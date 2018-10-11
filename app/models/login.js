import JPush from 'jpush-react-native';
import { NavigationActions as routerRedux } from '../utils';
import { login, setPassword, getLoginSMSCode } from '../services/api';
import * as IndividualAPI from '../services/individual/api';
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
        const { data } = yield call(IndividualAPI.login, payload);
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
            type: 'loginConfig',
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
    *smsLogin({ payload }, { call, put }) {
      try {
        const { data } = yield call(IndividualAPI.smsLogin, payload);

        yield put({
          type: 'loginConfig',
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
    *setPassword({ payload }, { call, put }) {
      try {
        const { data } = yield call(setPassword, payload);

        yield put({
          type: 'loginConfig',
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
    *loginConfig({ payload }, { put }) {
      try {
        request.defaults.headers.common.Authorization = `Bearer ${
          payload.token
        }`;

        yield put({
          type: 'loginSuccess',
          payload,
        });
      } catch (error) {
        console.log(error);
      }
    },
    *logout({ callback }, { call, put, select }) {
      try {
        const in_individual = yield select(state =>
          R.path(['login', 'in_individual'])(state),
        );

        if (!in_individual) {
          yield put.resolve({
            type: 'switch',
          });
        }

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

      try {
        yield put.resolve({
          type: in_individual
            ? 'global/initInstitutionEnd'
            : 'global/initIndividualEnd',
        });
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
    *sendLoginSMS({ payload, callback }, { call }) {
      try {
        yield call(IndividualAPI.getVerificationCode, payload);
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
