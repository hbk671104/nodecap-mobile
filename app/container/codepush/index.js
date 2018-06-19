import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
// import {View, Image, Platform} from 'react-native'
import styles from './styles.js';
import { Bar } from 'react-native-progress';
import { connect } from 'react-redux';

@connect(state => ({
  codepush: state.codePush.percent || 0,
}))
class CodePushPage extends Component {
  static navigationOptions = () => ({
    header: null,
  })

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoTextWrap}>
          <Image style={styles.logoText} source={require('../../asset/big_logo.png')} />
          <View style={{
            marginTop: 50,
          }}
          >
            <Text style={{
              textAlign: 'center',
              color: '#888888',
            }}
            >正在更新中...
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

export default CodePushPage;
