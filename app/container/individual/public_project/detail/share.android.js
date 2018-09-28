import React, { Component } from 'react';
import { Dimensions, ScrollView, View, ImageBackground, Image, Text, TouchableOpacity, Platform } from 'react-native';
import { Flex } from 'antd-mobile';
import R from 'ramda';
import Touchable from 'component/uikit/touchable';
import Avatar from 'component/avatar';
import Modal from 'react-native-modal';
import * as WeChat from 'react-native-wechat';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import ViewShot from 'react-native-view-shot';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { borderColor } from 'component/uikit/color';
import Accounting from 'accounting';

const window = Dimensions.get('window');

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
  renderAd() {
    return (
      <Flex style={styles.ad.container} justify="between">
        <View>
          <Image style={styles.ad.logo} source={require('asset/logo_horizontal.png')} />
          <Text style={styles.ad.text}>找项目，上 Hotnode</Text>
        </View>
        <View>
          <Image style={styles.ad.qr} source={require('asset/coin_share/qr_code.png')} />
        </View>
      </Flex>
    );
  }
  renderContent() {
    const { coin } = this.props;
    const siteUrl = R.pathOr('', ['homepage'])(coin);
    const invest_score = R.pathOr('', ['rating', 0, 'invest_score'])(coin);
    const risk_score = R.pathOr('', ['rating', 0, 'risk_score'])(coin);

    const info = R.pathOr({}, ['finance_info'])(coin);
    const start_at = R.pathOr(null, ['start_at'])(info);
    const end_at = R.pathOr(null, ['end_at'])(info);
    const token_supply = R.pathOr('--', ['token_supply'])(info);
    const conversion_ratio = R.pathOr('--', ['conversion_ratio'])(info);
    const industryInvestments = R.pathOr([], ['industry_investments'])(info);
    const renderTitle = (title) => (
      <Flex>
        <View style={styles.dot} />
        <Text style={styles.contentTitle}>{title}</Text>
      </Flex>
    );
    return (
      <View style={{ marginTop: 10 }}>
        <View style={styles.group}>
          {renderTitle('官网')}
          <Text style={[styles.groupContent, styles.groupContentText]}>{siteUrl || '无'}</Text>
        </View>
        <View style={styles.group}>
          {renderTitle('评级信息')}
          <Flex style={styles.groupContent}>
            <Flex align="center">
              <Text style={styles.groupContentText}>风险评估</Text>
              <Text style={styles.highLight}>{risk_score || '无'}</Text>
            </Flex>
            <Flex align="center" style={{ marginLeft: 46 }}>
              <Text style={styles.groupContentText}>投资评分</Text>
              <Text style={styles.highLight}>{invest_score || '无'}</Text>
            </Flex>
          </Flex>
        </View>
        <View style={styles.group}>
          {renderTitle('募集信息')}
          <Flex style={styles.groupContent} align="center">
            <Text style={styles.groupContentText}>开始时间</Text>
            <Text style={[styles.groupContentText, { marginLeft: 10, color: 'rgba(0,0,0,.85)' }]}>{start_at ? moment.unix(start_at).format('YYYY.MM.DD') : '无'}</Text>
          </Flex>
          <Flex style={styles.groupContent} align="center">
            <Text style={styles.groupContentText}>结束时间</Text>
            <Text style={[styles.groupContentText, { marginLeft: 10, color: 'rgba(0,0,0,.85)' }]}>{end_at ? moment.unix(end_at).format('YYYY.MM.DD') : '无'}</Text>
          </Flex>
          <Flex style={styles.groupContent} align="center">
            <Text style={styles.groupContentText}>发售总量</Text>
            <Text style={[styles.groupContentText, { marginLeft: 10, color: 'rgba(0,0,0,.85)' }]}>{token_supply ? Accounting.formatNumber(token_supply) : '无'}</Text>
          </Flex>
          <Flex style={styles.groupContent} align="center">
            <Text style={styles.groupContentText}>发售总量</Text>
            <Text style={[styles.groupContentText, { marginLeft: 10, color: 'rgba(0,0,0,.85)' }]}>{conversion_ratio || '无'}</Text>
          </Flex>
        </View>
        <View style={styles.group}>
          {renderTitle('投资机构')}
          <Flex style={styles.groupContent} align="center">
            {industryInvestments.length ? (industryInvestments.map((i, idx) => (
              <Flex align="center">
                <Text style={{ color: 'rgba(0,0,0,.85)' }}>{i.name}</Text>
                {idx !== (industryInvestments.length - 1) && <View style={styles.orgDivision} />}
              </Flex>
          ))) : <Text style={styles.groupContentText}>暂无</Text>}
          </Flex>
        </View>
      </View>
    );
  }
  renderHeader() {
    const { coin } = this.props;
    return (
      <View>
        <Flex justify="between">
          <View>
            <ImageBackground
              style={{ width: '100%', height: 30 }}
              source={require('asset/coin_share/title_back.png')}
              imageStyle={{
                resizeMode: 'stretch',
              }}
            >
              <Text numberOfLines={1} style={styles.title}>
                {coin.name}
              </Text>
            </ImageBackground>
            <Text numberOfLines={1} style={styles.symbol}>{coin.symbol ? coin.symbol.toUpperCase() : '--'}</Text>
          </View>
          <View>
            <Avatar url={coin.icon} />
          </View>
        </Flex>
        <Text numberOfLines={4} style={styles.desc}>{coin.description}</Text>
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
    const { coin } = this.props;
    return (
      <Modal
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
              style={{ width: '100%', height: window.height }}
              source={require('asset/project/detail/share_background.jpg')}
              resizeMode="cover"
            >
              <View style={[styles.container]}>
                <Image
                  source={require('asset/coin_share/header.png')}
                  style={[styles.backgroundImage, { height: 28 }]}
                />
                <ImageBackground
                  style={{ width: 350 }}
                  source={require('asset/coin_share/back.png')}
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
                  imageStyle={{
                    resizeMode: 'stretch',
                  }}
                >
                  <View style={{ paddingHorizontal: 28 }}>
                    {this.renderContent()}
                    {this.renderAd()}
                  </View>
                </ImageBackground>
                <Image
                  source={require('asset/coin_share/footer.png')}
                  style={[styles.backgroundImage, { height: 28 }]}
                />
              </View>
            </ImageBackground>
          </ViewShot>
        </ScrollView>
        {this.renderAction()}
      </Modal>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: window.height,
  },
  backgroundImage: {
    width: 350,
    resizeMode: 'cover',
  },
  title: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 20,
    color: '#000000',
    paddingHorizontal: 5,
    lineHeight: 22,
  },
  symbol: { fontFamily: 'PingFangSC-Medium', fontSize: 12, color: 'rgba(0,0,0,0.65)', marginLeft: 5, marginTop: 10 },
  actionsBar: {
    ...ifIphoneX(
      {
        paddingBottom: 22,
      },
      {}
    ),
    height: 60,
    backgroundColor: 'white',
    width: DEVICE_WIDTH,
    borderTopWidth: 0.5,
    borderTopColor: borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backButton: {
    fontSize: 20,
    color: 'rgba(0,0,0,.65)',
  },
  backText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: 'rgba(0,0,0,0.65)',
    letterSpacing: 0,
    marginLeft: 10,
  },
  shareButtonItem: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 30,
  },
  desc: { fontFamily: 'PingFangSC-Regular', fontSize: 11, color: 'rgba(0,0,0,0.45)', marginTop: 14, marginLeft: 5 },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: '#0090FF',
    borderRadius: 2.5,
    marginRight: 5,
  },
  contentTitle: { fontFamily: 'PingFangSC-Medium', fontSize: 14, color: 'rgba(0,0,0,0.85)' },
  group: {
    marginBottom: 17,
  },
  groupContent: {
    marginLeft: 10,
    marginTop: 8,
  },
  groupContentText: { fontFamily: 'PingFangSC-Regular', fontSize: 13, color: 'rgba(0,0,0,0.65)' },
  highLight: { fontFamily: 'PingFangSC-Medium', fontSize: 13, color: '#0090FF', marginLeft: 17 },
  orgDivision: {
    height: 15,
    width: 1,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(0,0,0,.25)',
    marginHorizontal: 5,
  },
  ad: {
    container: {
      marginTop: 0,
      paddingTop: 10,
      paddingHorizontal: 10,
      borderTopWidth: 1,
      borderTopColor: '#E9E9E9',
    },
    logo: {
      width: 95,
      height: 14.5,
    },
    text: { fontFamily: 'PingFangSC-Regular', fontSize: 13, color: 'rgba(0,0,0,0.45)', marginTop: 10 },
    qr: {
      width: 60,
      height: 60,
    },
  },
};
export default ShareCoin;
