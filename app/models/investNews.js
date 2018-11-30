import { getInvestNews } from '../services/api';
import R from 'ramda';
import { paginate } from '../utils/pagination';

export default {
  namespace: 'investNews',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const { data } = yield call(getInvestNews, {
          ...payload,
        });

        yield put({
          type: 'list',
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
  },
};
