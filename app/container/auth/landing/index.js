import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { NavigationActions } from 'react-navigation';

import AuthButton from 'component/auth/button';
import StatusBar from 'component/uikit/statusBar';
import styles from './style';

@connect()
class Landing extends Component {
  handleLoginPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Login',
      }),
    );
  };

  handleCreateCompanyPress = () => {};

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.top.container}>
          <Animatable.Image
            animation="fadeInDownBig"
            delay={250}
            source={require('asset/big_logo.png')}
          />
          <Text style={styles.top.intro}>
            专业的 Token Fund 资产项目管理终端
          </Text>
        </View>
        <View style={styles.bottom.container}>
          <AuthButton
            disabled={false}
            style={styles.bottom.login}
            onPress={this.handleLoginPress}
          />
          <AuthButton
            title="创建公司"
            disabled={false}
            style={styles.bottom.createCompany}
            titleStyle={styles.bottom.titleStyle}
            onPress={this.handleCreateCompanyPress}
          />
        </View>
      </View>
    );
  }
}

export default Landing;
