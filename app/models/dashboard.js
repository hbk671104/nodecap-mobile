import { getDashboardData } from '../services/api';

export default {
  namespace: 'dashboard',

  state: {
    data: null,
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      try {
        const response = yield call(getDashboardData, payload);
        yield put({
          type: 'save',
          payload: response,
        });
        if (callback) {
          callback();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
