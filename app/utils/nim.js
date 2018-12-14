import moment from 'moment';
import R from 'ramda';
import realm from 'realm';
import SDK from '../../lib/NIM_Web_SDK_rn_v5.8.0';
import store from '../../index';
import { RouterEmitter } from '../router';

SDK.usePlugin({
  db: realm,
});

const initNIM = ({ account, token }) => {
  store.dispatch({ type: 'message_center/setLoading', payload: true });
  global.nim = SDK.NIM.getInstance({
    debug: false,
    appKey: 'f37350b9eb87d7159bb2df496ff02844',
    account,
    token,
    db: true,
    syncRoamingMsgs: true,
    syncSessionUnread: true,
    autoMarkRead: true,
    onconnect: () => {
      console.log('onconnect');
    },
    onerror: event => {
      console.log('error', event.message);
    },
    onsessions: sessions => {
      // console.log('onsessions', sessions);
      store.dispatch({
        type: 'message_center/fetchSession',
        sessions,
      });
    },
    onupdatesession: sessions => {
      // console.log('onupdatesession', sessions);
      store.dispatch({
        type: 'message_center/updateSession',
        sessions,
      });
    },
    onmsg: msg => {
      RouterEmitter.emit('onmsg', msg);
    },
    // onofflinemsgs: msg => {
    //   console.log('onofflinemsgs', msg);
    // },
    // onroamingmsgs: msg => {
    //   console.log('onroamingmsgs', msg);
    // },
    onsyncdone: () => {
      store.dispatch({
        type: 'message_center/setOnConnect',
      });
      store.dispatch({ type: 'message_center/setLoading', payload: false });
    },
  });
};

const destroyNIM = () => {
  SDK.NIM.destroy({
    done: error => {
      if (!error) {
        global.nim = null;
      }
    },
  });
};

const formatMessage = (m, userInfo) => ({
  _id: R.path(['idClient'])(m),
  text: R.path(['text'])(m),
  createdAt: moment(R.path(['time'])(m)),
  user: {
    _id: R.path(['from'])(m),
    ...userInfo,
  },
});

export { initNIM, destroyNIM, formatMessage };
