import { projectRecommendation, updateRecommendation } from '../services/api';

export default {
  namespace: 'recommendation',
  state: {
    list: null,
  },
  effects: {
    *fetch({ callback }, { call, put }) {
      const { data } = yield call(projectRecommendation);

      yield put({
        type: 'list',
        payload: data,
      });

      if (callback) {
        yield call(callback);
      }
    },
    *update({ callback, payload }, { call }) {
      const { status } = yield call(updateRecommendation, payload);

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
