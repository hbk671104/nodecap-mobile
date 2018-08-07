import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';

import NavBar from 'component/navBar';
import ListItem from 'component/listItem';
import AuthButton from 'component/auth/button';
import styles from './style';

@global.bindTrack({
  page: '设置',
  name: 'App_SettingsOperation',
})
@connect()
class Settings extends Component {
  logout = () => {
    this.props.track('退出登录');
    this.props.dispatch({ type: 'login/logout' });
  };

  handleLogoutPress = () => {
    Alert.alert('提示', '确认退出登录 ？', [
      { text: '确认', onPress: this.logout },
      { text: '取消', style: 'cancel' },
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <NavBar gradient back title="设置" />
        <ScrollView>
          {/* <ListItem title="清D除缓存" content="10.92M" /> */}
          <ListItem
            disablePress
            title="当前版本"
            content={DeviceInfo.getVersion()}
          />
          {/* <ListItem title="评价 Hotnode" /> */}
        </ScrollView>
        <AuthButton
          style={styles.bottom.container}
          disabled={false}
          title="退出登录"
          onPress={this.handleLogoutPress}
        />
      </View>
    );
  }
}

export default Settings;
