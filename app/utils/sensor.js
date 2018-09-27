import React, { Component } from 'react';
import { NativeModules, Platform } from 'react-native';
import store from '../../index';

const RNSensorsAnalyticsModule = NativeModules.RNSensorsAnalyticsModule;

const EMPTY_FUNCTION = () => ({});
/* eslint-disable */
global.s = () => {
  const sFunction =
    RNSensorsAnalyticsModule ||
    (() => ({
      track: EMPTY_FUNCTION,
      registerSuperProperties: EMPTY_FUNCTION,
      login: EMPTY_FUNCTION,
      logout: EMPTY_FUNCTION,
    }));
  return sFunction;
};

global.setProfile = profile => {
  if (Platform.OS === 'ios') {
    RNSensorsAnalyticsModule.set(profile);
  } else {
    RNSensorsAnalyticsModule.profileSet(profile);
  }
};

global.st = function(operationID, rest = {}) {
  const res = function(target, name, descriptor) {
    const fn = descriptor.value;
    descriptor.value = function(...args) {
      let R = require('ramda');
      fn.apply(this, args);
      const trackName = R.path(['props', '_trackName'])(this);
      if (!trackName) {
        return;
      }
      const pageName =
        R.path(['props', '_pageName'])(this) ||
        R.path(['props', 'match', 'url'])(this);
      s().track(trackName, {
        pageName,
        operationID,
        ...rest,
      });
    };
    return descriptor;
  };
  return res;
};

global.track = function(operationID, rest = {}) {
  let R = require('ramda');
  const trackName = R.path(['trackName'])(rest) || rest.trackName;
  if (!trackName) {
    return;
  }
  const pageName = R.path(['pageName'])(rest) || rest.pageName;

  // company info
  const companyId = R.path(['user', 'currentUser', 'companies', 0, 'id'])(
    store.getState(),
  );
  s().track(trackName, {
    platformType: Platform.OS === 'ios' ? 'iOS' : 'Android',
    enterpriseID: companyId,
    pageName,
    operationID,
    ...rest,
  });
};

global.bindTrack = function({ page, name, ...restParams }) {
  return function(target) {
    const WrappedComponent = target;
    return class TrackWrapper extends Component {
      render() {
        return (
          <WrappedComponent
            {...this.props}
            _pageName={page}
            _trackName={name}
            track={(operate, rest = {}) => {
              global.track(operate, {
                pageName: page,
                trackName: name,
                ...rest,
                ...restParams,
              });
            }}
          />
        );
      }
    };
  };
};
