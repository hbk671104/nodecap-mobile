import React from 'react';
import { AppRegistry, UIManager } from 'react-native';
import { autoRehydrate } from 'redux-persist';
import dva from './app/utils/dva';
import Router, { routerMiddleware } from './app/router';
import dashboard from './app/models/dashboard';
import routerModel from './app/models/router';
import loginModel from './app/models/login';
import appModel from './app/models/app';
import fundModel from './app/models/fund';
import globalModal from './app/models/global';
import portfolioModal from './app/models/portfolio';

const app = dva({
  initialState: {},
  models: [dashboard, routerModel, loginModel, appModel, globalModal, fundModel, portfolioModal],
  onAction: [routerMiddleware],
  onError(e) {
    console.log('onError', e);
  },
  extraEnhancers: [autoRehydrate()],
});

const App = app.start(<Router store={app._store} />);

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

AppRegistry.registerComponent('nodecap', () => App);

export default app._store;
