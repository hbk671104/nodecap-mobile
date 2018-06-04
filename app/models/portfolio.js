import * as R from 'ramda';
import { portfolioIndex } from '../services/api';

export default {
  namespace: 'portfolio',
  state: {
    exchangeable: {
      index: null,
      params: {},
    },
    unexchangeable: {
      index: null,
      params: {},
    },
  },
  effects: {
    * index({ payload = {} }, { call, put }) {
      try {
        const req = {
          ...payload,
        };
        const res = yield call(portfolioIndex, req);
        yield put({
          type: 'list',
          payload: res.data,
          params: payload,
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
  reducers: {
    list(state, action) {
      const key = 'blah';
      return {
        ...state,
        [key]: {
          index: action.payload,
          params: action.params,
        },
      };
    },
  },
};
