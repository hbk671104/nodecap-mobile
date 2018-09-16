import {
  getPublicProjects,
  getCoinInfo,
  getNewsByCoinId,
  getCoinFinanceInfo,
  favorCoin,
} from '../services/api';
import R from 'ramda';
import { paginate } from '../utils/pagination';

export default {
  namespace: 'public_project',
  state: {
    list: null,
    current: null,
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      try {
        const { data } = yield call(getPublicProjects, {
          ...payload,
        });

        console.log(data);
        yield put({
          type: 'list',
          payload: data,
        });

        yield put.resolve({
          type: 'institution/fetch',
        });

        if (callback) {
          yield call(callback);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *get({ id, callback }, { call, put, all }) {
      try {
        const { data } = yield call(getCoinInfo, id);

        yield put({
          type: 'current',
          payload: data,
        });

        yield all([
          put.resolve({
            type: 'trend',
            id,
          }),
          put.resolve({
            type: 'financeInfo',
            id,
          }),
        ]);

        if (callback) {
          yield call(callback);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *trend({ id, callback }, { call, put }) {
      try {
        const { data } = yield call(getNewsByCoinId, id);

        yield put({
          type: 'saveCurrent',
          payload: {
            news: data,
          },
        });

        if (callback) {
          yield call(callback);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *financeInfo({ id, callback }, { call, put }) {
      try {
        const { data } = yield call(getCoinFinanceInfo, id);

        yield put({
          type: 'saveCurrent',
          payload: {
            finance_info: data,
          },
        });

        if (callback) {
          yield call(callback);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *favor({ payload, status, callback }, { all, call, put, select }) {
      try {
        const { data, status: response_status } = yield call(
          favorCoin,
          payload,
        );

        const current = yield select(state =>
          R.path(['public_project', 'current'])(state),
        );
        if (!R.isNil(current)) {
          yield put.resolve({
            type: 'get',
            id: R.path([0])(payload),
          });
        }

        if (!R.isNil(data) && !R.isEmpty(data)) {
          yield all(
            R.map(id =>
              put.resolve({
                type: 'portfolio/updateProject',
                id,
                payload: {
                  status,
                },
              }),
            )(data),
          );

          yield all([
            put({
              type: 'portfolio/index',
              payload: {
                status: '0,1,2,3,4,5,6',
              },
            }),
            put({
              type: 'portfolio/index',
              payload: {
                status: `${status}`,
              },
            }),
          ]);
        }

        if (callback) {
          yield call(callback, response_status === 200);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  reducers: {
    list(state, action) {
      return {
        ...state,
        list: paginate(state.list, action.payload),
      };
    },
    current(state, action) {
      return {
        ...state,
        current: action.payload,
      };
    },
    saveCurrent(state, action) {
      return {
        ...state,
        current: {
          ...(state.current || {}),
          ...action.payload,
        },
      };
    },
    clearCurrent(state) {
      return {
        ...state,
        current: null,
      };
    },
  },
};
