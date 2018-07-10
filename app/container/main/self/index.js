import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import NavBar from 'component/navBar';
import Header from './header';
import Item from './item';
import styles from './style';

@connect(({ user }) => ({
  user: user.currentUser,
}))
class Self extends Component {
  renderNavBar = () => (
    <NavBar
      gradient
      renderTitle={() => <Text style={styles.navBar.title}>我的</Text>}
      renderBottom={() => <View style={styles.navBar.bottom} />}
    />
  );

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView
          style={styles.scroll.container}
          contentContainerStyle={styles.scroll.content}
        >
          <Item icon={require('asset/mine/fund.png')} title="我的基金" />
          <Item icon={require('asset/mine/resources.png')} title="我的人脉" />
          <Item icon={require('asset/mine/colleague.png')} title="我的同事" />
          <View style={styles.scroll.divider} />
          <Item
            icon={require('asset/mine/notif.png')}
            title="通知中心"
            badge={24}
          />
          <Item icon={require('asset/mine/settings.png')} title="设置" />
        </ScrollView>
        <Header style={styles.header} user={user} />
      </View>
    );
  }
}

export default Self;
