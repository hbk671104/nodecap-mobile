import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  ScrollView,
  CameraRoll,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Svg, { Line } from 'react-native-svg';
import ViewShot from 'react-native-view-shot';
import * as WeChat from 'react-native-wechat';
import R from 'ramda';
import moment from 'moment';
import { Toast } from 'antd-mobile';

import NavBar from 'component/navBar';
import SafeAreaView from 'component/uikit/safeArea';
import Icon from 'component/uikit/icon';
import Touchable from 'component/uikit/touchable';
import Gradient from 'component/uikit/gradient';
import Format from 'component/format';
import ProjectItem from '../partials/projectItem';
import styles from './style';

class Share extends PureComponent {
  static propTypes = {
    fund: PropTypes.object.isRequired,
    dashboard: PropTypes.object.isRequired,
    company: PropTypes.object.isRequired,
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
    this.checkWechatAval();
  }

  checkWechatAval = async () => {
    this.setState({
      isWXAppSupportApi: await WeChat.isWXAppSupportApi(),
      isWXAppInstalled: await WeChat.isWXAppInstalled(),
    });
  };

  shareTo = type => async () => {
    try {
      const uri = await this.handleViewShot();
      if (uri) {
        const { dashboard } = this.props;
        const request = {
          type: 'imageFile',
          imageUrl: `file://${uri}`,
          title: dashboard.name,
        };

        if (type === 'wechat') {
          WeChat.shareToSession(request);
        } else {
          WeChat.shareToTimeline(request);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  saveToCameraRoll = async () => {
    try {
      const uri = await this.handleViewShot();
      if (uri) {
        const granted =
          Platform.OS === 'ios'
            ? true
            : await this.requestExternalStoragePermission();
        if (granted) {
          const result = await CameraRoll.saveToCameraRoll(uri);
          if (result) {
            Toast.success('照片存储成功！');
            this.props.onClose();
          }
        } else {
          Toast.fail('没有授予存储权限');
        }
      }
    } catch (error) {
      console.log(error);
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

  handleViewShot = async () => {
    const uri = await this.viewShot.capture();
    return uri;
  };

  renderActionBar = () => {
    const { onClose } = this.props;
    const { isWXAppSupportApi, isWXAppInstalled } = this.state;
    const wechatAvailable = isWXAppSupportApi && isWXAppInstalled;
    return (
      <View style={styles.actionBar.container}>
        <Touchable borderless onPress={onClose}>
          <Icon name="arrow-back" size={28} color="rgba(0, 0, 0, 0.65)" />
        </Touchable>
        <View style={styles.actionBar.content.container}>
          {wechatAvailable && (
            <Touchable borderless onPress={this.shareTo('wechat')}>
              <Image source={require('asset/wechat_icon.png')} />
            </Touchable>
          )}
          {wechatAvailable && (
            <Touchable
              borderless
              style={{ marginLeft: 24 }}
              onPress={this.shareTo('moment')}
            >
              <Image source={require('asset/wechat_moment_icon.png')} />
            </Touchable>
          )}
          <Touchable
            borderless
            style={{ marginLeft: 24 }}
            onPress={this.saveToCameraRoll}
          >
            <Image source={require('asset/save_icon.png')} />
          </Touchable>
        </View>
      </View>
    );
  };

  renderNavBarContent = () => (
    <View style={styles.navBar.content.container}>
      <Image source={require('asset/share/logo_banner.png')} />
    </View>
  );

  renderNavBarBottom = () => {
    const { fund, dashboard, company } = this.props;

    const roi = R.path(['ROI', 'CNY'])(dashboard);
    const portfolioCount = R.path(['portfolio', 'count'])(dashboard);

    return (
      <View>
        <View style={styles.navBar.bottom.container}>
          <View style={styles.navBar.bottom.org.container}>
            <Text style={styles.navBar.bottom.org.text}>{company.name}</Text>
          </View>
          <View style={styles.navBar.bottom.fund.container}>
            <Text style={styles.navBar.bottom.fund.text}>{fund.name}</Text>
          </View>
          <View style={styles.navBar.bottom.arrow.container}>
            <Icon override size={16} name="md-arrow-dropup" color="white" />
          </View>
          <View style={styles.navBar.bottom.date.container}>
            <Text style={styles.navBar.bottom.date.text}>
              统计日期：{moment().format('YYYY.MM.DD')}
            </Text>
          </View>
        </View>
        <Image
          style={styles.navBar.bottom.image}
          source={require('asset/share/share_background.png')}
        />
        <Gradient
          style={styles.navBar.bar.container}
          colors={['#25A7FF', '#1A94FF']}
        >
          <View style={styles.navBar.bar.group}>
            <Text style={styles.navBar.bar.title}>本期投资回报率</Text>
            <Text style={styles.navBar.bar.content}>
              <Format>{roi}</Format>
              <Text style={{ fontSize: 17 }}>%</Text>
            </Text>
          </View>
          <View style={styles.navBar.bar.group}>
            <Text style={styles.navBar.bar.title}>本期投资项目数量</Text>
            <Text style={styles.navBar.bar.content}>
              <Format digit={0}>{portfolioCount}</Format>
            </Text>
          </View>
        </Gradient>
      </View>
    );
  };

  renderROI = () => {
    const { dashboard } = this.props;

    const roiRank = R.pathOr([], ['ROIRank'])(dashboard);

    if (R.isEmpty(roiRank)) {
      return null;
    }
    return (
      <View style={styles.roi.container}>
        <View style={styles.roi.top.container}>
          <View style={styles.roi.top.wrapper}>
            <Image source={require('asset/share/left_image.png')} />
            <Text style={styles.roi.top.title}>
              {'  '}项目回报榜 TOP 5{'  '}
            </Text>
            <Image source={require('asset/share/right_image.png')} />
          </View>
        </View>
        {R.slice(0, 5)(roiRank).map((r, i) => (
          <ProjectItem
            style={styles.roi.item.container}
            contentContainerStyle={styles.roi.item.contentContainer}
            titleStyle={styles.roi.item.title}
            subtitleStyle={styles.roi.item.subtitle}
            rankingStyle={styles.roi.item.ranking}
            avatarProps={{ size: 40, innerRatio: 0.8, resizeMode: 'cover' }}
            key={i}
            index={i}
            data={r}
          />
        ))}
      </View>
    );
  };

  renderPropaganda = () => (
    <View style={styles.propaganda.container}>
      <View style={styles.propaganda.left.container}>
        <Image source={require('asset/share/logo_propaganda.png')} />
        <Text style={styles.propaganda.left.title}>
          Help Token Fund to be smarter
        </Text>
      </View>
      <View style={styles.propaganda.image.container}>
        <Image source={require('asset/share/qrcode.png')} />
      </View>
    </View>
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scroll.container}>
          <ViewShot
            ref={ref => {
              this.viewShot = ref;
            }}
          >
            <NavBar
              gradient
              renderContent={this.renderNavBarContent}
              renderBottom={this.renderNavBarBottom}
            />
            {this.renderROI()}
            <Svg style={styles.divider.container}>
              <Line
                {...styles.divider.coordinate}
                stroke="#CDCDCD"
                strokeWidth={styles.divider.container.height}
                strokeDasharray="2, 2"
              />
            </Svg>
            {this.renderPropaganda()}
          </ViewShot>
        </ScrollView>
        {this.renderActionBar()}
      </SafeAreaView>
    );
  }
}

export default Share;
