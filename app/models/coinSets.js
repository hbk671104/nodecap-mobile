
import R from 'ramda';
import {
  getCoinSets,
  getCoinsBySetID,
} from 'services/api';
import { paginate } from '../utils/pagination';

export default {
  namespace: 'coinSets',
  state: {
    sets: null,
    coins: {},
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      try {
        const { data } = yield call(getCoinSets, payload);
        yield put({
          type: 'setsList',
          payload: data,
        });
        if (callback) {
          callback();
        }
      } catch (e) {
        console.log(e);
      }
    },
    *fetchCoins({ set_id, callback }, { call, put }) {
      try {
        const { data } = yield call(getCoinsBySetID, set_id);
        yield put({
          type: 'coins',
          payload: data,
          set_id,
        });
        if (callback) {
          callback();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  reducers: {
    setsList(state, action) {
      return {
        ...state,
        sets: R.path(['payload', 'data'])(action),
      };
    },
    coins(state, action) {
      return {
        ...state,
        coins: {
          ...state.coins,
          [action.set_id]: paginate(state.coins[action.set_id], action.payload),
        },
      };
    },
  },
};
