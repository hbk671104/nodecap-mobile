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
  },
  effects: {
    *fetchSession({ sessions }, { call, put, all }) {
      try {
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
    *fetchNotification({ params }, { call, put }) {
      try {
        const { data } = yield call(getNotification, params);

        yield put({
          type: 'saveNotification',
          payload: data,
        });
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
    saveNotification(state, { payload }) {
      return {
        ...state,
        notification: paginate(state.notification, payload),
      };
    },
  },
};
