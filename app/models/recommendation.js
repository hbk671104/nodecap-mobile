import {} from '../services/api';
import request from '../utils/request';

export default {
  namespace: 'recommendation',
  state: {
    list: null,
  },
  effects: {
    *fetch({ callback }, { call, put }) {
      if (callback) {
        yield call(callback);
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
