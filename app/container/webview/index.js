import React, { Component } from 'react';
import { View } from 'react-native';
import R from 'ramda';

import NavBar from 'component/navBar';
import WebView from 'component/uikit/webview';
import styles from './style';

export default class WebPage extends Component {
  render() {
    let uri = this.props.navigation.getParam('uri', 'https://www.hotnode.cn');
    // uri handling
    uri = R.test(/https:|http:/, uri) ? uri : `http://${uri}`;
    const title = this.props.navigation.getParam('title', '');

    return (
      <View style={styles.container}>
        <NavBar
          back
          gradient
          title={title}
          titleContainerStyle={{ paddingHorizontal: 42 }}
        />
        <WebView
          startInLoadingState
          source={{ uri }}
          renderError={e => {
            if (e === 'WebKitErrorDomain') {
              return null;
            }
          }}
        />
      </View>
    );
  }
}
