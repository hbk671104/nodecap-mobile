import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import styles from './style';

@global.bindTrack({
  page: '我的项目',
  name: 'App_MyProjectOperation',
})
@connect(({ user, login, loading }) => ({
  //   user: user.currentUser,
  //   isLogin: !!login.token,
  //   loading: loading.effects['login/switch'],
}))
class MyProject extends Component {
  render() {
    const { loading } = this.props;
    return (
      <View style={styles.container}>
        <NavBar back gradient title="我的项目" />
      </View>
    );
  }
}

export default MyProject;
