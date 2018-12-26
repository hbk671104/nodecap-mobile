import R from 'ramda';
import { getYellowpageList } from '../services/api';

export default {
  namespace: 'yellowpage',
  state: {
    list: null,
  },
  effects: {
    *fetch(_, { call, put }) {
      try {
        const { data } = yield call(getYellowpageList);

        yield put({
          type: 'list',
          payload: data,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  reducers: {
    list(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
  },
};
