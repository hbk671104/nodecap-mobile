import React, { Component } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import { hasPermission } from 'component/auth/permission/lock';
import Header from './header';
import Item from './item';
import styles from './style';
import Login from '../../auth/login';

@global.bindTrack({
  page: '我的模块',
  name: 'App_MineOperation',
})
@connect(({ user, login }) => ({
  user: user.currentUser,
  isLogin: !!login.token,
  in_individual: login.in_individual,
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
    const { in_individual } = this.props;
    Alert.alert(
      '提示',
      `是否切换至「${in_individual ? '机构版' : '个人版'}」`,
      [
        {
          text: '切换',
          onPress: () => this.props.dispatch({ type: 'login/switch' }),
        },
        {
          text: '取消',
          style: 'cancel',
        },
      ],
    );
  };

  renderNavBar = () => (
    <NavBar
      gradient
      title="我的"
      renderBottom={() => <View style={styles.navBar.bottom} />}
    />
  );

  render() {
    const { user, in_individual, isLogin } = this.props;
    if (!isLogin) {
      return <Login />;
    }
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
          <View style={styles.scroll.divider} />
          <Item
            icon={require('asset/mine/switch_end.png')}
            title={`切换至${in_individual ? '机构版' : '个人版'}`}
            subtitle={
              in_individual
                ? '若您是机构投资人，可管理机构项目及工作流协作'
                : '可进行个人投资项目管理和资讯获取'
            }
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
