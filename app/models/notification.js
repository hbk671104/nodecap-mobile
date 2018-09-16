import { trendList, trendDetail } from '../services/api';
import R from 'ramda';
import { paginate } from '../utils/pagination';

export default {
  namespace: 'notification',
  state: {
    list: [],
    current: null,
    badgeVisible: false,
  },
  effects: {
    *fetch(_, { call, put }) {
      try {
        const { data } = yield call(trendList);
        yield put({
          type: 'list',
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *get({ payload }, { call, put }) {
      try {
        const { data } = yield call(trendDetail, payload);
        yield put({
          type: 'detail',
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
    detail(state, action) {
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
    showBadge(state) {
      return {
        ...state,
        badgeVisible: true,
      };
    },
    clearBadge(state) {
      return {
        ...state,
        badgeVisible: false,
      };
    },
  },
};
