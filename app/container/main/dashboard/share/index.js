import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ScrollView } from 'react-native';
import * as WeChat from 'react-native-wechat';
import R from 'ramda';
import moment from 'moment';

import NavBar from 'component/navBar';
import SafeAreaView from 'component/uikit/safeArea';
import Icon from 'component/uikit/icon';
import Touchable from 'component/uikit/touchable';
import Gradient from 'component/uikit/gradient';
import Format from 'component/format';
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
    // this.checkWechatAval();
  }

  checkWechatAval = async () => {
    this.setState({
      isWXAppSupportApi: await WeChat.isWXAppSupportApi(),
      isWXAppInstalled: await WeChat.isWXAppInstalled(),
    });
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
            <Touchable onPress={this.shareTo('wechat')}>
              <Image source={require('asset/wechat_icon.png')} />
            </Touchable>
          )}
          {wechatAvailable && (
            <Touchable
              style={{ marginLeft: 24 }}
              onPress={this.shareTo('moment')}
            >
              <Image source={require('asset/wechat_moment_icon.png')} />
            </Touchable>
          )}
          <Touchable style={{ marginLeft: 24 }} onPress={this.saveToCameraRoll}>
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
        <Image source={require('asset/share/share_background.png')} />
        <Gradient
          style={styles.navBar.bar.container}
          colors={['#25A7FF', '#1A94FF']}
        >
          <View style={styles.navBar.bar.group}>
            <Text style={styles.navBar.bar.title}>本期投资回报率</Text>
            <Text style={styles.navBar.bar.content}>
              <Format digit={0}>{roi}</Format>
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

  render() {
    const { fund } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <NavBar
            gradient
            renderContent={this.renderNavBarContent}
            renderBottom={this.renderNavBarBottom}
          />
        </ScrollView>
        {this.renderActionBar()}
      </SafeAreaView>
    );
  }
}

export default Share;
