export default {
  namespace: 'codePush',

  state: {
    status: null,
    percent: 0,
    update: {},
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
    saveUpdateInfo(state, { payload }) {
      return {
        ...state,
        update: payload,
      };
    },
  },
};
