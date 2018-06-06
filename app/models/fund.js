import { getFunds } from '../services/api';

export default {
  namespace: 'fund',
  state: {
    funds: [],
    error: {},
  },
  effects: {
    * fetch(_, { call, put }) {
      try {
        const res = yield call(getFunds);
        yield put({
          type: 'save',
          payload: res.data,
        });
      } catch (e) {
        console.log('e', e);
        yield put({
          type: 'error',
          payload: e,
        });
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
    error(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
};
