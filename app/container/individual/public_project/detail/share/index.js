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
  CameraRoll,
} from 'react-native';
import { Flex, Toast } from 'antd-mobile';
import R from 'ramda';
import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';
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

      if (type === 'save') {
        CameraRoll.saveToCameraRoll(`file://${uri}`);
        this.props.onClose();
        Toast.success('图片保存成功！');
        return;
      }

      if (!this.state.isWXAppSupportApi || !this.state.isWXAppInstalled) {
        alert('您的设备暂不支持分享至微信');
      }

      if (type === 'wechat') {
        WeChat.shareToSession(request);
      } else if (type === 'moment') {
        WeChat.shareToTimeline(request);
      }
    } catch (e) {
      console.log(e);
    }
  };
  renderHeader() {
    const { coin } = this.props;
    const siteUrl = R.pathOr('', ['homepage'])(coin);
    const regions = R.pipe(
      R.pathOr([], ['regions']),
      R.map(r => r.name),
    )(coin);
    const tags = R.pipe(
      R.pathOr([], ['tags']),
      R.take(2),
      R.reduce(
        (last, current) => `${last === '' ? '' : `${last}/`}${current.name}`,
        '',
      ),
    )(coin);
    return (
      <View>
        <Flex justify="between">
          <Flex direction="column" align="start">
            <View style={{ flex: 0 }}>
              <ImageBackground
                style={{
                  width: '100%',
                  height: isIOS ? 20 : 23,
                  position: 'relative',
                }}
                source={require('asset/coin_share/title_back.png')}
                {...(isIOS
                  ? {
                      resizeMode: 'repeat',
                    }
                  : {})}
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
              <Text
                numberOfLines={1}
                style={[styles.symbol, { marginLeft: 10 }]}
              >
                {tags}
              </Text>
            </Flex>
          </Flex>
          <View>
            <Avatar source={{ uri: coin.icon }} size={60} />
          </View>
        </Flex>
        <Flex>
          {!!siteUrl && (
            <Text style={[styles.symbol, styles.siteUrl, { marginRight: 10 }]}>
              {siteUrl}
            </Text>
          )}
          {!R.isEmpty(regions) && (
            <Text
              numberOfLines={1}
              style={[styles.symbol, styles.siteUrl, { marginLeft: 5 }]}
            >
              {R.join('，')(regions)}
            </Text>
          )}
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
          <TouchableOpacity onPress={this.shareTo('save')}>
            <Image style={{ width: 25, height: 25, marginRight: 24 }} source={require('asset/save_picture.png')} />
          </TouchableOpacity>
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
              {...(isIOS
                ? {
                    resizeMode: 'repeat',
                  }
                : {})}
            >
              <View>
                <Image
                  source={require('asset/coin_share/wave_top.png')}
                  style={[
                    styles.backgroundImage,
                    { height: 165, top: 0, left: 0 },
                    styles.wave,
                  ]}
                />
                <Image
                  source={require('asset/coin_share/wave_bottom.png')}
                  style={[
                    styles.backgroundImage,
                    { height: 182, bottom: 0, left: 0 },
                    styles.wave,
                  ]}
                />
                {comment ? (
                  <CommentContent comment={comment} />
                ) : (
                  <Image
                    source={require('asset/coin_share/share_header.png')}
                    style={[
                      styles.backgroundImage,
                      {
                        width: 314,
                        height: 68,
                        zIndex: 20,
                        marginTop: 35,
                        marginBottom: 30,
                        alignSelf: 'center',
                      },
                    ]}
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
                    {...(isIOS
                      ? {
                          resizeMode: 'repeat',
                        }
                      : {})}
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
                    {...(isIOS
                      ? {
                          resizeMode: 'repeat',
                        }
                      : {})}
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
                    style={[
                      styles.backgroundImage,
                      { height: 28, marginTop: 0 },
                    ]}
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
