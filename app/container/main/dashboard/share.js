import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  CameraRoll,
  Platform,
  ImageBackground,
  PermissionsAndroid,
} from 'react-native';
import { Flex } from 'antd-mobile';
import * as R from 'ramda';
import { connect } from 'react-redux';
import ViewShot from 'react-native-view-shot';
import * as WeChat from 'react-native-wechat';
import Touchable from 'component/uikit/touchable';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfitSwiper from './sharePartials/profitSwiper';
import DashboardGroup from './sharePartials/group';
import InvestNumber from './sharePartials/investNumber';
import ProjectItem from './sharePartials/projectItem';
import Investment from './sharePartials/investment';
import styles from './share.style';

@connect(({ dashboard, fund, loading }) => ({
  dashboard: dashboard.data,
  funds: fund.funds.data,
  fundsError: fund.error,
  loading: loading.effects['dashboard/fetch'],
}))
export default class ShareModal extends Component {
  state = {
    currentFund: this.props.fund,
    loading: {
      wechat: false,
      timeline: false,
    },
    isWXAppSupportApi: false,
    isWXAppInstalled: false,
  };

  async componentWillMount() {
    const { currentFund } = this.state;
    this.getDashboardData(currentFund.id);

    // check wechat availability
    this.setState({
      isWXAppSupportApi: await WeChat.isWXAppSupportApi(),
      isWXAppInstalled: await WeChat.isWXAppInstalled(),
    });
  }

  getDashboardData = id => {
    this.props.dispatch({
      type: 'dashboard/fetch',
      payload: id,
      callback: () => {
        this.setState({
          currentFund: R.find(R.propEq('id', id))(this.props.funds),
        });
      },
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

      if (type === 'wechat') {
        WeChat.shareToSession(request);
      } else {
        WeChat.shareToTimeline(request);
      }
    } catch (e) {
      console.log(e);
    }
  };

  saveToCameraRoll = async () => {
    this.setState({
      loading: {
        ...this.state.loading,
        camera: true,
      },
    });
    try {
      const uri = await this.viewShot.capture();
      if (Platform.OS === 'android') {
        const isGranted = await this.requestExternalStoragePermission();
        if (!isGranted) {
          this.setState({
            loading: {
              ...this.state.loading,
              camera: false,
            },
          });
          return;
        }
      }
      await CameraRoll.saveToCameraRoll(uri, 'photo');
      this.props.onClose();
      this.setState({
        loading: {
          ...this.state.loading,
          camera: false,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  requestExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Hotnode Storage Permission',
          message: 'Hotnode needs access to your storage',
        },
      );
      return granted;
    } catch (err) {
      console.error('Failed to request permission ', err);
      return null;
    }
  };

  renderBackground = () => (
    <Image
      style={styles.background}
      source={require('asset/dashboard_bg.png')}
    />
  );

  renderForeground = () => (
    <View style={styles.foreground}>
      <View style={styles.wrapper}>
        <Text style={styles.label}>投资回报率</Text>
        <Text style={[styles.title]}>
          <Text>{R.path(['ROI', 'ETH'])(this.props.dashboard)}</Text>
          % <Text style={{ fontSize: 13 }}>ETH</Text>
        </Text>
      </View>
    </View>
  );

  render() {
    const { dashboard } = this.props;
    const roiRankCount = R.length(R.path(['ROIRank'])(dashboard));

    const { isWXAppSupportApi, isWXAppInstalled } = this.state;
    const wechatAvailable = isWXAppSupportApi && isWXAppInstalled;
    return (
      <View style={[styles.container]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
        >
          <ViewShot
            ref={ref => {
              this.viewShot = ref;
            }}
          >
            <ImageBackground
              resizeMode="contain"
              style={styles.shareBackground}
              source={require('asset/share_background.png')}
            >
              <View style={styles.content}>
                <View style={styles.parallax}>
                  {this.renderBackground()}
                  {this.renderForeground()}
                  <View style={styles.fundName}>
                    <Text style={styles.fundNameText}>
                      {R.path(['currentFund', 'name'])(this.state)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingTop: 50,
                    backgroundColor: 'white',
                    paddingBottom: 20,
                  }}
                >
                  {roiRankCount > 0 && (
                    <DashboardGroup
                      style={styles.dashboardGroup}
                      title="投资回报率榜"
                      icon="TOP"
                    >
                      {dashboard.ROIRank.map((r, i) => (
                        <ProjectItem key={i} index={i} data={r} />
                      ))}
                    </DashboardGroup>
                  )}
                  <DashboardGroup
                    style={styles.dashboardGroup}
                    title="投资概况"
                    icon="yitouxiangmu"
                  >
                    <InvestNumber data={dashboard.portfolio} />
                  </DashboardGroup>
                  <DashboardGroup
                    style={styles.dashboardGroup}
                    title="投资金额"
                    icon="touzijine"
                  >
                    <Investment data={dashboard.investment} />
                  </DashboardGroup>
                </View>
                <ProfitSwiper
                  autoplay={false}
                  style={styles.swiper}
                  total={R.pick(['ETH'])(
                    R.path(['totalProfits', 'count'])(dashboard),
                  )}
                  daily={R.pick(['ETH'])(
                    R.path(['dailyProfits', 'count'])(dashboard),
                  )}
                  weekly={R.pick(['ETH'])(
                    R.path(['weeklyProfits', 'count'])(dashboard),
                  )}
                />
              </View>
              <View style={styles.qrCode.container}>
                <Image source={require('../../../asset/qr_welcome.png')} />
                <Text style={styles.qrCode.title}>扫码入驻 Hotnode</Text>
                <Text style={styles.qrCode.subtitle}>
                  做最专业的 Token Fund
                </Text>
              </View>
            </ImageBackground>
          </ViewShot>
        </ScrollView>
        <Flex justify="space-between" style={styles.actionsBar}>
          <Touchable borderless onPress={this.props.onClose}>
            <Icon
              name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
              style={styles.backButton}
              color="#a1a1a1"
            />
          </Touchable>
          <Flex>
            {/* <TouchableOpacity
              disabled={this.props.loading.camera}
              onPress={this.saveToCameraRoll}
            >
              <Text
                style={[
                  styles.saveToCameraRoll,
                  this.state.loading.camera && styles.saveToCameraRollDisabled,
                ]}
              >
                {this.state.loading.camera ? '保存中...' : '保存图片至相册'}
              </Text>
            </TouchableOpacity> */}
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
          </Flex>
        </Flex>
      </View>
    );
  }
}
