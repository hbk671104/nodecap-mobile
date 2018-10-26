import codePush from 'react-native-code-push';

export default {
  namespace: 'codePush',

  state: {
    status: null,
    percent: 0,
    meta: {},
  },
  effects: {
    *getMeta(_, { call, put }) {
      try {
        const update = yield call(codePush.getUpdateMetadata, codePush.UpdateState.RUNNING);
        yield put({
          type: 'saveMeta',
          payload: update,
        });
      } catch (e) {
        console.log(e);
      }
    },
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
    saveMeta(state, { payload }) {
      return {
        ...state,
        meta: payload,
      };
    },
  },
};
