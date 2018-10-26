import { getBanners } from '../services/individual/api';
import { uploadFiles } from 'services/upload';
import * as R from 'ramda';

export default {
  namespace: 'banners',
  state: {
    list: null,
    current: null,
  },
  effects: {
    *get({ payload, callback }, { put, call }) {
      try {
        const { data } = yield call(getBanners);
        yield put({
          type: 'list',
          payload: data,
        });
        if (callback) {
          callback(data);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  reducers: {
    list(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    current(state, action) {
      return {
        ...state,
        current: action.payload,
      };
    },
  },
};
