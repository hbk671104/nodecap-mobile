import R from 'ramda';
import { getUserById } from 'services/api';
import {
  getUserByNIM,
  getNotification,
  markNotificationRead,
} from 'services/individual/api';
import { paginate } from '../utils/pagination';

export default {
  namespace: 'message_center',
  state: {
    session: {
      raw: null,
      data: null,
    },
    notification: null,
    chat_user: null,
    connected: false,
  },
  effects: {
    *fetchSession({ sessions }, { call, put, all }) {
      try {
        const result = yield all(
          R.map(d => (d.to ? call(getUserByNIM, d.to) : Promise.resolve()))(sessions),
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
    *updateSession({ sessions }, { select, put }) {
      try {
        let session_data = sessions;
        const raw_session = yield select(state =>
          R.path(['message_center', 'session', 'raw'])(state),
        );
        if (raw_session) {
          session_data = global.nim.mergeSessions(raw_session, session_data);
        }

        yield put({
          type: 'fetchSession',
          sessions: session_data,
        });
      } catch (error) {
        console.log(error);
      }
    },
    *fetchNotification({ updateListUnread = true, params }, { call, put }) {
      try {
        const { data } = yield call(getNotification, params);

        yield put({
          type: 'saveNotification',
          payload: data,
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
            R.path(['data']),
            R.addIndex(R.map)((p, i) => {
              const is_read_item_store = R.path([i, 'is_read_item'])(
                store_data,
              );
              return {
                ...p,
                is_read_item: updateListUnread
                  ? R.path(['is_read'])(p)
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
            R.path(['notification', 'data']),
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
  },
};
