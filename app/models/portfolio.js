import * as R from 'ramda';
import {
  portfolioIndex,
  investmentIndex,
  projectDetail,
  getProjectInvestTokens,
  getProjectInvestEquities,
  getProjectChartData,
  getProjectSymbol,
} from '../services/api';

const paginate = (state, action, key) => {
  const oldData = R.pathOr([], [key, 'index', 'data'])(state);
  const newData = R.pathOr([], ['payload', 'data'])(action);
  const pagination = R.pathOr({}, ['payload', 'pagination'])(action);

  if (action.params) {
    if (key === 'exchangeable') {
      const oldRank = R.pathOr('', [key, 'params', 'rank'])(state);
      const newRank = R.pathOr('', ['params', 'rank'])(action);
      if (!R.equals(oldRank, newRank)) {
        return action.payload;
      }
    }
    if (key === 'unexchangeable') {
      const oldStatus = R.pathOr('', [key, 'params', 'status'])(state);
      const newStatus = R.pathOr('', ['params', 'status'])(action);
      if (!R.equals(oldStatus, newStatus)) {
        return action.payload;
      }
    }
  }

  if (R.path(['current'])(pagination) === 1) {
    return action.payload;
  }

  return {
    ...action.payload,
    data: R.concat(oldData, newData),
  };
};

export default {
  namespace: 'portfolio',
  state: {
    exchangeable: {
      index: null,
      params: {
        rank: 'profits',
      },
    },
    unexchangeable: {
      index: null,
      params: {
        status: '4,5,6',
      },
    },
    searchList: {
      index: null,
    },
  },
  effects: {
    *index({ payload = {}, callback }, { call, put }) {
      try {
        const req = {
          ...payload,
        };
        const res = yield call(portfolioIndex, req);
        yield put({
          type: 'list',
          payload: res.data,
          params: req,
          key: 'unexchangeable',
        });
        if (callback) {
          callback();
        }
      } catch (e) {
        console.log(e);
      }
    },
    *investment({ payload = {}, callback }, { call, put }) {
      try {
        const req = {
          ...payload,
        };
        const res = yield call(investmentIndex, req);
        yield put({
          type: 'list',
          payload: res.data,
          params: req,
          key: 'exchangeable',
        });
        if (callback) {
          callback();
        }
      } catch (e) {
        console.log(e);
      }
    },
    *search({ payload = {}, callback }, { call, put }) {
      try {
        const req = {
          ...payload,
          status: '4,5,6',
        };
        const res = yield call(portfolioIndex, req);
        yield put({
          type: 'searchList',
          payload: res.data,
        });
        if (callback) {
          callback();
        }
      } catch (e) {
        console.log(e);
      }
    },
    *projectStat({ id, payload = {}, callback }, { call }) {
      try {
        let queryParams = payload;
        let symbols;
        if (R.isEmpty(queryParams)) {
          const { data } = yield call(getProjectSymbol, id);
          const first = data[0];
          queryParams = {
            market: first.market,
            symbol: first.symbol,
          };
          symbols = data;
        }

        // query params
        const { data } = yield call(getProjectChartData, {
          id,
          payload: queryParams,
        });
        if (callback) {
          callback({
            ...(R.isNil(symbols) ? {} : { symbols }),
            data,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 项目详情
     * @param payload
     * @param callback
     * @param call
     * @param put
     * @param all
     */
    *get({ payload, callback }, { all, call }) {
      try {
        const { res, investTokens, investEquities } = yield all({
          res: call(projectDetail, {
            id: payload,
          }),
          investTokens: call(getProjectInvestTokens, payload),
          investEquities: call(getProjectInvestEquities, payload),
        });

        const data = {
          ...res.data,
          invest_tokens: investTokens.data,
          invest_equities: investEquities.data,
        };

        if (callback) {
          callback(data);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  reducers: {
    list(state, action) {
      const { key } = action;
      return {
        ...state,
        [key]: {
          index: paginate(state, action, key),
          params: action.params,
        },
      };
    },
    searchList(state, action) {
      return {
        ...state,
        searchList: {
          index: paginate(state, action, 'searchList'),
        },
      };
    },
    clearSearch(state) {
      return {
        ...state,
        searchList: {
          index: null,
        },
      };
    },
  },
};
