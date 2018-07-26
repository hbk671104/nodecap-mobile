import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Toast } from 'antd-mobile';

import StatusBar from 'component/uikit/statusBar';
import SafeAreaView from 'component/uikit/safeArea';
import Touchable from 'component/uikit/touchable';
import AuthButton from 'component/auth/button';

import styles from './style';

@connect()
class CreateDone extends Component {
  createAnother = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'CreateProject',
      }),
    );
  };

  checkDetail = () => {};

  handleFinishPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Portfolio',
      }),
    );
  };

  render() {
    // const item = this.props.navigation.getParam('item');
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        <ScrollView
          style={styles.content.container}
          contentContainerStyle={styles.content.contentContainer}
        >
          <View>
            <Image
              style={styles.content.image}
              source={require('asset/project/create/create_success.png')}
            />
            <Text style={styles.content.title}>项目添加成功</Text>
          </View>
          <View style={styles.content.item.container}>
            <Text style={styles.content.item.title}>
              项目：
              <Text style={styles.content.item.highlight}>ZIL</Text>
            </Text>
            <Text style={styles.content.item.title}>
              项目来源：
              <Text style={styles.content.item.subtitle}>李柯瑶</Text>
            </Text>
            <Text style={[styles.content.item.title, { lineHeight: 21 }]}>
              项目描述：
              <Text style={styles.content.item.subtitle}>
                该项目作为基础链，旨在解决交易速度和扩展性的问题，用于解决当前区块链的第一大难题。
              </Text>
            </Text>
          </View>
        </ScrollView>
        <AuthButton
          style={styles.checkDetail.container}
          titleStyle={styles.checkDetail.title}
          disabled={false}
          title="查看项目"
          onPress={this.checkDetail}
        />
        <AuthButton
          style={styles.continue}
          disabled={false}
          title="继续添加"
          onPress={this.createAnother}
        />
        <Touchable
          borderless
          style={styles.done.container}
          onPress={this.handleFinishPress}
        >
          <Text style={styles.done.text}>完成</Text>
        </Touchable>
      </SafeAreaView>
    );
  }
}

export default CreateDone;
