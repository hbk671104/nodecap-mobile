import React, { Component } from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import shareModal from 'component/shareModal';
import WebView from 'component/uikit/webview';
import Config from 'runtime/index';

import styles from './style';

@shareModal
export default class ReportPage extends Component {
  handleShare = () => {
    const item = this.props.navigation.getParam('coin');
    const data = this.props.navigation.getParam('data');
    const url = `${Config.MOBILE_SITE}/weekly-report?id=${data.id}`;
    const request = {
      webpageUrl: url,
      title: data.title,
      description: '来 Hotnode, 发现最新最热项目！',
      thumbImage: item.icon,
    };

    this.props.openShareModal({
      types: [{
        type: 'timeline',
        ...request,
      }, {
        type: 'session',
        ...request,
      }, {
        type: 'link',
        url,
      }],
    });
  }

  render() {
    const data = this.props.navigation.getParam('data');
    const url = `${Config.MOBILE_SITE}/weekly-report?id=${data.id}`;

    return (
      <View style={styles.container}>
        <NavBar
          back
          gradient
          title={data.title}
          titleContainerStyle={{ paddingHorizontal: 42 }}
          renderRight={() => (
            <Touchable borderless onPress={this.handleShare}>
              <Text style={styles.navBar.right}>分享</Text>
            </Touchable>
          )}
        />
        <WebView
          startInLoadingState
          source={{ uri: url }}
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
