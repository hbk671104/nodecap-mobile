import React, { Component } from 'react';
import { View } from 'react-native';
import { initializeListeners } from 'react-navigation-redux-helpers';
import SplashScreen from 'react-native-splash-screen';

import NavBar from 'component/navBar';
import Loading from 'component/uikit/loading';

import { connect } from '../../utils/dva';
import { NavigationActions } from '../../utils';
import { persist } from '../../../index';
import styles from './style';

@connect(({ global, login }) => ({
  constants: global.constants,
  isLogin: !!login.token,
}))
export default class Loader extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    persist(() => {
      if (this.props.isLogin) {
        this.props.dispatch({
          type: 'global/bootstrap',
          callback: () => {
            SplashScreen.hide();
          },
        });
      } else {
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: 'Auth',
          }),
        );
        SplashScreen.hide();
      }
      initializeListeners('root', this.props.router);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar barStyle="dark-content" />
        <Loading title="初始化中..." />
      </View>
    );
  }
}
