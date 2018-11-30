import { getRankList } from '../services/individual/api';
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
  },
  reducers: {
    list(state, action) {
      return {
        ...state,
        list: {
          ...state.list,
          [action.quotation]: paginate(state.list[action.quotation], action.payload),
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
