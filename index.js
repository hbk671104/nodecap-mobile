import React from 'react';
import {
  AppRegistry,
  UIManager,
  AsyncStorage,
  Platform,
  YellowBox,
} from 'react-native';
import { autoRehydrate, persistStore } from 'redux-persist';
import { Sentry } from 'react-native-sentry';
import Orientation from 'react-native-orientation';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';

import moment from 'moment';
import 'moment/locale/zh-cn';
import './app/utils/sensor';
import dva from './app/utils/dva';
import Router, { routerMiddleware, routerReducer } from './app/router';
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
import newsModel from './app/models/news';
import favoredModel from './app/models/favored';
import activityModel from './app/models/activity';
import coinSetsModel from './app/models/coinSets';
import filterModel from './app/models/filter';
import serviceModel from './app/models/service';
import projectCreateModel from './app/models/project_create';
import institutionCreateModel from './app/models/institution_create';
import updateModel from './app/models/update';
import bannerModel from './app/models/banners';
import hotnodeIndexModel from './app/models/hotnode_index';
import globalSearchModel from './app/models/globalSearch';
import investNewsModel from './app/models/investNews';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);

export const app = dva({
  initialState: {},
  models: [
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
    newsModel,
    favoredModel,
    activityModel,
    coinSetsModel,
    filterModel,
    serviceModel,
    projectCreateModel,
    institutionCreateModel,
    updateModel,
    bannerModel,
    hotnodeIndexModel,
    globalSearchModel,
    investNewsModel,
  ],
  extraReducers: { router: routerReducer },
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
        'codePush',
        'fund',
        'user',
        'institution',
        'notification',
        'news',
        'project_create',
        'institution_create',
        'banners',
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

setCustomText({
  style: {
    fontFamily: Platform.OS === 'ios' ? 'PingFangSC-Regular' : 'Roboto',
  },
  allowFontScaling: false,
});

setCustomTextInput({
  allowFontScaling: false,
});

AppRegistry.registerComponent('nodecap', () => App);

export default app._store;
