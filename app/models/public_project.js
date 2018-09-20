import {
  getPublicProjects,
  getCoinInfo,
  getNewsByCoinId,
  getCoinFinanceInfo,
  getCoinSymbol,

} from '../services/api';
import {
  favorCoin,
  unfavorCoin,
} from '../services/individual/api';
import R from 'ramda';
import { paginate } from '../utils/pagination';

export default {
  namespace: 'public_project',
  state: {
    list: null,
    search: null,
    current: null,
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      try {
        const { data } = yield call(getPublicProjects, {
          ...payload,
        });

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
    *search({ payload, callback }, { call, put }) {
      try {
        const { data } = yield call(getPublicProjects, {
          ...payload,
        });

        yield put({
          type: 'searchList',
          payload: data,
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
          put.resolve({
            type: 'symbol',
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
    *refresh({ res: data, payload, status }, { all, call, put, select }) {
      try {
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
      } catch (e) {
        console.log(e);
      }
    },
    *symbol({ id, callback }, { call, put }) {
      try {
        const { data } = yield call(getCoinSymbol, id);

        yield put({
          type: 'saveCurrent',
          payload: {
            symbols: data,
          },
        });

        if (callback) {
          yield call(callback);
        }
      } catch (e) {
        console.log(e);
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
        yield put({
          type: 'refresh',
          payload,
          res: data,
        });
        if (callback) {
          yield call(callback, response_status === 200);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *unfavor({ payload, status, callback }, { all, call, put, select }) {
      try {
        const { data, status: response_status } = yield call(
          unfavorCoin,
          payload,
        );
        yield put({
          type: 'refresh',
          payload,
          res: data,
        });
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
    searchList(state, action) {
      return {
        ...state,
        search: paginate(state.search, action.payload),
      };
    },
    clearSearch(state) {
      return {
        ...state,
        search: null,
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
