import { paginate } from '../utils/pagination';
import { getDappTypes, getDappDetail, getDappList, getReportsByIndustry } from '../services/api';
import * as R from 'ramda';

export default {
  namespace: 'dapp',
  state: {
    types: [],
    list: {},
    current: {},
    search: null,
  },
  effects: {
    *fetchTypes({ callback }, { call, put }) {
      try {
        const { data } = yield call(getDappTypes);
        yield put({
          type: 'saveType',
          payload: data,
        });
        if (callback) {
          callback();
        }
      } catch (e) {
        console.log(e);
      }
    },

    *fetchAllList(_, { select, put, all }) {
      try {
        const types = yield select(state => R.path(['dapp', 'types'])(state));
        yield all(types.map(i => put({
          type: 'fetchListData',
          topic_id: i.id,
        })));
      } catch (e) {
        console.log(e);
      }
    },
    *fetchListData({ payload }, { call, put }) {
      try {
        const { data } = yield call(getDappList, payload);
        yield put({
          type: 'list',
          topic_id: payload.topic_id,
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *search({ payload, callback }, { call, put }) {
      try {
        const { data } = yield call(getDappList, payload);

        yield put({
          type: 'searchList',
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *fetchDappDetail({ id }, { call, put }) {
      try {
        const { data } = yield call(getDappDetail, id);
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
    saveType(state, action) {
      return {
        ...state,
        types: action.payload,
      };
    },
    list(state, action) {
      return {
        ...state,
        list: {
          ...state.list,
          [action.topic_id]: paginate(state.list[action.topic_id], action.payload),
        },
      };
    },
    clearList(state) {
      return {
        ...state,
        list: null,
      };
    },
    detail(state, action) {
      return {
        ...state,
        current: {
          ...state.current,
          [R.path(['payload', 'id'])(action)]: action.payload,
        },
      };
    },
    searchList(state, { payload }) {
      return {
        ...state,
        search: paginate(
          R.pathOr({}, ['search'])(state),
          payload,
        ),
      };
    },
  },
};
