import { trendList, trendDetail } from '../services/api';
import { trendList as individualTrendList } from '../services/individual/api';
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
    *fetch({ payload }, { call, put, select }) {
      try {
        const in_individual = yield select(state =>
          R.path(['login', 'in_individual'])(state),
        );

        let response_data;
        if (in_individual) {
          const { data } = yield call(individualTrendList, payload);
          response_data = data;
        } else {
          const { data } = yield call(trendList, payload);
          response_data = data;
        }
        yield put({
          type: 'list',
          payload: response_data,
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
        list: paginate(state.list, action.payload),
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
