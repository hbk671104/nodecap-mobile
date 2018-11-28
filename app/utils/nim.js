import SDK from '../../lib/NIM_Web_SDK_rn_v5.8.0';

const initNIM = ({ account, token }) => {
  global.nim = SDK.NIM.getInstance({
    debug: false,
    appKey: 'f37350b9eb87d7159bb2df496ff02844',
    account,
    token,
    db: false,
    syncSessionUnread: true,
    onconnect: () => {
      console.log('connect');
    },
    onerror: event => {
      console.log('error', event.message);
    },
    onsyncdone: () => {
      console.log('sync done');
    },
    onmsg: msg => {},
    onofflinemsgs: msg => {},
    onroamingmsgs: msg => {},
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

export { initNIM, destroyNIM };
