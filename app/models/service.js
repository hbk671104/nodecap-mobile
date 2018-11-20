import R from 'ramda';
import { getInstitution } from '../services/api';
import { paginate } from '../utils/pagination';

export default {
  namespace: 'service',
  state: {
    list: null,
    detail: null,
    search: null,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const { data } = yield call(getInstitution, payload);

        yield put({
          type: 'list',
          service_type: payload.type,
          payload: data,
        });
      } catch (error) {
        console.log(error);
      }
    },
    *search({ payload, callback }, { call, put }) {
      try {
        const { data } = yield call(getInstitution, payload);

        yield put({
          type: 'searchList',
          service_type: String(payload.type),
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
  reducers: {
    list(state, { payload, service_type }) {
      return {
        ...state,
        list: {
          ...state.list,
          [service_type]: paginate(
            R.pathOr({}, ['list', service_type])(state),
            payload,
          ),
        },
      };
    },
    searchList(state, { payload, service_type }) {
      return {
        ...state,
        search: {
          ...state.search,
          [service_type]: paginate(
            R.pathOr({}, ['search', service_type])(state),
            payload,
          ),
        },
      };
    },
    clearSearch(state, { payload }) {
      return {
        ...state,
        search: {
          ...state.search,
          [payload.type]: null,
        },
      };
    },
  },
};
