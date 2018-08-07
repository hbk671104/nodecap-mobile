import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import WebView from 'component/uikit/webview';
import NavBar from 'component/navBar';
import styles from './style';

@connect()
class ResetPwd extends Component {
  handleBack = () => {
    this.props.dispatch(NavigationActions.back());
  };

  handleOnMessage = ({
    event: {
      nativeEvent: { data },
    },
  }) => {
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
          source={{ uri: 'http://www.hotnode.io/user/forget' }}
          onMessage={this.handleOnMessage}
        />
      </View>
    );
  }
}

export default ResetPwd;
