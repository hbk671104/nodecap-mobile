import { getIndustries, getCoinTags } from '../services/api';

export default {
  namespace: 'filter',
  state: {
    institution: null,
    coinTag: null,
  },
  effects: {
    *fetchInstitution({ callback }, { call, put }) {
      const { data } = yield call(getIndustries, {
        currentPage: 1,
        pageSize: 300,
      });

      yield put({
        type: 'institution',
        payload: data,
      });

      if (callback) {
        yield call(callback);
      }
    },
    *fetchCoinTag({ callback }, { call, put }) {
      const { data } = yield call(getCoinTags, {
        currentPage: 1,
        pageSize: 300,
      });

      yield put({
        type: 'coinTag',
        payload: data,
      });

      if (callback) {
        yield call(callback);
      }
    },
  },
  reducers: {
    institution(state, action) {
      return {
        ...state,
        institution: action.payload,
      };
    },
    coinTag(state, action) {
      return {
        ...state,
        coinTag: action.payload,
      };
    },
  },
};
