import { getFunds } from '../services/api';

export default {
  namespace: 'fund',
  state: {
    funds: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      try {
        const res = yield call(getFunds);
        yield put({
          type: 'save',
          payload: res.data,
        });
      } catch (e) {
        console.log('e', e);
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        funds: action.payload,
      };
    },
  },
};

