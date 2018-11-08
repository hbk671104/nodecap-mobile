import R from 'ramda';
import * as Individual from 'services/individual/api';
import { paginate } from 'utils/pagination';

export default {
  namespace: 'hotnode_index',
  state: {
    global: null,
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
    *fetchGlobal({ callback }, { call, put }) {
      try {
        const { data } = yield call(Individual.globalIndex);

        yield put({
          type: 'global',
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
    *fetchCoin({ payload, callback }, { call, put }) {
      try {
        const { data } = yield call(Individual.coinIndex, payload);

        yield put({
          type: 'coin',
          payload: data,
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
    global(state, { payload }) {
      return {
        ...state,
        global: payload,
      };
    },
    coin(state, { payload }) {
      return {
        ...state,
        coin: paginate(state.coin, payload),
      };
    },
  },
};
