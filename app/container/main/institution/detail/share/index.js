import React, { Component } from 'react';
import { CameraRoll, Image, ImageBackground, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ViewShot from 'react-native-view-shot';
import Modal from 'react-native-modal';
import Actions from './actions';
import * as WeChat from 'react-native-wechat';
import { Toast } from 'antd-mobile';
import Top from './top';
import Content from './content';

class InstitutionShare extends Component {
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
  render() {
    return (
      <View>
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
              options={{ format: 'jpg', quality: 1 }}
              ref={ref => {
                this.viewShot = ref;
              }}
              snapshotContentContainer
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  backgroundColor: '#F5F5F5',
                  padding: 17,
                }}
              >
                <Top data={this.props.data} industryType={this.props.industryType} />
                <Content data={this.props.data} ratingTypes={this.props.ratingTypes} />
              </View>
            </ViewShot>
          </ScrollView>
          <Actions
            shareTo={this.shareTo}
            onClose={this.props.onClose}
          />
        </Modal>
      </View>
    );
  }
}

InstitutionShare.propTypes = {};
InstitutionShare.defaultProps = {};

export default InstitutionShare;
