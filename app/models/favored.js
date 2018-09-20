import R from 'ramda';
import * as IndividualAPI from 'services/individual/api';
import { paginate } from '../utils/pagination';

export default {
  namespace: 'favored',
  state: {
    list: null,
  },
  effects: {
    *fetch({ callback }, { call, put }) {
      try {
        const { data } = yield call(IndividualAPI.getFavoredCoin);

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
