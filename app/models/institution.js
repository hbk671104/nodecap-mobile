// import { projectRecommendation, updateRecommendation } from '../services/api';
import { getIndustries, getReportsByIndustryId } from '../services/api';

export default {
  namespace: 'institution',
  state: {
    list: null,
    institution: null,
    report: null,
    current: null,
  },
  effects: {
    *fetch({ callback }, { call, put }) {
      try {
        const { data } = yield call(getIndustries);
        yield put({
          type: 'list',
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *fetchReports({ callback, payload, id }, { call, put }) {
      try {
        const { data } = yield call(getReportsByIndustryId, id, payload);
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
