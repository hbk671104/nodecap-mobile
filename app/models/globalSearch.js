import R from 'ramda';

import { searchProject, searchUser } from '../services/individual/api';
import { getReportsByIndustry, getInstitution } from '../services/api';
import { paginate } from '../utils/pagination';

export default {
  namespace: 'globalSearch',
  state: {
    result: null,
    search: null,
  },
  effects: {
    *search({ payload }, { put }) {
      try {
        yield put({
          type: 'coins',
          payload,
        });
        yield put({
          type: 'reports',
          payload,
        });
        yield put({
          type: 'industries',
          payload,
        });
        yield put({
          type: 'services',
          payload,
        });
        yield put({
          type: 'users',
          payload,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *coins({ payload }, { call, put }) {
      try {
        const { data } = yield call(searchProject, payload);
        yield put({
          type: 'saveResult',
          payload: data,
          listType: 'coins',
        });
      } catch (e) {
        console.log(e);
      }
    },
    *reports({ payload }, { call, put }) {
      try {
        const { data } = yield call(getReportsByIndustry, payload);
        yield put({
          type: 'saveResult',
          payload: data,
          listType: 'reports',
        });
      } catch (e) {
        console.log(e);
      }
    },
    *industries({ payload }, { call, put }) {
      try {
        const { data } = yield call(getInstitution, {
          ...payload,
          type: '1',
        });
        yield put({
          type: 'saveResult',
          payload: data,
          listType: 'industries',
        });
      } catch (e) {
        console.log(e);
      }
    },
    *services({ payload }, { call, put }) {
      try {
        const { data } = yield call(getInstitution, {
          ...payload,
          type: '2,3,4,5,6,7,8,9',
        });
        yield put({
          type: 'saveResult',
          payload: data,
          listType: 'services',
        });
      } catch (e) {
        console.log(e);
      }
    },
    *users({ payload }, { call, put }) {
      try {
        const { data } = yield call(searchUser, payload);
        yield put({
          type: 'saveResult',
          payload: data,
          listType: 'users',
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
  reducers: {
    saveResult(state, { payload, listType }) {
      return {
        ...state,
        search: {
          ...state.search,
          [listType]: paginate(
            R.pathOr({}, ['result', listType])(state),
            payload,
          ),
        },
      };
    },
    clearSearch(state, { payload }) {
      return {
        ...state,
        search: null,
      };
    },
  },
};
