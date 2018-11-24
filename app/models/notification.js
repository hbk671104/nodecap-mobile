import { trendList, trendDetail, getCoinInfo } from '../services/api';
import { trendList as individualTrendList } from '../services/individual/api';
import R from 'ramda';
import { paginate } from '../utils/pagination';

export default {
  namespace: 'notification',
  state: {
    list: [],
    insite_list: [],
    current: null,
    badgeVisible: false,
    lastRead: null,
  },
  effects: {
    *fetch({ payload, refreshLastRead }, { call, put, select }) {
      try {
        const { data } = yield call(individualTrendList, {
          type: 1,
          ...payload,
        });

        yield put({
          type: 'list',
          payload: data,
        });
        const lastRead = yield select(({ notification }) =>
          R.path(['lastRead'])(notification),
        );
        if (refreshLastRead || R.isNil(lastRead)) {
          yield put({
            type: 'lastRead',
            payload: R.path(['pagination', 'total'])(data),
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    *fetchInSite({ payload }, { call, put }) {
      try {
        const { data } = yield call(individualTrendList, {
          type: 4,
          ...payload,
        });

        yield put({
          type: 'insiteList',
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *get({ payload }, { call, put }) {
      try {
        const { data } = yield call(trendDetail, payload);

        const coin_id = R.path(['coin_id'])(data);
        if (coin_id) {
          yield put({
            type: 'getCoin',
            id: coin_id,
          });
        }

        yield put({
          type: 'detail',
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *getCoin({ id }, { call, put }) {
      try {
        const { data } = yield call(getCoinInfo, id);

        yield put({
          type: 'coinDetail',
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
    insiteList(state, action) {
      return {
        ...state,
        insite_list: paginate(state.insite_list, action.payload),
      };
    },
    detail(state, action) {
      return {
        ...state,
        current: {
          ...state.current,
          ...action.payload,
        },
      };
    },
    coinDetail(state, action) {
      return {
        ...state,
        current: {
          ...state.current,
          coin_detail: action.payload,
        },
      };
    },
    clearCurrent(state) {
      return {
        ...state,
        current: null,
      };
    },
    lastRead(state, action) {
      return {
        ...state,
        lastRead: action.payload,
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
