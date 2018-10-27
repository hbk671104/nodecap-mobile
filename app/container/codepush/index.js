import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { Bar } from 'react-native-progress';
import R from 'ramda';

import NavBar from 'component/navBar';

import appInfo from '../../../package.json';
import styles from './styles';

@connect(({ codePush }) => ({
  codepush: codePush.percent || 0,
  updateInfo: R.pathOr({}, ['update'])(codePush),
}))
class CodePushPage extends Component {
  render() {
    const { updateInfo } = this.props;
    const description = R.pathOr('', ['description'])(updateInfo);
    return (
      <View style={styles.container}>
        <NavBar barStyle="dark-content" />
        <View style={styles.wrapper}>
          <View style={styles.top.container}>
            <Image source={require('asset/big_logo.png')} />
            <Text style={styles.top.intro}>找项目 上 Hotnode</Text>
          </View>
          <View style={styles.bar.container}>
            <Bar color="#108EE9" width={255} progress={this.props.codepush} />
            <View style={styles.bar.wrapper}>
              <Text style={styles.bar.title}>
                <Text style={styles.bar.highlight}>v{appInfo.version}</Text>{' '}
                正在更新中...
              </Text>
              {!R.isEmpty(description) && (
                <Text style={styles.bar.content}>{description}</Text>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default CodePushPage;
