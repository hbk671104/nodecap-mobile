import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { initializeListeners } from 'react-navigation-redux-helpers';
import SplashScreen from 'react-native-splash-screen';
import R from 'ramda';
import * as Animatable from 'react-native-animatable';

import SafeArea from 'component/uikit/safeArea';
import NavBar from 'component/navBar';
import Loading from 'component/uikit/loading';

import { connect } from '../../utils/dva';
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
      <SafeArea style={styles.container}>
        <NavBar barStyle="dark-content" />
        <View style={styles.wrapper}>
          <View style={styles.top.container}>
            <Animatable.Image
              iterationCount="infinite"
              animation="pulse"
              source={require('asset/loader/squirt.png')}
            />
            <Image
              style={styles.top.box}
              source={require('asset/loader/logo_box.png')}
            />
            <Image source={require('asset/loader/logo_text.png')} />
          </View>
          <Loading />
          <Image
            style={styles.bottom}
            source={require('asset/loader/logo_bottom.png')}
          />
        </View>
      </SafeArea>
    );
  }
}
