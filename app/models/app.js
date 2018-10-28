import { NavigationActions as routerRedux } from '../utils';
import codePush from 'react-native-code-push';
import codePushSaga from 'react-native-code-push-saga';
import R from 'ramda';

import store from '../../index';

export default {
  namespace: 'app',
  state: {},
  reducers: {},
  effects: {
    *checkCodePush(_, { spawn, call, put }) {
      if (global.__DEV__) {
        return;
      }

      const result = yield call(codePush.checkForUpdate);
      const isMandatory = R.pathOr(false, ['isMandatory'])(result);

      if (isMandatory) {
        yield put({
          type: 'codePush/saveUpdateInfo',
          payload: result,
        });
        yield put(
          routerRedux.navigate({
            routeName: 'CodePush',
          }),
        );
      }

      yield spawn(codePushSaga, {
        codePushStatusDidChange: e => {
          store.dispatch({
            type: 'codePush/changeState',
            payload: e,
          });
        },
        codePushDownloadDidProgress: progress => {
          try {
            const percent = (
              progress.receivedBytes / progress.totalBytes
            ).toFixed(2);
            store.dispatch({
              type: 'codePush/changePercent',
              payload: percent,
            });
          } catch (e) {
            alert(JSON.stringify(e));
          }
        },
        // syncOptions: {
        //   installMode: codePush.InstallMode.ON_NEXT_RESUME,
        //   mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
        //   syncOnResume: true,
        //   syncOnInterval: 60,
        // },
      });
    },
  },
};
