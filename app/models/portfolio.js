import * as R from 'ramda';
import { portfolioIndex } from '../services/api';

const pagination = (state, action, key) => {
  const data = R.pathOr([], [key, 'index', 'data'])(state);
  if (R.isEmpty(data)) {
    return action.payload;
  }
  return {
    ...action.payload,
    data: R.concat(data, R.path(['payload', 'data'])(action)),
  };
};

export default {
  namespace: 'portfolio',
  state: {
    exchangeable: {
      index: null,
      params: {},
    },
    unexchangeable: {
      index: null,
      params: {
        status: '4,5,6',
      },
    },
  },
  effects: {
    *index({ payload = {} }, { call, put }) {
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
      const key = 'unexchangeable';
      return {
        ...state,
        [key]: {
          index: pagination(state, action, key),
          params: action.params,
        },
      };
    },
  },
};
