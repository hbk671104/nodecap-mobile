import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import CodePush from 'react-native-code-push';
import { Bar } from 'react-native-progress';
import R from 'ramda';

import NavBar from 'component/navBar';
import styles from './styles';

@connect(({ codePush }) => ({
  codepush: codePush.percent || 0,
}))
class CodePushPage extends Component {
  state = {
    remoteInfo: null,
  };

  async componentWillMount() {
    const remoteInfo = await CodePush.checkForUpdate();
    if (remoteInfo) {
      this.setState({
        remoteInfo,
      });
    }
  }

  render() {
    const { remoteInfo } = this.state;
    const version = R.pathOr('', ['appVersion'])(remoteInfo);
    const description = R.pathOr('', ['description'])(remoteInfo);
    return (
      <View style={styles.container}>
        <NavBar barStyle="dark-content" />
        <View style={styles.wrapper}>
          <View style={styles.top.container}>
            <Image source={require('asset/big_logo.png')} />
            <Text style={styles.top.intro}>
              专业的 Token Fund 资产项目管理终端
            </Text>
          </View>
          <View style={styles.bar.container}>
            <Bar color="#108EE9" width={255} progress={this.props.codepush} />
            <View style={styles.bar.wrapper}>
              <Text style={styles.bar.title}>
                {!!version && (
                  <Text style={styles.bar.highlight}>v{version}</Text>
                )}{' '}
                正在更新中...
              </Text>
              {!!description && (
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
