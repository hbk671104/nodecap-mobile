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
  getInvestmentsByCoinID,
  createInvestment,
  createInvestInfo,
  getCoinMarket,
  getCoinROI,
  getCoinTrend,
} from '../services/individual/api';
import moment from 'moment';
import R from 'ramda';
import { paginate } from '../utils/pagination';

export default {
  namespace: 'public_project',
  state: {
    list: {
      index: null,
      params: {},
      progress: ['全部', '未设定', '即将开始', '进行中', '已结束'],
    },
    search: {
      index: null,
      params: {},
    },
    current: null,
  },
  effects: {
    *fetch({ params, callback }, { call, put }) {
      try {
        const { data } = yield call(getPublicProjects, {
          ...params,
        });

        yield put({
          type: 'list',
          payload: data,
          params,
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
          params: payload,
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
        yield put({
          type: 'getExtra',
          payload: id,
        });
        if (callback) {
          yield call(callback);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *getBase({ id }, { call, put }) {
      try {
        const { data } = yield call(getCoinInfo, id);

        yield put({
          type: 'saveCurrent',
          payload: data,
        });
      } catch (error) {
        console.log(error);
      }
    },
    *refresh(_, { put, select }) {
      try {
        const current = yield select(state =>
          R.path(['public_project', 'current'])(state),
        );
        const search = yield select(state =>
          R.path(['public_project', 'search'])(state),
        );
        if (!R.isNil(current)) {
          yield put.resolve({
            type: 'getBase',
            id: R.path(['id'])(current),
          });
        }
        if (!R.isNil(search)) {
          yield put.resolve({
            type: 'search',
            payload: R.path(['params'])(search),
          });
        }

        yield put({
          type: 'favored/fetch',
          payload: {
            currentPage: 1,
            pageSize: 20,
          },
        });

        // 选择性刷新首页列表
        const params = yield select(state =>
          R.path(['public_project', 'list', 'params'])(state),
        );
        if (params.currentPage === 1) {
          yield put({
            type: 'fetch',
            params,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    *getExtra({ payload }, { all, put }) {
      try {
        yield all([
          put({
            type: 'getInvest',
            payload,
          }),
          put({
            type: 'getCoinMarket',
            payload,
          }),
          put({
            type: 'getCoinROI',
            payload,
          }),
          put({
            type: 'getCoinTrend',
            payload,
          }),
        ]);
      } catch (error) {
        console.log(error);
      }
    },
    *getCoinMarket({ payload }, { all, put, call }) {
      try {
        const { data } = yield call(getCoinMarket, payload);
        yield put({
          type: 'saveInvest',
          relatedType: 'market',
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *getCoinROI({ payload }, { all, put, call }) {
      try {
        const { data } = yield call(getCoinROI, payload);
        yield put({
          type: 'saveInvest',
          relatedType: 'roi',
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *getCoinTrend({ payload }, { all, put, call }) {
      try {
        const { data } = yield call(getCoinTrend, payload);
        yield put({
          type: 'saveInvest',
          relatedType: 'trend',
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *getInvest({ payload }, { call, put }) {
      try {
        const investTokens = yield call(getInvestmentsByCoinID, payload);
        yield put({
          type: 'saveInvest',
          payload: investTokens.data,
          relatedType: 'investments',
        });
      } catch (e) {
        console.log(e);
      }
    },
    *createInvestInfo({ id, callback, payload }, { select, put, call }) {
      try {
        const { status } = yield call(createInvestInfo, {
          coin_id: id,
          ...payload,
          paid_at: moment(payload.paid_at, 'YYYY-MM-DD').toISOString(),
        });

        const current = yield select(state =>
          R.path(['public_project', 'current'])(state),
        );
        if (!R.isNil(current)) {
          yield put.resolve({
            type: 'get',
            id: current.id,
          });
        }

        if (callback) {
          yield call(callback, status === 201);
        }
      } catch (error) {
        console.log(error);
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
    *favor({ payload, callback }, { call, put, all, select }) {
      try {
        const { status: response_status } = yield call(favorCoin, [payload]);
        yield put({
          type: 'setFavorStatus',
          payload,
          status: true,
        });

        // 刷新
        yield put({
          type: 'refresh',
        });

        if (callback) {
          yield call(callback, response_status === 200);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *unfavor({ payload, callback }, { call, put, all, select }) {
      try {
        const { status: response_status } = yield call(unfavorCoin, payload);
        /**
         * 乐观处理请求，直接在列表和详情里将 is_focused 设置为 false
         */
        yield put({
          type: 'setFavorStatus',
          payload,
          status: false,
        });

        // 刷新
        yield put({
          type: 'refresh',
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
      const progress_changed =
        R.pathOr('', ['list', 'params', 'progress'])(state) !==
        R.pathOr('', ['params', 'progress'])(action);
      return {
        ...state,
        list: {
          ...state.list,
          index: progress_changed
            ? action.payload
            : paginate(state.list.index, action.payload),
          params: action.params,
        },
      };
    },
    searchList(state, action) {
      return {
        ...state,
        search: {
          index: paginate(state.search.index, action.payload),
          params: action.params,
        },
      };
    },
    clearSearch(state) {
      return {
        ...state,
        search: {
          index: null,
          params: {},
        },
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
    saveInvest(state, action) {
      return {
        ...state,
        current: {
          ...(state.current || {}),
          [action.relatedType]: action.payload,
        },
      };
    },
    setFavorStatus(state, action) {
      const targetIndex = R.pipe(
        R.path(['list', 'index', 'data']),
        R.findIndex(R.propEq('id', action.payload)),
      )(state);
      const list = R.pipe(
        R.path(['list', 'index', 'data']),
        R.update(targetIndex, {
          ...R.path(['list', 'index', 'data', targetIndex])(state),
          is_focused: action.status,
        }),
      )(state);
      return {
        ...state,
        list: {
          ...state.list,
          index: {
            ...state.list.index,
            data: list,
          },
        },
        // current: {
        //   ...(state.current || {}),
        //   is_focused: action.status,
        // },
      };
    },
  },
};
