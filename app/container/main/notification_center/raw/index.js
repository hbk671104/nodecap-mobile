import React, { Component } from 'react';
import { View } from 'react-native';

import NavBar from 'component/navBar';
import WebView from 'component/uikit/webview';
import styles from './style';

@global.bindTrack({
  page: '通知详情原文',
  name: 'App_NotificationDetailRawOperation',
})
export default class NotificationDetailRaw extends Component {
  render() {
    const uri = this.props.navigation.getParam('uri', 'https://www.baidu.com/');
    const title = this.props.navigation.getParam('title', '');
    return (
      <View style={styles.container}>
        <NavBar back gradient title={title} />
        <WebView startInLoadingState source={{ uri }} />
      </View>
    );
  }
}
