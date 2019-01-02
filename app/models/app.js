import { NavigationActions as routerRedux } from '../utils';
import codePush from 'react-native-code-push';
import codePushSaga from 'react-native-code-push-saga';
import { Alert } from 'react-native';
import R from 'ramda';

import { hasAppStoreUpdate } from 'utils/utils';
import store from '../../index';

export default {
  namespace: 'app',
  state: {
    project_create_route: [
      {
        name: 'CreateMyProjectBasicInfo',
        title: '基本信息',
      },
      {
        name: 'CreateMyProjectDescription',
        title: '项目介绍',
      },
      // {
      //   name: 'CreateMyProjectTeam',
      //   title: '团队成员',
      // },
      {
        name: 'CreateMyProjectSocial',
        title: '社群信息',
      },
      {
        name: 'CreateMyProjectRoadMap',
        title: '路线图',
      },
      {
        name: 'CreateMyProjectFunding',
        title: '募资信息',
      },
    ],
    institution_create_route: [
      {
        name: 'CreateMyInstitutionBasicInfo',
        title: '机构信息',
      },
      {
        name: 'CreateMyInstitutionDescription',
        title: '机构介绍',
      },
      // {
      //   name: 'CreateMyInstitutionTeam',
      //   title: '团队成员',
      // },
      {
        name: 'CreateMyInstitutionServedProject',
        title: '服务过的项目',
      },
    ],
  },
  reducers: {},
  effects: {
    *checkForUpdate(_, { call, put }) {
      try {
        const { hasUpdate, releaseNotes } = yield call(hasAppStoreUpdate);
        if (hasUpdate) {
          yield put({
            type: 'update/toggle',
            payload: { releaseNotes },
          });
          return;
        }
        yield put({
          type: 'checkCodePush',
          callback: () => {
            Alert.alert('暂无更新');
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    *checkCodePush({ callback }, { spawn, call, put }) {
      if (global.__DEV__) {
        return;
      }

      // disallow
      codePush.notifyAppReady();
      codePush.disallowRestart();

      const result = yield call(codePush.checkForUpdate);
      const isMandatory = R.pathOr(false, ['isMandatory'])(result);
      const description = R.pathOr(false, ['description'])(result);

      if (R.isNil(result)) {
        if (callback) {
          yield call(callback);
        }
        return;
      }

      yield put({
        type: 'codePush/saveUpdateInfo',
        payload: result,
      });
      if (isMandatory) {
        // reallow
        codePush.allowRestart();
        // yield put(
        //   routerRedux.navigate({
        //     routeName: 'CodePush',
        //   }),
        // );
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
              Alert.alert(
                '版本更新',
                description || '更新内容已准备就绪，即刻享用新版本！',
                [
                  {
                    text: '一秒更新',
                    onPress: () => {
                      // reallow
                      codePush.allowRestart();
                      codePush.restartApp();
                    },
                  },
                ],
                { cancelable: false },
              );
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
          installMode: codePush.InstallMode.IMMEDIATE,
          mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
          syncOnResume: true,
          syncOnInterval: 60,
        },
      });
    },
  },
};
