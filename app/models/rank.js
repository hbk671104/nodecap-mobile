import {
  getRankList,
  getMarketCapRank,
  getCommitRank,
  getHolderRank,
} from '../services/individual/api';
import { paginate } from '../utils/pagination';

export default {
  namespace: 'rank',
  state: {
    list: {
      up: null,
      down: null,
    },
  },
  effects: {
    *upFetch({ callback, payload }, { call, put }) {
      try {
        const { data } = yield call(getRankList, payload);

        yield put({
          type: 'list',
          payload: data,
          quotation: 'up',
        });

        if (callback) {
          yield call(callback);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *downFetch({ callback, payload }, { call, put }) {
      const { data } = yield call(getRankList, payload);

      yield put({
        type: 'list',
        payload: data,
        quotation: 'down',
      });

      if (callback) {
        yield call(callback);
      }
    },
    *marketCapFetch({ callback, payload }, { call, put }) {
      const { data } = yield call(getMarketCapRank, payload);

      yield put({
        type: 'list',
        payload: data,
        quotation: 'marketCap',
      });

      if (callback) {
        yield call(callback);
      }
    },
    *commitFetch({ callback, payload }, { call, put }) {
      try {
        const { data } = yield call(getCommitRank, payload);

        yield put({
          type: 'list',
          payload: data,
          quotation: 'commit',
        });

        if (callback) {
          yield call(callback);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *holderFetch({ callback, payload }, { call, put }) {
      try {
        const { data } = yield call(getHolderRank, payload);

        yield put({
          type: 'list',
          payload: data,
          quotation: 'holder',
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
    list(state, action) {
      return {
        ...state,
        list: {
          ...state.list,
          [action.quotation]: paginate(
            state.list[action.quotation],
            action.payload,
          ),
        },
      };
    },
    clearList(state) {
      return {
        ...state,
        list: null,
      };
    },
  },
};
