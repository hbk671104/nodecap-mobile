import R from 'ramda';
import { meetingList } from '../services/api';
import { paginate } from '../utils/pagination';

export default {
  namespace: 'activity',
  state: {
    list: null,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(meetingList, payload);

      yield put({
        type: 'save',
        payload: data,
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        list: paginate(state.list, action.payload),
      };
    },
  },
};
