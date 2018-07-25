import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { Toast } from 'antd-mobile';

import SafeAreaView from 'component/uikit/safeArea';
import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import InputItem from 'component/inputItem';

import Header from './header';
import styles from './style';

@connect()
class ExpressCreate extends Component {
  render() {
    const item = this.props.navigation.getParam('item');
    return (
      <SafeAreaView style={styles.container}>
        <NavBar gradient back title="快速添加 (1/2)" />
        <ScrollView keyboardDismissMode="on-drag">
          <Header item={item} />
          <InputItem title="项目来源" placeholder="请输入项目来源" />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default ExpressCreate;
