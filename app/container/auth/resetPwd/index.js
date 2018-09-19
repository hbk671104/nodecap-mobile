import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Config from 'react-native-config';

import WebView from 'component/uikit/webview';
import NavBar from 'component/navBar';
import styles from './style';

@connect()
class ResetPwd extends Component {
  handleBack = () => {
    this.props.dispatch(NavigationActions.back());
  };

  handleOnMessage = ({ nativeEvent: { data } }) => {
    if (data === 'backToLogin') {
      this.handleBack();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <NavBar barStyle="dark-content" back />
        <WebView
          startInLoadingState
          source={{ uri: 'https://www.hotnode.cn/user/forget?v=1' }}
          onMessage={this.handleOnMessage}
        />
      </View>
    );
  }
}

export default ResetPwd;
