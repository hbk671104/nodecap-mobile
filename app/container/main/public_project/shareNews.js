import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { Flex } from 'antd-mobile';
import R from 'ramda';
import Touchable from 'component/uikit/touchable';
import ViewShot from 'react-native-view-shot';
import Icon from 'react-native-vector-icons/Ionicons';
import * as WeChat from 'react-native-wechat';
import moment from 'moment';
import Modal from 'react-native-modal';
import styles from './shareNewsStyle';

import Format from 'component/format';
import PercentageChangeItem from 'component/hotnode_index/percentage_change_item';

const window = Dimensions.get('window');
export const DEVICE_WIDTH = window.width;

@connect(({ hotnode_index }) => ({
  global: R.pathOr({}, ['overall', 'global'])(hotnode_index),
}))
class ShareNews extends Component {
  state = {
    loading: {},
    isWXAppSupportApi: false,
    isWXAppInstalled: false,
  };

  componentWillMount() {
    this.checkWechatAval();
  }

  checkWechatAval = async () => {
    this.setState({
      isWXAppSupportApi: await WeChat.isWXAppSupportApi(),
      isWXAppInstalled: await WeChat.isWXAppInstalled(),
    });
  };

  shareTo = type => async () => {
    this.setState({
      loading: {
        ...this.state.loading,
        [type]: true,
      },
    });
    try {
      const uri = await this.viewShot.capture();
      const request = {
        type: 'imageFile',
        imageUrl: `file://${uri}`,
      };

      if (!this.state.isWXAppSupportApi || !this.state.isWXAppInstalled) {
        alert('您的设备暂不支持分享至微信');
        return;
      }

      if (type === 'wechat') {
        WeChat.shareToSession(request);
      } else {
        WeChat.shareToTimeline(request);
      }
    } catch (e) {
      console.log(e);
    }
  };
  renderAction() {
    return (
      <Flex justify="space-between" style={styles.actionsBar}>
        <Touchable borderless onPress={this.props.onClose}>
          <Flex align="center">
            <Icon
              name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
              style={styles.backButton}
              color="#a1a1a1"
            />
            <Text style={styles.backText}>返回</Text>
          </Flex>
        </Touchable>
        <Flex>
          <TouchableOpacity onPress={this.shareTo('wechat')}>
            <Image source={require('asset/wechat_icon.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 24 }}
            onPress={this.shareTo('moment')}
          >
            <Image source={require('asset/wechat_moment_icon.png')} />
          </TouchableOpacity>
        </Flex>
      </Flex>
    );
  }

  render() {
    const { news, global } = this.props;

    if (!news) {
      return null;
    }
    const regex = R.pipe(
      R.path(['content']),
      R.match(/【(.*)】(.*)/),
    )(news);

    const title = R.pathOr('', [1])(regex);
    const content = R.pathOr('', [2])(regex);
    const created_at = R.path(['created_at'])(news);
    const heat = R.pathOr('--', ['heat'])(global);
    const heat_change_percentage = R.pathOr(0, ['heat_change_percentage'])(
      global,
    );

    return (
      <Modal
        useNativeDriver
        hideModalContentWhileAnimating
        isVisible={this.props.visible}
        style={{
          margin: 0,
        }}
      >
        <ScrollView
          style={{
            width: '100%',
            height: window.height - 60,
            backgroundColor: 'white',
          }}
        >
          <ViewShot
            options={{ format: 'jpg', quality: 0.9 }}
            ref={ref => {
              this.viewShot = ref;
            }}
          >
            <Image
              source={require('asset/share/news_share_background.jpg')}
              style={styles.banner}
            />
            <View style={{ flex: 1, backgroundColor: 'white' }}>
              <View style={styles.content}>
                <Flex style={styles.top}>
                  <Image
                    source={require('asset/share/clock.png')}
                    style={styles.clock}
                  />
                  <Text style={styles.date}>
                    {created_at
                      ? moment(created_at * 1000).format('YYYY-MM-DD HH:mm')
                      : ''}
                  </Text>
                </Flex>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.newsContent}>{content}</Text>
                <Flex style={styles.tip} justify="space-between">
                  <Flex align="center">
                    <Image
                      source={require('asset/public_project/index_icon.png')}
                    />
                    <Text style={styles.index.title}>Hotnode 全网项目指数</Text>
                  </Flex>
                  <Flex align="center">
                    <Text style={styles.index.text}>
                      <Format digit={0}>{heat}</Format>
                    </Text>
                    <PercentageChangeItem
                      style={{ marginLeft: 4 }}
                      percentage_change={heat_change_percentage}
                    />
                  </Flex>
                </Flex>
              </View>
              <Image
                source={require('asset/share/footer.png')}
                style={styles.footer}
              />
            </View>
          </ViewShot>
        </ScrollView>
        {this.renderAction()}
      </Modal>
    );
  }
}
ShareNews.propTypes = {};
ShareNews.defaultProps = {};

export default ShareNews;
