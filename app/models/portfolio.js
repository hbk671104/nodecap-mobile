import * as R from 'ramda';
import {
  portfolioIndex,
  investmentIndex,
  projectDetail,
  getProjectInvestTokens,
  getProjectReturnTokens,
  getExitToken,
  getProjectInvestEquities,
  getProjectChartData,
  getProjectSymbol,
  getMatchedCoin,
  createProject,
  createProjectInvestInfo,
} from '../services/api';
import moment from 'moment';

const paginate = (state, action, key) => {
  const oldData = R.pathOr([], [key, 'index', 'data'])(state);
  const newData = R.pathOr([], ['payload', 'data'])(action);
  const pagination = R.pathOr({}, ['payload', 'pagination'])(action);

  const oldRank = R.pathOr({}, [key, 'params', 'rank'])(state);
  const newRank = R.pathOr({}, ['params', 'rank'])(action);

  if (
    !R.isEmpty(oldRank) &&
    !R.isEmpty(newRank) &&
    !R.equals(oldRank, newRank)
  ) {
    return action.payload;
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
    portfolioList: {
      exchangeable: {
        index: null,
        params: {
          can_calculate: 1,
        },
      },
      unexchangeable: {
        index: null,
        params: {
          can_calculate: 0,
        },
      },
    },
    projectList: {
      '0,1,2,3,4,5,6': {
        index: null,
        params: {
          status: '0,1,2,3,4,5,6',
        },
      },
      0: {
        index: null,
        params: {
          status: '0',
        },
      },
      1: {
        index: null,
        params: {
          status: '1',
        },
      },
      2: {
        index: null,
        params: {
          status: '2',
        },
      },
      3: {
        index: null,
        params: {
          status: '3',
        },
      },
      4: {
        index: null,
        params: {
          status: '4',
        },
      },
      5: {
        index: null,
        params: {
          status: '5',
        },
      },
      6: {
        index: null,
        params: {
          status: '6',
        },
      },
    },
    searchList: {
      index: null,
    },
    matchCoinList: {
      index: null,
    },
    rank: [
      {
        id: 'profits',
        name: '盈余榜',
      },
      {
        id: 'roi',
        name: '回报率榜',
      },
      {
        id: 'increase',
        name: '涨跌榜',
      },
      {
        id: 'cost',
        name: '投资榜',
      },
    ],
    current: null,
  },
  effects: {
    *index({ payload = {}, callback }, { call, put }) {
      try {
        const req = {
          ...payload,
        };
        const res = yield call(portfolioIndex, req);
        yield put({
          type: 'projectList',
          payload: res.data,
          params: req,
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
          symbol: 'ETH',
        };
        const res = yield call(investmentIndex, req);
        yield put({
          type: 'portfolioList',
          payload: res.data,
          params: req,
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
    *searchMatchedCoin({ payload = {}, callback }, { call, put }) {
      try {
        const req = {
          ...payload,
        };
        const res = yield call(getMatchedCoin, req);
        yield put({
          type: 'matchCoinList',
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
    *get({ payload }, { put, call }) {
      try {
        const res = yield call(projectDetail, {
          id: payload,
        });

        yield put({
          type: 'saveDetail',
          payload: res.data,
        });

        // get extra
        yield put({
          type: 'getExtra',
          payload,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *getExtra({ payload, callback }, { all, put, call }) {
      try {
        const result = yield all([
          put({
            type: 'getInvest',
            payload,
          }),
          put({
            type: 'getReturnToken',
            payload,
          }),
          put({
            type: 'getExitToken',
            payload,
          }),
        ]);

        if (callback) {
          yield call(callback, result);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *getInvest({ payload }, { call, put }) {
      try {
        const investTokens = yield call(getProjectInvestTokens, payload);
        yield put({
          type: 'saveInvest',
          payload: investTokens.data,
          relatedType: 'invest_tokens',
        });
      } catch (e) {
        console.log(e);
      }

      try {
        const investEquities = yield call(getProjectInvestEquities, payload);
        yield put({
          type: 'saveInvest',
          payload: investEquities.data,
          relatedType: 'invest_equities',
        });
      } catch (e) {
        console.log(e);
      }
    },
    *getReturnToken({ payload }, { call, put }) {
      try {
        const returnTokens = yield call(getProjectReturnTokens, payload);
        yield put({
          type: 'saveInvest',
          payload: returnTokens.data,
          relatedType: 'return_tokens',
        });
      } catch (e) {
        console.log(e);
      }
    },
    *getExitToken({ payload }, { call, put }) {
      try {
        const exitTokens = yield call(getExitToken, payload);
        yield put({
          type: 'saveInvest',
          payload: exitTokens.data,
          relatedType: 'exit_tokens',
        });
      } catch (e) {
        console.log(e);
      }
    },
    *createProject(
      {
        payload: { project, invest },
        callback,
      },
      { call, put },
    ) {
      try {
        const { data: projectRes } = yield call(createProject, project);
        if (!R.isEmpty(invest)) {
          const financeInfo = {
            ...invest,
            fund: {
              id: invest.fund,
            },
            paid_at: moment(invest.paid_at, 'YYYY-MM-DD').toISOString(),
            is_paid: true,
          };
          yield call(createProjectInvestInfo, {
            financeInfo,
            type: 'tokens',
            projectId: projectRes.id,
          });
        }

        // refresh list
        yield put({
          type: 'index',
          payload: {
            status: '0,1,2,3,4,5,6',
          },
        });

        if (callback) {
          callback(projectRes);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  reducers: {
    projectList(state, action) {
      const { params } = action;
      return {
        ...state,
        projectList: {
          ...state.projectList,
          [params.status]: {
            index: paginate(state.projectList, action, params.status),
            params,
          },
        },
      };
    },
    portfolioList(state, action) {
      const { params } = action;
      const key =
        params.can_calculate === 1 ? 'exchangeable' : 'unexchangeable';
      return {
        ...state,
        portfolioList: {
          ...state.portfolioList,
          [key]: {
            index: paginate(state.portfolioList, action, key),
            params,
          },
        },
      };
    },
    searchList(state, action) {
      return {
        ...state,
        searchList: {
          index: action.payload,
        },
      };
    },
    matchCoinList(state, action) {
      return {
        ...state,
        matchCoinList: {
          index: action.payload,
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
    clearMatchCoin(state) {
      return {
        ...state,
        matchCoinList: {
          index: null,
        },
      };
    },
    clearDetail(state) {
      return {
        ...state,
        current: null,
      };
    },
    saveDetail(state, action) {
      return {
        ...state,
        current: {
          ...(state.current || {}),
          ...action.payload,
        },
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
  },
};
