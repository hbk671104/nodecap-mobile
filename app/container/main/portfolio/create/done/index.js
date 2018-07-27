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

  checkDetail = () => {
    const item = this.props.navigation.getParam('data', {});
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PortfolioDetail',
        params: {
          item,
        },
      }),
    );
  };

  handleFinishPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Portfolio',
      }),
    );
  };

  render() {
    const data = this.props.navigation.getParam('data', {});
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="default" />
        <ScrollView
          style={styles.content.container}
          contentContainerStyle={styles.content.contentContainer}
          showsVerticalScrollIndicator={false}
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
              <Text style={styles.content.item.highlight}>{data.name}</Text>
            </Text>
            <Text style={styles.content.item.title}>
              项目来源：
              <Text style={styles.content.item.subtitle}>{data.source}</Text>
            </Text>
            <Text style={[styles.content.item.title, { lineHeight: 21 }]}>
              项目描述：
              <Text style={styles.content.item.subtitle}>
                {data.description}
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
