import R from 'ramda';
import { paginate } from '../utils/pagination';

export default {
  namespace: 'favored',
  state: {
    list: null,
  },
  effects: {},
  reducers: {
    save(state, action) {
      return {
        ...state,
        list: paginate(state.list, action.payload),
      };
    },
  },
};
