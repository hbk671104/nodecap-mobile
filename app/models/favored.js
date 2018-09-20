import R from 'ramda';
import * as IndividualAPI from 'services/individual/api';
import { paginate } from '../utils/pagination';

export default {
  namespace: 'favored',
  state: {
    list: null,
  },
  effects: {
    *fetch({ callback, payload }, { call, put }) {
      try {
        const { data } = yield call(IndividualAPI.getFavoredCoin, payload);

        yield put({
          type: 'save',
          payload: data,
        });

        if (callback) {
          yield call(callback);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *favor({ callback, id }, { call, put }) {
      try {
        const { status } = yield call(IndividualAPI.favorCoin, [id]);

        yield put({
          type: 'fetch',
        });

        if (callback) {
          yield call(callback, status === 200);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *unfavor({ callback, id }, { call, put }) {
      try {
        const { status } = yield call(IndividualAPI.unfavorCoin, id);

        yield put({
          type: 'fetch',
        });

        if (callback) {
          yield call(callback, status === 200);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        list: paginate(state.list, action.payload),
      };
    },
  },
};
