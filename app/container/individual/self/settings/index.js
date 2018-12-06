import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import CodePush from 'react-native-code-push';
import { withState } from 'recompose';
import Communications from 'react-native-communications';

import NavBar from 'component/navBar';
import ListItem from 'component/listItem';
import AuthButton from 'component/auth/button';

import appInfo from '../../../../../package.json';

import styles from './style';

@global.bindTrack({
  page: '设置',
  name: 'App_SettingsOperation',
})
@connect(({ login, loading, codePush }) => ({
  isLogin: !!login.token,
  loading: loading.effects['login/logout'],
  versionLabel: R.pathOr('', ['update', 'label'])(codePush),
}))
@withState('pkg', 'setPkg', null)
class Settings extends Component {
  async componentWillMount() {
    const pkg = await CodePush.getUpdateMetadata();
    this.props.setPkg(pkg);
  }

  logout = () => {
    this.props.track('退出登录');
    this.props.dispatch({
      type: 'login/logout',
      callback: () => {
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: 'Self',
          }),
        );
      },
    });
  };

  handleLogoutPress = () => {
    Alert.alert('提示', '确认退出登录 ？', [
      { text: '确认', onPress: this.logout },
      { text: '取消', style: 'cancel' },
    ]);
  };

  handleChangelogPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ChangeLog',
      }),
    );
  };

  handleSwitchEndPress = () => {
    if (
      R.pipe(
        R.pathOr({}, ['user', 'companies']),
        R.isEmpty,
      )(this.props)
    ) {
      Alert.alert('您尚未加入任何机构', '入驻请联系 18500193244', [
        {
          text: '拨打',
          onPress: () => Communications.phonecall('185-0019-3244', false),
        },
        {
          text: '取消',
          style: 'cancel',
        },
      ]);
      return;
    }

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

  render() {
    const { isLogin } = this.props;
    const versionLabel = R.path(['pkg', 'label'])(this.props);
    return (
      <View style={styles.container}>
        <NavBar gradient back title="设置" />
        <ScrollView>
          <ListItem
            disablePress
            title="当前版本"
            content={`v${appInfo.version}${
              !versionLabel ? '' : ` (${versionLabel})`
            }`}
          />
          <ListItem title="版本更新" onPress={this.handleChangelogPress} />
          {isLogin && (
            <ListItem
              title="切换至机构版"
              onPress={this.handleSwitchEndPress}
            />
          )}
        </ScrollView>
        {isLogin && (
          <AuthButton
            style={styles.bottom.container}
            disabled={false}
            title="退出登录"
            loading={this.props.loading}
            onPress={this.handleLogoutPress}
          />
        )}
      </View>
    );
  }
}

export default Settings;
