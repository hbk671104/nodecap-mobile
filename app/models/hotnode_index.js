import R from 'ramda';
import * as Individual from 'services/individual/api';

export default {
  namespace: 'hotnode_index',
  state: {
    market_sentiment: null,
    release_notes: null,
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
  },
  reducers: {
    sentiment(state, { payload }) {
      return {
        ...state,
        market_sentiment: payload,
      };
    },
  },
};
