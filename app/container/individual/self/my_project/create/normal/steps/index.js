import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import styles from './style';

@global.bindTrack({
  page: '正常创建项目流程外层',
  name: 'App_MyProjectCreateNormalWrapperOperation',
})
@connect(({ user, login, loading }) => ({
  data: [],
  //   loading: loading.effects['login/switch'],
}))
class CreateProjectNormalWrapper extends Component {
  componentDidMount() {
    this.props.track('进入');
  }

  handleNextPress = () => {};

  render() {
    const { data, loading } = this.props;
    return (
      <View style={styles.container}>
        <NavBar back gradient title="基本信息" />
      </View>
    );
  }
}

export default CreateProjectNormalWrapper;
