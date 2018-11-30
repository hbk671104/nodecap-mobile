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
      codePush.allowRestart();
      codePush.notifyAppReady();
      const result = yield call(codePush.checkForUpdate);
      const isMandatory = R.pathOr(false, ['isMandatory'])(result);
      const description = R.path(['description'])(result);
      if (result) {
        yield put({
          type: 'codePush/saveUpdateInfo',
          payload: result,
        });
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
            if (receivedBytes === totalBytes) {
              if (!isMandatory) {
                // download complete
                alert('is not Mandatory');
                codePush.allowRestart();
                global.track('App_Codepush', {
                  trackName: '非强制更新',
                });
              } else {
                codePush.disallowRestart();
                alert('isMandatory');
                Alert.alert('版本更新', description || '更新内容已准备就绪，即刻享用新版本！', [
                  { text: '一秒更新',
                    onPress: () => {
                      // reallow
                      codePush.allowRestart();
                      codePush.restartApp();
                      global.track('App_Codepush', {
                        trackName: '强制更新',
                      });
                    },
                  },
                ]);
              }
            }
            // const percent = (receivedBytes / totalBytes).toFixed(2);
            // store.dispatch({
            //   type: 'codePush/changePercent',
            //   payload: percent,
            // });
          } catch (e) {
            console.log(e);
          }
        },
        syncOptions: {
          installMode: codePush.InstallMode.ON_NEXT_RESUME,
          mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART,
          syncOnResume: true,
          syncOnInterval: 60,
          minimumBackgroundDuration: 5,
        },
      });
    },
  },
};
