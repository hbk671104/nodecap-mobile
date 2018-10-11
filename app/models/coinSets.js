import R from 'ramda';
import { getCoinSets, getCoinsBySetID } from 'services/api';
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
    setFavorStatus(state, action) {
      const { coins } = state;
      R.pipe(
        R.keys,
        R.forEach(c => {
          coins[c].data = R.pipe(
            R.path([c, 'data']),
            R.map(i => {
              if (i.id === action.payload) {
                const star_number = parseInt(i.stars, 10);
                return {
                  ...i,
                  is_focused: action.status,
                  stars: action.status
                    ? `${star_number + 1}`
                    : `${star_number - 1}`,
                };
              }
              return i;
            }),
          )(coins);
        }),
      )(coins);

      return {
        ...state,
        coins,
      };
    },
  },
};
