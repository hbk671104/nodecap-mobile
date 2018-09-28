import R from 'ramda';
import { getLiveList } from '../services/api';

export default {
  namespace: 'news',
  state: {
    news: null,
    payload: null,
    updated_count: 0,
  },
  effects: {
    *index({ payload }, { call, put, select, all }) {
      try {
        yield all([
          // insite news
          put.resolve({
            type: 'notification/fetchInSite',
          }),
          // fetch public project
          put.resolve({
            type: 'public_project/fetch',
            params: {
              progress: 0,
            },
          }),
          // fetch report
          put.resolve({
            type: 'institution/fetchReports',
          }),
        ]);

        // index
        const lastID = yield select(({ news }) => news.payload);
        const res = yield call(getLiveList, payload ? lastID : null);
        const newsList = R.pipe(
          R.path(['data', 'list']),
          R.map(i => i.lives),
          R.flatten,
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

        // save update count
        const topId = yield select(({ news }) =>
          R.path(['news', 0, 'id'])(news),
        );
        const batchTopId = R.path([0, 'id'])(newsList);
        yield put({
          type: 'saveUpdateCount',
          payload: batchTopId - topId,
        });

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
      const { payload } = action;
      return {
        ...state,
        payload: payload.id,
        news: R.insert(9, { type: 'report' }, payload.data),
      };
    },
    concat(state, action) {
      return {
        ...state,
        payload: action.payload.id,
        news: [...state.news, ...action.payload.data],
      };
    },
    saveUpdateCount(state, action) {
      return {
        ...state,
        updated_count: action.payload,
      };
    },
  },
};
