import {
  getIndustries,
  getIndustryDetail,
  getReportsByIndustry,
  getInstitutionBanner,
  getInstitutionReportSet,
} from '../services/api';
import { paginate } from '../utils/pagination';
import R from 'ramda';

export default {
  namespace: 'institution',
  state: {
    list: null,
    report: null,
    banner: null,
    report_set: null,
    current: null,
    lastReportCount: null,
    has_read_reports: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const { data } = yield call(getIndustries, payload);
        yield put({
          type: 'list',
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *fetchReports({ payload, refreshLastCount }, { call, put, select }) {
      try {
        if (R.pathOr(1, ['currentPage'])(payload) === 1) {
          yield put({
            type: 'fetchReportBanner',
          });
        }
        const { data } = yield call(getReportsByIndustry, payload);
        yield put({
          type: 'report',
          payload: data,
        });
        const lastReportCount = yield select(({ institution }) => R.path(['lastReportCount'])(institution));
        if (refreshLastCount || R.isNil(lastReportCount)) {
          yield put({
            type: 'lastReportCount',
            payload: R.path(['pagination', 'total'])(data),
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    *fetchReportBanner(_, { call, put }) {
      try {
        const { data } = yield call(getInstitutionBanner);
        yield put({
          type: 'banner',
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *fetchReportSet({ payload }, { call, put }) {
      try {
        const { data } = yield call(getInstitutionReportSet, payload);
        yield put({
          type: 'reportSet',
          payload: data,
          id: R.pathOr(0, ['set_id'])(payload),
        });
      } catch (e) {
        console.log(e);
      }
    },
    *get({ payload }, { call, put }) {
      try {
        const { data } = yield call(getIndustryDetail, payload);
        yield put({
          type: 'save',
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
        list: paginate(state.list, action.payload),
      };
    },
    report(state, action) {
      return {
        ...state,
        report: paginate(state.report, action.payload),
      };
    },
    banner(state, action) {
      return {
        ...state,
        banner: action.payload,
      };
    },
    reportSet(state, { payload, id }) {
      return {
        ...state,
        report_set: {
          ...state.report_set,
          [id]: paginate(R.pathOr({}, ['report_set', id])(state), payload),
        },
      };
    },
    save(state, action) {
      const { payload } = action;
      return {
        ...state,
        current: {
          ...state.current,
          [payload.id]: payload,
        },
      };
    },
    clearCurrent(state, action) {
      const { id } = action;
      return {
        ...state,
        current: {
          ...state.current,
          [id]: null,
        },
      };
    },
    lastReportCount(state, action) {
      return {
        ...state,
        lastReportCount: action.payload,
      };
    },
    setReportRead(state, action) {
      return {
        ...state,
        has_read_reports: R.uniq(state.has_read_reports.concat([action.id])),
      };
    },
  },
};
