import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as WeChat from 'react-native-wechat';

import SafeAreaView from 'component/uikit/safeArea';
import Icon from 'component/uikit/icon';
import styles from './style';

class Share extends PureComponent {
  static propTypes = {
    fund: PropTypes.object.isRequired,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    onClose: () => null,
  };

  state = {
    isWXAppSupportApi: false,
    isWXAppInstalled: false,
  };

  componentWillMount() {
    // check wechat availability
    // this.setState({
    //   isWXAppSupportApi: await WeChat.isWXAppSupportApi(),
    //   isWXAppInstalled: await WeChat.isWXAppInstalled(),
    // });
  }

  render() {
    const { fund, onClose } = this.props;
    const { isWXAppSupportApi, isWXAppInstalled } = this.state;
    const wechatAvailable = isWXAppSupportApi && isWXAppInstalled;
    return (
      <SafeAreaView style={styles.container}>
        <Text>哈哈哈</Text>
        <View style={styles.actionBar.container}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="arrow-back" size={24} color="#a1a1a1" />
          </TouchableOpacity>
          <View style={styles.actionBar.content.container}>
            {wechatAvailable && (
              <TouchableOpacity onPress={this.shareTo('wechat')}>
                <Image source={require('asset/wechat_icon.png')} />
              </TouchableOpacity>
            )}
            {wechatAvailable && (
              <TouchableOpacity
                style={{ marginLeft: 24 }}
                onPress={this.shareTo('moment')}
              >
                <Image source={require('asset/wechat_moment_icon.png')} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{ marginLeft: 24 }}
              onPress={this.saveToCameraRoll}
            >
              <Image source={require('asset/save.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Share;
