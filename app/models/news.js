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
    *index({ payload, callback }, { call, put, select, all }) {
      try {
        yield all([
          // insite news
          put({
            type: 'notification/fetchInSite',
          }),
          put({
            type: 'banners/get',
          }),
          // 上所公告
          put({
            type: 'notification/fetch',
          }),
          // fetch selected public project
          put({
            type: 'public_project/fetchSelected',
          }),
          // fetch report
          put({
            type: 'institution/fetchReports',
          }),
          // market sentiment
          put({
            type: 'hotnode_index/fetchSentiment',
          }),
          // hotnode index
          put({
            type: 'hotnode_index/fetchGlobal',
          }), // hotnode index
          put({
            type: 'hotnode_index/fetchSentiment',
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
        const oldUpdateCount = yield select(({ news }) => news.updated_count);
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

        if (callback) {
          callback(batchTopId - topId, oldUpdateCount);
        }
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
        news: R.pipe(
          R.insert(9, { type: 'report' }),
          R.insert(3, { type: 'announcement' }),
        )(payload.data),
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
