import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { Bar } from 'react-native-progress';

import NavBar from 'component/navBar';
import StatusBar from 'component/uikit/statusBar';
import styles from './styles';

@connect(state => ({
  codepush: state.codePush.percent || 0,
}))
class CodePush extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavBar barStyle="dark-content" />
        <View style={styles.logoTextWrap}>
          <Image style={styles.logo} source={require('asset/big_logo.png')} />
          <View
            style={{
              marginTop: 50,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: '#888888',
              }}
            >
              正在更新中...
            </Text>
            <Bar
              style={{
                marginTop: 10,
              }}
              color="#108EE9"
              progress={this.props.codepush}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default CodePush;
