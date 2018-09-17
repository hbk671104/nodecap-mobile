import React from 'react';
import { AppRegistry, UIManager, AsyncStorage } from 'react-native';
import { autoRehydrate, persistStore } from 'redux-persist';
import { Sentry } from 'react-native-sentry';
import Orientation from 'react-native-orientation';

import moment from 'moment';
import 'moment/locale/zh-cn';
import './app/utils/sensor';
import dva from './app/utils/dva';
import Router, { routerMiddleware } from './app/router';
import routerModel from './app/models/router';
import loginModel from './app/models/login';
import appModel from './app/models/app';
import fundModel from './app/models/fund';
import globalModel from './app/models/global';
import portfolioModel from './app/models/portfolio';
import userModel from './app/models/user';
import codepushModel from './app/models/codepush';
import resourceModel from './app/models/resource';
import colleagueModel from './app/models/colleague';
import notificationModel from './app/models/notification';
import recommendationModel from './app/models/recommendation';
import publicProjectModel from './app/models/public_project';
import institutionModel from './app/models/institution';

export const app = dva({
  initialState: {},
  models: [
    routerModel,
    loginModel,
    appModel,
    globalModel,
    fundModel,
    portfolioModel,
    userModel,
    codepushModel,
    resourceModel,
    colleagueModel,
    notificationModel,
    recommendationModel,
    publicProjectModel,
    institutionModel,
  ],
  onAction: [routerMiddleware],
  extraEnhancers: [autoRehydrate()],
});

export const persist = callback => {
  persistStore(
    app._store,
    {
      storage: AsyncStorage,
      whitelist: [
        'login',
        'global',
        'app',
        'fund',
        'user',
        'institution',
        'public_project',
        'notification',
      ],
    },
    callback,
  );
};

const App = app.start(<Router store={app._store} />);

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

Orientation.lockToPortrait();

moment.locale('zh-cn');

if (!global.__DEV__) {
  Sentry.config(
    'https://ddb97cb8b57843c5bb330456bd6e8353@sentry.io/1234872',
  ).install();
}

AppRegistry.registerComponent('nodecap', () => App);

export default app._store;
