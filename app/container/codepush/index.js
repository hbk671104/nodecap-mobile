import React, { PureComponent } from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { Bar } from 'react-native-progress';
import CodePush from 'react-native-code-push';
import R from 'ramda';

import NavBar from 'component/navBar';

import appInfo from '../../../package.json';
import styles from './styles';

@connect(({ codePush }) => ({
  status: R.path(['status'])(codePush),
  progress: R.pathOr(0, ['percent'])(codePush),
  updateInfo: R.pathOr({}, ['update'])(codePush),
}))
class CodePushPage extends PureComponent {
  render() {
    const { status, progress, updateInfo } = this.props;
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
            <Bar color="#108EE9" width={255} progress={progress} />
            <View style={styles.bar.wrapper}>
              <Text style={styles.bar.title}>
                <Text style={styles.bar.highlight}>v{appInfo.version}</Text>{' '}
                {status === CodePush.SyncStatus.CHECKING_FOR_UPDATE &&
                  '正在检查更新...'}
                {status === CodePush.SyncStatus.DOWNLOADING_PACKAGE &&
                  '正在下载更新...'}
                {status === CodePush.SyncStatus.INSTALLING_UPDATE &&
                  '正在安装更新...'}
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
