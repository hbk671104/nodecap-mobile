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
import Avatar from 'component/avatar';
import Modal from 'react-native-modal';
import * as WeChat from 'react-native-wechat';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import ViewShot from 'react-native-view-shot';
import ShareContent from './content';
import CommentContent from './comment';
import styles from './styles';

const window = Dimensions.get('window');
const isIOS = Platform === 'ios';
export const DEVICE_WIDTH = window.width;

class ShareCoin extends Component {
  state = {
    loading: {
      wechat: false,
      timeline: false,
    },
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

      if (type === 'wechat') {
        WeChat.shareToSession(request);
      } else {
        WeChat.shareToTimeline(request);
      }
    } catch (e) {
      console.log(e);
    }
  };
  renderHeader() {
    const { coin } = this.props;
    const siteUrl = R.pathOr('', ['homepage'])(coin);
    const country = R.pathOr('', ['base', 'country_origin'])(coin);
    const tags = R.pipe(
      R.pathOr([], ['tags']),
      R.reduce((last, current) => `${last === '' ? '' : `${last}/`}${current.name}`, ''),
    )(coin);
    return (
      <View>
        <Flex justify="between">
          <Flex direction="column" align="start">
            <View style={{ flex: 0 }}>
              <ImageBackground
                style={{ width: '100%', height: isIOS ? 20 : 23, position: 'relative' }}
                source={require('asset/coin_share/title_back.png')}
                {
                  ...isIOS ? {
                    resizeMode: 'repeat',
                  } : {}
                }
                imageStyle={{
                  resizeMode: 'stretch',
                  left: 0,
                  right: 0,
                  width: 'auto',
                }}
              >
                <Text numberOfLines={1} style={styles.title}>
                  {coin.name}
                </Text>
              </ImageBackground>
            </View>
            <Flex>
              <Text numberOfLines={1} style={styles.symbol}>
                {coin.symbol ? coin.symbol.toUpperCase() : '--'}
              </Text>
              <Text numberOfLines={1} style={[styles.symbol, { marginLeft: 10 }]}>
                {tags}
              </Text>
            </Flex>
          </Flex>
          <View>
            <Avatar url={coin.icon} />
          </View>
        </Flex>
        <Flex>
          <Text style={[styles.symbol, styles.siteUrl]}>
            {siteUrl}
          </Text>
          <Text numberOfLines={1} style={[styles.title, { marginLeft: 10 }]}>
            {country}
          </Text>
        </Flex>
      </View>
    );
  }
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
    const { comment } = this.props;
    console.log('comment', comment);
    return (
      <Modal
        useNativeDriver
        hideModalContentWhileAnimating
        isVisible={this.props.visible}
        style={{
          margin: 0,
        }}
      >
        <ScrollView style={{ width: '100%', height: window.height - 60 }}>
          <ViewShot
            options={{ format: 'jpg', quality: 0.9 }}
            ref={ref => {
              this.viewShot = ref;
            }}
          >
            <ImageBackground
              style={{ width: '100%' }}
              source={require('asset/coin_share/main_background.jpg')}
              {
                ...isIOS ? {
                  resizeMode: 'repeat',
                } : {}
              }
            >
              <View>
                <Image
                  source={require('asset/coin_share/wave_top.png')}
                  style={[styles.backgroundImage, { height: 165, top: 0, left: 0 }, styles.wave]}
                />
                <Image
                  source={require('asset/coin_share/wave_bottom.png')}
                  style={[styles.backgroundImage, { height: 182, bottom: 0, left: 0 }, styles.wave]}
                />
                {comment ? <CommentContent comment={comment} /> : (
                  <Image
                    source={require('asset/coin_share/share_header.png')}
                    style={[styles.backgroundImage, { width: 314, height: 68, zIndex: 20, marginTop: 35, marginBottom: 30, alignSelf: 'center' }]}
                  />
                )}
                <View style={[styles.container]}>
                  <Image
                    source={require('asset/coin_share/header.png')}
                    style={[styles.backgroundImage, { height: 28 }]}
                  />
                  <ImageBackground
                    style={{ width: 350 }}
                    source={require('asset/coin_share/back.png')}
                    {
                    ...isIOS ? {
                      resizeMode: 'repeat',
                    } : {}
                  }
                    imageStyle={{
                    resizeMode: 'stretch',
                  }}
                  >
                    <View style={{ paddingLeft: 23, paddingRight: 28 }}>
                      {this.renderHeader()}
                    </View>
                  </ImageBackground>
                  <Image
                    source={require('asset/coin_share/division.png')}
                    style={[styles.backgroundImage, { height: 28 }]}
                  />
                  <ImageBackground
                    style={{ width: 350 }}
                    source={require('asset/coin_share/back.png')}
                    {
                    ...isIOS ? {
                      resizeMode: 'repeat',
                    } : {}
                  }
                    imageStyle={{
                    resizeMode: 'stretch',
                  }}
                  >
                    <View style={{ paddingHorizontal: 28 }}>
                      <ShareContent {...this.props} />
                    </View>
                  </ImageBackground>
                  <Image
                    source={require('asset/coin_share/footer.png')}
                    style={[styles.backgroundImage, { height: 28 }]}
                  />
                </View>
              </View>
            </ImageBackground>
          </ViewShot>
        </ScrollView>
        {this.renderAction()}
      </Modal>
    );
  }
}

export default ShareCoin;
