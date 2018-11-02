import React, { Component } from 'react';
import { ScrollView, View, Image, Text } from 'react-native';
import NavBar, { realBarHeight } from 'component/navBar';
import { Flex } from 'antd-mobile';
import SafeArea from 'component/uikit/safeArea';
import LargeCoinItem from 'component/favored/large';
import Touchable from 'component/uikit/touchable';
import * as WeChat from 'react-native-wechat';
import Config from 'runtime/index';
import R from 'ramda';

class InviteComment extends Component {
  state = {
    loading: {},
    isWXAppSupportApi: false,
    isWXAppInstalled: false,
  }

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
    const item = this.props.navigation.getParam('item');
    try {
      const request = {
        type: 'news',
        webpageUrl: `${Config.MOBILE_SITE}/coin/${item.id}/invite-comment`,
        title: `${item.name}`,
        description: '来 Hotnode, 发现全网项目！',
        thumbImage: item.icon || 'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/big_logo%403x.png',
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

  render() {
    const data = this.props.navigation.getParam('item');
    return (
      <SafeArea style={{ flex: 1, backgroundColor: 'white' }}>
        <NavBar
          back
          gradient
          title="邀请打电话"
        />
        <ScrollView>
          <View style={{
            position: 'relative',
            marginHorizontal: 20,
            marginVertical: 31,
          }}
          >
            <LargeCoinItem data={data} />
            <View style={{
              position: 'absolute',
              right: -4,
              top: -10,
              zIndex: 10,
              width: 109,
              height: 30,
            }}
            >
              <Image
                style={{
                  width: 109,
                  height: 34.5,
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  zIndex: 10,
                }}
                source={require('asset/project/inviteComment/comment_count_background.png')}
              />
              <Text
                style={{
                  zIndex: 20,
                  textAlign: 'center',
                  color: 'white',
                  height: 30,
                  lineHeight: 30,
                  paddingLeft: 5,
                  fontSize: 14,
                }}
              >已获得 {R.pathOr(0, ['comments_count'])(data)} 点评
              </Text>
            </View>
          </View>
          <Flex justify="center" style={{ marginTop: 50 }}>
            <Image style={{ width: 340, height: 239, resizeMode: 'contain' }} source={require('asset/project/inviteComment/description.jpg')} />
          </Flex>
          <Flex justify="center" align="center" style={{ marginTop: 24 }}>
            <Touchable
              onPress={this.shareTo('wechat')}
              style={{ marginRight: 64 }}
            >
              <Image source={require('asset/wechat_icon.png')} />
            </Touchable>
            <Touchable
              onPress={this.shareTo('moment')}
            >
              <Image source={require('asset/wechat_moment_icon.png')} />
            </Touchable>
          </Flex>
        </ScrollView>
      </SafeArea>
    );
  }
}

InviteComment.propTypes = {};
InviteComment.defaultProps = {};

export default InviteComment;
