// import { projectRecommendation, updateRecommendation } from '../services/api';
import { getIndustries, getPublicProjects } from '../services/api';

export default {
  namespace: 'public_project',
  state: {
    list: null,
    institution: null,
    report: null,
    current: null,
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      try {
        const { data } = yield call(getPublicProjects, {
          ...payload,
        });
        yield put({
          type: 'list',
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *fetchInstitution({ callback }, { call, put }) {
      try {
        const { data } = yield call(getIndustries);
        yield put({
          type: 'institution',
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
    institution(state, action) {
      return {
        ...state,
        institution: action.payload,
      };
    },
    report(state, action) {
      return {
        ...state,
        report: action.payload,
      };
    },
    clearReport(state, action) {
      return {
        ...state,
        report: null,
      };
    },
    current(state, action) {
      return {
        ...state,
        current: action.payload,
      };
    },
    clearCurrent(state, action) {
      return {
        ...state,
        current: null,
      };
    },
  },
};
