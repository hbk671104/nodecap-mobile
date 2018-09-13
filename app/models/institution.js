// import { projectRecommendation, updateRecommendation } from '../services/api';
import { getIndustries, getReportsByIndustryId } from '../services/api';

export default {
  namespace: 'institution',
  state: {
    list: null,
    report: null,
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
    *fetchReports({ payload, id }, { call, put }) {
      try {
        const { data } = yield call(getReportsByIndustryId, id, payload);
        yield put({
          type: 'report',
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
    report(state, action) {
      return {
        ...state,
        report: action.payload,
      };
    },
    clearReport(state) {
      return {
        ...state,
        report: null,
      };
    },
  },
};
