
export default {
  namespace: 'codePush',

  state: {
    status: null,
    percent: 0,
  },

  reducers: {
    changeState(state, { payload }) {
      return {
        ...state,
        status: payload,
      };
    },
    changePercent(state, { payload }) {
      return {
        ...state,
        percent: payload,
      };
    },
  },
};
