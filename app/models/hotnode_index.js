import R from 'ramda';
import * as Individual from 'services/individual/api';
import { paginate } from 'utils/pagination';

export default {
  namespace: 'hotnode_index',
  state: {
    overall: {
      global: null,
      list: null,
    },
    market_sentiment: null,
    category: null,
    coin: null,
  },
  effects: {
    *fetchSentiment({ callback }, { call, put }) {
      try {
        const { data } = yield call(Individual.marketSentiment);

        yield put({
          type: 'sentiment',
          payload: data,
        });

        if (callback) {
          yield call(callback);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *fetchGlobal({ id, callback }, { call, put }) {
      try {
        const { data } = yield call(Individual.globalIndex, {
          ...(R.isNil(id) ? {} : { tag_id: id }),
        });

        yield put({
          type: 'global',
          id,
          payload: data,
        });

        if (callback) {
          yield call(callback);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *fetchCategory({ payload, callback }, { call, put }) {
      try {
        const { data } = yield call(Individual.categoryIndex, payload);

        yield put({
          type: 'category',
          payload: data,
        });

        if (R.pathOr(1, ['page'])(payload) === 1) {
          yield put.resolve({
            type: 'fetchGlobal',
          });
        }

        if (callback) {
          yield call(callback);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *fetchCoin({ id, payload, callback }, { call, put }) {
      try {
        const { data } = yield call(Individual.coinIndex, {
          tag_id: id,
          ...payload,
        });

        yield put({
          type: 'coin',
          id,
          payload: data,
        });

        yield put.resolve({
          type: 'fetchGlobal',
          id,
        });

        if (callback) {
          yield call(callback);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  reducers: {
    sentiment(state, { payload }) {
      return {
        ...state,
        market_sentiment: payload,
      };
    },
    category(state, { payload }) {
      return {
        ...state,
        category: paginate(state.category, payload),
      };
    },
    global(state, { id, payload }) {
      if (id) {
        return {
          ...state,
          coin: {
            ...state.coin,
            [id]: {
              ...R.pathOr({}, ['coin', id])(state),
              global: payload,
            },
          },
        };
      }
      return {
        ...state,
        overall: {
          ...state.overall,
          global: payload,
        },
      };
    },
    coin(state, { id, payload }) {
      if (id) {
        return {
          ...state,
          coin: {
            ...state.coin,
            [id]: {
              ...R.pathOr({}, ['coin', id])(state),
              list: paginate(
                R.pathOr([], ['coin', id, 'list'])(state),
                payload,
              ),
            },
          },
        };
      }
      return {
        ...state,
        overall: {
          ...state.overall,
          list: paginate(R.pathOr([], ['overall', 'list'])(state), payload),
        },
      };
    },
  },
};
