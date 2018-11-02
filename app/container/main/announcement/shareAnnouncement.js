import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Flex } from 'antd-mobile';
import R from 'ramda';
import Touchable from 'component/uikit/touchable';
import ViewShot from 'react-native-view-shot';
import Icon from 'react-native-vector-icons/Ionicons';
import * as WeChat from 'react-native-wechat';
import moment from 'moment';
import Modal from 'react-native-modal';
import styles from './shareAnnouncementStyle';
import { getCoinInfo } from 'services/api';
import SimpleCoinItem from 'component/favored/simple';

const window = Dimensions.get('window');
export const DEVICE_WIDTH = window.width;

class ShareAnnouncement extends Component {
  state = {
    loading: {},
    isWXAppSupportApi: false,
    isWXAppInstalled: false,
    coin: null,
  }

  componentWillMount() {
    this.checkWechatAval();
  }

  async componentWillReceiveProps(nextProps) {
    const getCoinID = R.path(['news', 'coin_id']);
    if (getCoinID(nextProps) && (getCoinID(nextProps) !== getCoinID(this.props))) {
      const { data } = await getCoinInfo(R.path(['news', 'coin_id'])(nextProps));
      this.setState({
        coin: data,
      });
    }
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
    const { title, subtitle, push_at, source, coin_id } = this.props.news;
    const coin = this.state.coin;
    if (!this.props.news) {
      return null;
    }

    return (
      <Modal
        useNativeDriver
        hideModalContentWhileAnimating
        isVisible={this.props.visible}
        style={{
          margin: 0,
        }}
      >
        <ScrollView style={{ width: '100%', height: window.height - 60, backgroundColor: 'white' }}>
          <ViewShot
            options={{ format: 'jpg', quality: 0.9 }}
            ref={ref => {
              this.viewShot = ref;
            }}
          >
            <Image
              source={require('asset/share/announcement_background.jpg')}
              style={styles.banner}
            />
            <View style={{ flex: 1, backgroundColor: 'white' }}>
              <View style={styles.content}>
                <Flex style={styles.top} justify="between" align="center">
                  <Flex>
                    <Image
                      source={require('asset/share/clock.png')}
                      style={styles.clock}
                    />
                    <Text style={styles.date}>{push_at ? moment(push_at * 1000).format('YYYY-MM-DD HH:mm') : ''}</Text>
                  </Flex>
                  <Text style={{ fontSize: 13, color: 'rgba(0,0,0,0.85)', letterSpacing: 0.15 }}>{source}</Text>
                </Flex>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.newsContent}>{subtitle}</Text>
                {coin ? (
                  <View style={{ marginTop: 16 }}>
                    <SimpleCoinItem data={coin} />
                  </View>
                ) : null }
                <Flex style={[styles.tip, coin ? { marginTop: 17 } : {}]}>
                  <View style={styles.tipDot} />
                  <Text style={styles.tipText}>以上信息分享自 Hotnode APP</Text>
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

export default ShareAnnouncement;
