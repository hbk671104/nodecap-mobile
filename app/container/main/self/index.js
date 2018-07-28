import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import Header from './header';
import Item from './item';
import styles from './style';

@connect(({ user }) => ({
  user: user.currentUser,
}))
class Self extends Component {
  handleSettingsPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Settings',
      }),
    );
  };

  handleHeaderPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'MyProfile',
      }),
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
    const { user } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView contentContainerStyle={styles.scroll.content}>
          {/* <Item icon={require('asset/mine/fund.png')} title="我的基金" />
          <Item icon={require('asset/mine/resources.png')} title="我的人脉" />
          <Item icon={require('asset/mine/colleague.png')} title="我的同事" />
          <View style={styles.scroll.divider} />
          <Item
            icon={require('asset/mine/notif.png')}
            title="通知中心"
            badge={24}
          /> */}
          <Item
            icon={require('asset/mine/settings.png')}
            title="设置"
            onPress={this.handleSettingsPress}
          />
        </ScrollView>
        <Header
          style={styles.header}
          user={user}
          onPress={this.handleHeaderPress}
        />
      </View>
    );
  }
}

export default Self;
