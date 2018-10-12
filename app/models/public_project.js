import {
  getPublicProjects,
  getCoinInfo,
  getNewsByCoinId,
  getCoinFinanceInfo,
  getCoinSymbol,
  addToWorkflow,
} from '../services/api';
import {
  favorCoin,
  unfavorCoin,
  getInvestmentsByCoinID,
  createInvestInfo,
  getCoinMarket,
  getCoinROI,
  getCoinTrend,
} from '../services/individual/api';
import moment from 'moment';
import R from 'ramda';
import { paginate } from '../utils/pagination';

const initialParams = {
  progress: '',
  industry_id: '',
  tag_id: '',
};

export default {
  namespace: 'public_project',
  state: {
    selected: {
      index: null,
    },
    list: {
      index: null,
      count: 0,
      params: initialParams,
    },
    search: {
      index: null,
      params: {},
    },
    current: null,
  },
  effects: {
    *fetch({ params, callback }, { call, put, all }) {
      try {
        yield put({
          type: 'setListParam',
          payload: params,
        });

        const { data } = yield call(getPublicProjects, params);

        yield all([
          put({
            type: 'list',
            payload: data,
          }),
          put({
            type: 'saveCount',
            payload: data,
          }),
        ]);

        if (callback) {
          yield call(callback);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *fetchSelected({ params = {}, callback }, { call, put }) {
      try {
        const { data } = yield call(getPublicProjects, params);

        yield put({
          type: 'selected',
          payload: data,
        });

        if (callback) {
          yield call(callback);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *fetchCount({ params, callback }, { call, put }) {
      try {
        yield put({
          type: 'setListParam',
          payload: params,
        });

        const { data } = yield call(getPublicProjects, params);

        yield put({
          type: 'saveCount',
          payload: data,
        });

        if (callback) {
          yield call(callback);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *resetFilterParam(_, { put }) {
      try {
        yield put({
          type: 'resetListParam',
        });

        yield put({
          type: 'fetchCount',
          params: initialParams,
        });
      } catch (error) {
        console.log(error);
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
    *getOrganization({ id, callback }, { call, put, all }) {
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
    *refresh({ id, institutionId }, { put, select }) {
      try {
        // 选择性刷新详情与搜索页
        const current = yield select(state =>
          R.path(['public_project', 'current', id])(state),
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
        if (!R.isNil(R.path(['index'])(search))) {
          yield put.resolve({
            type: 'search',
            payload: R.path(['params'])(search),
          });
        }
        if (institutionId) {
          yield put.resolve({
            type: 'institution/get',
            payload: institutionId,
          });
        }

        // 刷新关注页
        yield put({
          type: 'favored/fetch',
          payload: {
            currentPage: 1,
            pageSize: 20,
          },
        });
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
          id: payload,
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
          id: payload,
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
          id: payload,
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
          id: payload,
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
          R.path(['public_project', 'current', id])(state),
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
            id,
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
            id,
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
            id,
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
    *favor({ payload, institutionId, callback }, { call, put, all }) {
      try {
        const { status: response_status } = yield call(favorCoin, [payload]);
        yield all([
          put({
            type: 'setFavorStatus',
            payload,
            status: true,
          }),
          put({
            type: 'coinSets/setFavorStatus',
            payload,
            status: true,
          }),
        ]);

        // 刷新
        yield put({
          type: 'refresh',
          id: payload,
          institutionId,
        });

        if (callback) {
          yield call(callback, response_status === 200);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *unfavor({ payload, institutionId, callback }, { call, put, all }) {
      try {
        const { status: response_status } = yield call(unfavorCoin, payload);
        yield all([
          put({
            type: 'setFavorStatus',
            payload,
            status: false,
          }),
          put({
            type: 'coinSets/setFavorStatus',
            payload,
            status: false,
          }),
        ]);

        // 刷新
        yield put({
          type: 'refresh',
          id: payload,
          institutionId,
        });

        if (callback) {
          yield call(callback, response_status === 200);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *addToWorkflow({ payload, status, callback }, { all, call, put, select }) {
      try {
        const { data, status: response_status } = yield call(
          addToWorkflow,
          payload,
        );

        const current = yield select(state =>
          R.path(['public_project', 'current', R.path([0])(payload)])(state),
        );
        if (!R.isNil(current)) {
          yield put.resolve({
            type: 'getBase',
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
        list: {
          ...state.list,
          index: paginate(state.list.index, action.payload),
        },
      };
    },
    selected(state, action) {
      return {
        ...state,
        selected: {
          ...state.selected,
          index: paginate(state.list.selected, action.payload),
        },
      };
    },
    saveCount(state, action) {
      const count = R.pathOr(0, ['pagination', 'total'])(action.payload);
      return {
        ...state,
        list: {
          ...state.list,
          count,
        },
      };
    },
    setListParam(state, action) {
      return {
        ...state,
        list: {
          ...state.list,
          params: action.payload,
        },
      };
    },
    resetListParam(state) {
      return {
        ...state,
        list: {
          ...state.list,
          params: initialParams,
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
      const { payload } = action;
      return {
        ...state,
        current: {
          ...state.current,
          [payload.id]: payload,
        },
      };
    },
    saveCurrent(state, action) {
      const { payload } = action;
      return {
        ...state,
        current: {
          ...state.current,
          [payload.id]: {
            ...(state.current[payload.id] || {}),
            ...payload,
          },
        },
      };
    },
    clearCurrent(state, action) {
      const { id } = action;
      return {
        ...state,
        current: {
          ...state.current,
          [id]: null,
        },
      };
    },
    saveInvest(state, action) {
      const { payload, id } = action;

      return {
        ...state,
        current: {
          ...(state.current || {}),
          [id]: {
            ...(state.current[id] || {}),
            [action.relatedType]: action.payload,
          },
        },
      };
    },
    setFavorStatus(state, action) {
      return {
        ...state,
        list: {
          ...state.list,
          index: {
            ...state.list.index,
            data: R.map(i => {
              if (i.id === action.payload) {
                const star_number = parseInt(i.stars, 10);
                return {
                  ...i,
                  is_focused: action.status,
                  stars: action.status
                    ? `${star_number + 1}`
                    : `${star_number - 1}`,
                };
              }
              return i;
            })(state.list.index.data),
          },
        },
      };
    },
  },
};
