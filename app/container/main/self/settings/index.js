import React, { Component } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import Item from './item';
import styles from './style';

@connect(({ user }) => ({
  user: user.currentUser,
}))
class Settings extends Component {
  logout = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Auth',
      }),
    );
  };

  handleLogoutPress = () => {
    Alert.alert('提示', '确认退出登录 ？', [
      { text: '确认', onPress: this.logout },
      { text: '取消', style: 'cancel' },
    ]);
  };

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient back title="设置" />
        <ScrollView contentContainerStyle={styles.scroll.content}>
          <Item title="清除缓存" content="10.92M" />
          <Item title="检测新版本" content="v1.0" />
          <Item title="评价 Hotnode" />
        </ScrollView>
        <Touchable
          style={styles.bottom.container}
          onPress={this.handleLogoutPress}
        >
          <Text style={styles.bottom.title}>退出当前账号</Text>
        </Touchable>
      </View>
    );
  }
}

export default Settings;
