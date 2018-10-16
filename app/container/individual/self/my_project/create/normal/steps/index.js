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

  handleNextPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'CreateMyProjectDescription',
      }),
    );
  };

  render() {
    const { data, loading, children } = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          back
          gradient
          title="基本信息"
          renderRight={() => (
            <Touchable borderless onPress={this.handleNextPress}>
              <Text style={styles.navBar.right}>下一步</Text>
            </Touchable>
          )}
        />
        {children}
      </View>
    );
  }
}

export default CreateProjectNormalWrapper;
