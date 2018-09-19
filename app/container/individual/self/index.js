import React, { Component } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import Item from 'component/self/item';
import Header from './header';
import styles from './style';

@global.bindTrack({
  page: '我的模块',
  name: 'App_MineOperation',
})
@connect(({ user, login }) => ({
  user: user.currentUser,
  isLogin: !!login.token,
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
    if (this.props.isLogin) {
      this.props.track('个人信息卡片');
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'MyProfile',
        }),
      );
    } else {
      this.props.track('登录');
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      );
    }
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

  handleFeedbackPress = () => {};

  handleSwitchEndPress = () => {
    Alert.alert('提示', '是否切换至「机构版」？', [
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

  render() {
    const { isLogin } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView contentContainerStyle={styles.scroll.content}>
          {/* <View style={styles.scroll.divider} /> */}
          <Item
            icon={require('asset/mine/feedback.png')}
            title="意见反馈"
            onPress={this.handleFeedbackPress}
          />
          <Item
            icon={require('asset/mine/settings.png')}
            title="设置"
            onPress={this.handleSettingsPress}
          />
          {isLogin && (
            <View>
              <View style={styles.scroll.divider} />
              <Item
                icon={require('asset/mine/switch_end.png')}
                title="切换至机构版"
                subtitle="若您是机构投资人，可管理机构项目及工作流协作"
                onPress={this.handleSwitchEndPress}
              />
            </View>
          )}
        </ScrollView>
        <Header
          {...this.props}
          style={styles.header}
          onPress={this.handleHeaderPress}
        />
      </View>
    );
  }
}

export default Self;
