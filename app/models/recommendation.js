import { coinRecommended, favorCoin } from '../services/individual/api';

export default {
  namespace: 'recommendation',
  state: {
    list: null,
  },
  effects: {
    *fetch({ callback }, { call, put }) {
      const { data } = yield call(coinRecommended);

      yield put({
        type: 'list',
        payload: data,
      });

      if (callback) {
        yield call(callback);
      }
    },
    *update({ callback, payload }, { put, call }) {
      const { status } = yield call(favorCoin, payload);

      yield put({
        type: 'public_project/refresh',
      });

      if (callback) {
        yield call(callback, status === 200);
      }
    },
  },
  reducers: {
    list(state, action) {
      return {
        ...state,
        list: action.payload,
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
