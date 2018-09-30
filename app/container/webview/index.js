import React, { Component } from 'react';
import { View } from 'react-native';

import NavBar from 'component/navBar';
import WebView from 'component/uikit/webview';
import styles from './style';

export default class InstitutionWebsite extends Component {
  render() {
    const uri = this.props.navigation.getParam('uri', 'https://www.hotnode.cn');
    const title = this.props.navigation.getParam('title', '');
    return (
      <View style={styles.container}>
        <NavBar
          back
          gradient
          title={title}
          titleContainerStyle={{ paddingHorizontal: 42 }}
        />
        <WebView startInLoadingState source={{ uri }} />
      </View>
    );
  }
}
