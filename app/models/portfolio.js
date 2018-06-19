import * as R from 'ramda';
import { portfolioIndex, getProjectChartData } from '../services/api';

const pagination = (state, action, key) => {
  const data = R.pathOr([], [key, 'index', 'data'])(state);
  const oldStatus = R.path([key, 'params', 'status'])(state);
  if (R.isEmpty(data) || !R.equals(oldStatus, action.params.status)) {
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
    *index({ payload = {}, callback }, { call, put }) {
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
        if (callback) {
          callback();
        }
      } catch (e) {
        console.log(e);
      }
    },
    *projectStat({ id, callback }, { call }) {
      try {
        const res = yield call(getProjectChartData, id);
        if (callback) {
          callback(res);
        }
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
