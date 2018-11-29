import moment from 'moment';
import R from 'ramda';
import realm from 'realm';
import SDK from '../../lib/NIM_Web_SDK_rn_v5.8.0';

SDK.usePlugin({
  db: realm,
});

const initNIM = ({ account, token }) => {
  global.nim = SDK.NIM.getInstance({
    debug: false,
    appKey: 'f37350b9eb87d7159bb2df496ff02844',
    account,
    token,
    db: true,
    syncRoamingMsgs: true,
    syncSessionUnread: true,
    onconnect: () => {
      console.log('connect');
    },
    onerror: event => {
      console.log('error', event.message);
    },
    onsessions: sessions => {
      console.log('收到会话列表', sessions);
    },
    onmsg: msg => {
      console.log('onmsg', msg);
    },
    // onofflinemsgs: msg => {
    //   console.log('onofflinemsgs', msg);
    // },
    // onroamingmsgs: msg => {
    //   console.log('onroamingmsgs', msg);
    // },
    onsyncdone: () => {
      console.log('sync done');
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
