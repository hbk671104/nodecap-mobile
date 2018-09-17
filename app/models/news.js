import R from 'ramda';
import { getLiveList } from '../services/api';


export default {
  namespace: 'news',
  state: {
    news: null,
    payload: null,
  },
  effects: {
    *index({ payload }, { call, put, select }) {
      try {
        const lastID = yield select(({ news }) => news.payload);
        const res = yield call(getLiveList, payload ? lastID : null);
        const newsList = R.pipe(
          R.path(['data', 'list']),
          R.map(i => i.lives),
          R.flatten
        )(res);
        if (payload) {
          yield put({
            type: 'concat',
            payload: {
              id: R.path(['data', 'bottom_id'])(res),
              data: newsList,
            },
          });
          return;
        }
        yield put({
          type: 'save',
          payload: {
            id: R.path(['data', 'bottom_id'])(res),
            data: newsList,
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        payload: action.payload.id,
        news: action.payload.data,
      };
    },
    concat(state, action) {
      console.log('action.payload.data', action.payload.data);
      return {
        ...state,
        payload: action.payload.id,
        news: [
          ...state.news,
          ...action.payload.data,
        ],
      };
    },
  },
};
