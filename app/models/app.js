import { NavigationActions as routerRedux } from '../utils';
import codePush from 'react-native-code-push';
import codePushSaga from 'react-native-code-push-saga';
import { Alert } from 'react-native';
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

      // disallow
      codePush.disallowRestart();

      const result = yield call(codePush.checkForUpdate);
      const isMandatory = R.pathOr(false, ['isMandatory'])(result);
      if (result) {
        yield put({
          type: 'codePush/saveUpdateInfo',
          payload: result,
        });
        if (isMandatory) {
          // reallow
          codePush.allowRestart();
          yield put(
            routerRedux.navigate({
              routeName: 'CodePush',
            }),
          );
        }
      }

      yield spawn(codePushSaga, {
        codePushStatusDidChange: e => {
          store.dispatch({
            type: 'codePush/changeState',
            payload: e,
          });
        },
        codePushDownloadDidProgress: ({ receivedBytes, totalBytes }) => {
          try {
            if (!isMandatory && receivedBytes === totalBytes) {
              // download complete
              Alert.alert('版本更新', '更新内容已准备就绪', [
                { text: '立即更新',
                  onPress: () => {
                    // reallow
                    codePush.allowRestart();
                    codePush.restartApp();
                  },
                },
                { text: '取消', style: 'cancel' },
              ]);
            }

            const percent = (receivedBytes / totalBytes).toFixed(2);
            store.dispatch({
              type: 'codePush/changePercent',
              payload: percent,
            });
          } catch (e) {
            console.log(e);
          }
        },
        syncOptions: {
          installMode: codePush.InstallMode.IMMEDIATE,
          mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
          syncOnResume: true,
          syncOnInterval: 60,
        },
      });
    },
  },
};
