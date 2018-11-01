import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { initializeListeners } from 'react-navigation-redux-helpers';
import SplashScreen from 'react-native-splash-screen';
import R from 'ramda';
import * as Animatable from 'react-native-animatable';

import NavBar from 'component/navBar';
import Loading from 'component/uikit/loading';

import { connect } from '../../utils/dva';
import { NavigationActions } from '../../utils';
import { persist } from '../../../index';
import styles from './style';

@connect(({ global, login }) => ({
  constants: global.constants,
  isLogin: R.not(R.isNil(login.token)),
}))
export default class Loader extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    persist(() => {
      this.props.dispatch({
        type: this.props.isLogin ? 'global/bootstrap' : 'global/startup',
      });
      initializeListeners('root', this.props.router);

      // hide
      SplashScreen.hide();
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar barStyle="dark-content" />
        <View style={styles.wrapper}>
          <View style={styles.top.container}>
            <Animatable.Image
              iterationCount="infinite"
              animation="pulse"
              source={require('asset/big_logo.png')}
            />
            <Text style={styles.top.intro}>找项目 上 Hotnode</Text>
          </View>
          <Loading />
        </View>
      </View>
    );
  }
}
