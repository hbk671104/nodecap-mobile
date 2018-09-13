// import { projectRecommendation, updateRecommendation } from '../services/api';
import { getIndustries, getPublicProjects } from '../services/api';

export default {
  namespace: 'public_project',
  state: {
    list: null,
    current: null,
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      try {
        const { data } = yield call(getPublicProjects, {
          ...payload,
        });

        yield put.resolve({
          type: 'institution/fetch',
        });

        yield put({
          type: 'list',
          payload: data,
        });
      } catch (e) {
        console.log(e);
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
    current(state, action) {
      return {
        ...state,
        current: action.payload,
      };
    },
    clearCurrent(state) {
      return {
        ...state,
        current: null,
      };
    },
  },
};
