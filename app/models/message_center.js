import R from 'ramda';
import { getUserById } from 'services/api';
import {
  getUserByNIM,
  getNotification,
  markNotificationRead,
} from 'services/individual/api';
import { paginate } from '../utils/pagination';

const initialState = {
  session: {
    raw: null,
    data: null,
  },
  notification: null,
  chat_user: null,
  connected: false,
  loading: false,
};

export default {
  namespace: 'message_center',
  state: initialState,
  effects: {
    *fetchSession({ sessions: s }, { select, call, put, all }) {
      try {
        let sessions = s;
        // merge if necessary
        const raw_session = yield select(state =>
          R.path(['message_center', 'session', 'raw'])(state),
        );

        sessions = Array.isArray(sessions)
          ? R.filter(i => !!i.to)(sessions)
          : [sessions];

        if (raw_session) {
          sessions = global.nim.mergeSessions(raw_session, sessions);
        }

        // iterate
        const result = yield all(
          R.map(d => call(getUserByNIM, d.to))(sessions),
        );

        yield put({
          type: 'saveSession',
          raw: sessions,
          payload: R.addIndex(R.map)(({ data }, index) => {
            const session = R.path([index])(sessions);
            return {
              ...data,
              lastMsg: R.path(['lastMsg'])(session),
              unread: R.path(['unread'])(session),
            };
          })(result),
        });
      } catch (error) {
        console.log(error);
      }
    },
    *updateSession({ sessions }, { put }) {
      try {
        yield put({
          type: 'fetchSession',
          sessions,
        });
      } catch (error) {
        console.log(error);
      }
    },
    *fetchNotification({ updateListUnread = true, params }, { call, put, all }) {
      try {
        const { data } = yield call(getNotification, params);
        const combineData = yield all(
          R.pathOr([], ['data'])(data)
            .map(async i => {
              const res = await getUserById(R.path(['sender', 'id'])(i));
              const orgInfo = R.pathOr([], ['data', 'org_info'])(res);
              const coinInfo = R.pathOr([], ['data', 'coin_info'])(res);
              return {
                ...i,
                orgInfo,
                coinInfo,
              };
            }));
        yield put({
          type: 'saveNotification',
          payload: {
            data: combineData,
            pagination: data.pagination,
          },
          updateListUnread,
        });
      } catch (error) {
        console.log(error);
      }
    },
    *markNotificationRead({ callback }, { call, put }) {
      try {
        const { status } = yield call(markNotificationRead);

        yield put({
          type: 'fetchNotification',
          updateListUnread: false,
        });

        if (callback) {
          yield call(callback, status === 200);
        }
      } catch (error) {
        console.log(error);
      }
    },
    *getUserById({ id, callback }, { select, call, put }) {
      try {
        const user = yield select(state =>
          R.path(['message_center', 'chat_user', id])(state),
        );
        if (user) {
          if (callback) {
            yield call(callback);
          }
          return;
        }

        const { data } = yield call(getUserById, id);
        yield put({
          type: 'saveChatUser',
          id,
          payload: data,
        });

        if (callback) {
          yield call(callback);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  reducers: {
    saveSession(state, { raw, payload }) {
      return {
        ...state,
        session: {
          raw,
          data: payload,
        },
      };
    },
    saveChatUser(state, { id, payload }) {
      return {
        ...state,
        chat_user: {
          ...state.chat_user,
          [id]: payload,
        },
      };
    },
    saveNotification(state, { updateListUnread, payload }) {
      const store_data = R.path(['notification', 'data'])(state);
      return {
        ...state,
        notification: paginate(state.notification, {
          ...payload,
          data: R.pipe(
            R.pathOr([], ['data']),
            R.addIndex(R.map)((p, i) => {
              const is_read_item_store = R.pathOr(false, [i, 'is_read_item'])(
                store_data,
              );
              return {
                ...p,
                is_read_item: updateListUnread
                  ? R.pathOr(false, ['is_read'])(p)
                  : is_read_item_store,
              };
            }),
          )(payload),
        }),
      };
    },
    clearItemUnread(state) {
      return {
        ...state,
        notification: {
          ...state.notification,
          data: R.pipe(
            R.pathOr([], ['notification', 'data']),
            R.map(d => ({
              ...d,
              is_read_item: true,
            })),
          )(state),
        },
      };
    },
    setOnConnect(state) {
      return {
        ...state,
        connected: true,
      };
    },
    reset() {
      return initialState;
    },
    setLoading(state, { payload }) {
      return {
        ...state,
        loading: payload,
      };
    },
  },
};
