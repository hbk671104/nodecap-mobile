import React, { Component } from 'react';
import {
  View,
  Alert,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Clipboard,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Flex, Toast } from 'antd-mobile';

import NavBar from 'component/navBar';
import Item, { StaticItem } from 'component/self/item';
import { hasPermission } from 'component/auth/permission/lock';
import Header from './header';
import styles from './style';

@global.bindTrack({
  page: '我的模块',
  name: 'App_MineOperation',
})
@connect(({ user, loading }) => ({
  user: user.currentUser,
  loading: loading.effects['login/switch'],
}))
class Self extends Component {
  handleSettingsPress = () => {
    this.props.track('设置');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Settings',
      }),
    );
  };

  handleHeaderPress = () => {
    this.props.track('个人信息卡片');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'MyProfile',
      }),
    );
  };

  handleCompanyPress = () => {
    this.props.track('公司信息');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'MyCompany',
      }),
    );
  };

  handleResourcesPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Resources',
      }),
    );
  };

  handleColleaguePress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Colleague',
      }),
    );
  };

  handleSwitchEndPress = () => {
    Alert.alert('提示', '是否切换至「个人版」', [
      {
        text: '切换',
        onPress: () => this.props.dispatch({ type: 'login/switch' }),
      },
      {
        text: '取消',
        style: 'cancel',
      },
    ]);
  };

  renderNavBar = () => (
    <NavBar
      gradient
      title="我的"
      renderBottom={() => <View style={styles.navBar.bottom} />}
    />
  );

  renderWechat() {
    return (
      <Flex>
        <Text style={styles.wechatNumber}>ladh2857</Text>
        <TouchableWithoutFeedback
          hitSlop={{
            top: 20,
            left: 20,
            bottom: 20,
            right: 20,
          }}
          onPress={() => {
            Clipboard.setString('ladh2857');
            Toast.show('已复制', Toast.SHORT, false);
          }}
        >
          <View>
            <Text style={styles.wechatCopy}>复制</Text>
          </View>
        </TouchableWithoutFeedback>
      </Flex>
    );
  }

  render() {
    const { user, loading } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView contentContainerStyle={styles.scroll.content}>
          {hasPermission('resource-list') && (
            <Item
              icon={require('asset/mine/resources.png')}
              title="我的人脉"
              onPress={this.handleResourcesPress}
            />
          )}
          {hasPermission('user-list') && (
            <Item
              icon={require('asset/mine/colleague.png')}
              title="我的同事"
              onPress={this.handleColleaguePress}
            />
          )}
          {/* <View style={styles.scroll.divider} /> */}
          <Item
            icon={require('asset/mine/settings.png')}
            title="设置"
            onPress={this.handleSettingsPress}
          />
          <StaticItem
            icon={require('asset/mine/wechat.png')}
            title="加微信群"
            renderRight={this.renderWechat()}
          />
          <View style={styles.scroll.divider} />
          <Item
            loading={loading}
            icon={require('asset/mine/switch_end.png')}
            title="切换至个人版"
            subtitle="可进行个人投资项目管理和资讯获取"
            onPress={this.handleSwitchEndPress}
          />
        </ScrollView>
        <Header
          style={styles.header}
          user={user}
          onPress={this.handleHeaderPress}
          onCompanyPress={this.handleCompanyPress}
        />
      </View>
    );
  }
}

export default Self;
