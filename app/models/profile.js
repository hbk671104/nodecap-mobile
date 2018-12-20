import {
  getUserById,
} from 'services/individual/api';

export default {
  namespace: 'profile',
  state: {
    current: {},
  },
  effects: {
    *getProfileById({ id }, { call, put }) {
      try {
        const { data } = yield call(getUserById, id);
        yield put({
          type: 'saveUserProfile',
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
  reducers: {
    saveUserProfile(state, action) {
      return {
        ...state,
        current: action.payload,
      };
    },
    clear(state) {
      return {
        ...state,
        current: {},
      };
    },
  },
};
