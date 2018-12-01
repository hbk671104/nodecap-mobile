import React, { Component } from 'react';
import { View, LayoutAnimation, TouchableWithoutFeedback, TouchableOpacity, Image, Text, Clipboard } from 'react-native';
import { Flex, Toast } from 'antd-mobile';
import * as Animatable from 'react-native-animatable';
import { withState } from 'recompose';
import R from 'ramda';
import * as WeChat from 'react-native-wechat';
import styles, { translateY } from './style';

@withState('_collapsed', '_setCollapsed', true)
@withState('showSharePictureModal', 'toggleSharePictureModal', false)
export default function ShareModalDecorator(ComponentClass) {
  return class shareModal extends Component {
    state = {
      loading: {},
      isWXAppSupportApi: false,
      isWXAppInstalled: false,
      coin: null,
    }

    componentWillMount() {
      this.checkWechatAval();
    }

    defaultTypes = {
      session: {
        icon: require('asset/wechat_icon.png'),
        name: '微信',
        shareType: 'news',
        handler: ({ webpageUrl, title, description, thumbImage }) => {
          if (!this.state.isWXAppSupportApi) {
            Toast.show('您的手机暂不支持微信分享', Toast.SHORT);
            this.props._setCollapsed(false);
            this.toggleCollapsed();
            return;
          }
          return WeChat.shareToSession({
            type: 'news',
            webpageUrl,
            title,
            description,
            thumbImage,
          }).finally(() => {
            this.props._setCollapsed(false);
            this.toggleCollapsed();
          });
        },
      },
      timeline: {
        icon: require('asset/wechat_moment_icon.png'),
        name: '朋友圈',
        shareType: 'news',
        handler: ({ webpageUrl, title, description, thumbImage }) => {
          if (!this.state.isWXAppSupportApi) {
            Toast.show('您的手机暂不支持微信分享', Toast.SHORT);
            this.props._setCollapsed(false);
            this.toggleCollapsed();
            return;
          }
          return WeChat.shareToTimeline({
            type: 'news',
            webpageUrl,
            title,
            description,
            thumbImage,
          }).finally(() => {
            this.props._setCollapsed(false);
            this.toggleCollapsed();
          });
        },
      },
      picture: {
        icon: require('asset/share_picture_icon.png'),
        name: '分享图片',
        handler: () => {
          this.props.toggleSharePictureModal(true);
          this.props._setCollapsed(false);
          this.toggleCollapsed();
        },
      },
      link: {
        icon: require('asset/share_link_icon.png'),
        name: '复制链接',
        handler: ({ url }) => {
          Clipboard.setString(url);
          Toast.show('链接复制成功', Toast.SHORT);
          this.props._setCollapsed(false);
          this.toggleCollapsed();
        },
      },
    }

    toggleCollapsed = () => {
      const { _collapsed } = this.props;
      LayoutAnimation.easeInEaseOut();
      this.props._setCollapsed(!_collapsed, () => {
        if (!_collapsed && this.onClose) {
          this.onClose();
        }
        this.footer.transitionTo(
          {
            transform: [
              {
                translateY: _collapsed ? 0 : translateY,
              },
            ],
          },
          250,
          'ease-in-out',
        );
        this.wrapper.transitionTo(
          {
            opacity: _collapsed ? 0.4 : 0,
          },
          250,
          'ease-in-out',
        );
      });
    }

    checkWechatAval = async () => {
      this.setState({
        isWXAppSupportApi: await WeChat.isWXAppSupportApi(),
        isWXAppInstalled: await WeChat.isWXAppInstalled(),
      });
    }

    types = []
    openShareModal = ({ types = [], onOpen, onClose }) => {
      this.types = R.map(i => R.merge(this.defaultTypes[i.type], i))(types);
      this.toggleCollapsed();
      if (onOpen) {
        onOpen();
      }

      this.onClose = onClose;
    }

    renderShareItem = (type) => {
      return (
        <TouchableOpacity
          key={type.name}
          activeOpacity={0.8}
          onPress={() =>
            type.handler(
              R.omit(['icon',
              'name',
              'shareType',
              'handler'])(type)
            )
          }
        >
          <View style={styles.shareItem}>
            <View style={styles.shareItemImageWrapper}>
              <Image source={type.icon} />
            </View>
            <Text style={styles.shareItemText}>{type.name}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    renderRecommended = () => {
      return (
        <Animatable.View
          ref={ref => {
            this.footer = ref;
          }}
          style={styles.recommended.container}
        >
          <View>
            <Flex style={[styles.buttons, styles.buttonsSpecific[this.types.length - 1]]}>
              {this.types.map(this.renderShareItem)}
            </Flex>
            <TouchableWithoutFeedback onPress={() => {
              this.props._setCollapsed(false);
              this.toggleCollapsed();
            }}
            >
              <View style={styles.cancel}>
                <Text>取消</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Animatable.View>
      );
    };

    renderWrapper = () => {
      const { _collapsed } = this.props;
      return (
        <Animatable.View
          pointerEvents={_collapsed ? 'none' : 'auto'}
          onStartShouldSetResponder={() => this.toggleCollapsed()}
          ref={ref => {
            this.wrapper = ref;
          }}
          style={styles.recommended.wrapper}
        />
      );
    };

    render() {
      return (
        <View style={{ flex: 1 }}>
          <ComponentClass
            {...this.props}
            openShareModal={this.openShareModal}
          />
          {this.renderWrapper()}
          {this.renderRecommended()}
        </View>
      );
    }
  };
}
