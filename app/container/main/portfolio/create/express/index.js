import React, { Component } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { createForm } from 'rc-form';
import { Toast } from 'antd-mobile';

import SafeAreaView from 'component/uikit/safeArea';
import NavBar from 'component/navBar';
import AuthButton from 'component/auth/button';
import InputItem from 'component/inputItem';

import Header from './header';
import styles from './style';

@connect()
@createForm()
class ExpressCreate extends Component {
  handleHeaderPress = item => () => {
    Linking.openURL(item.homepage);
  };

  render() {
    const item = this.props.navigation.getParam('item');
    const { getFieldDecorator } = this.props.form;
    return (
      <SafeAreaView style={styles.container}>
        <NavBar gradient back title="快速添加 (1/2)" />
        <ScrollView keyboardDismissMode="on-drag">
          <Header item={item} onPress={this.handleHeaderPress(item)} />
          {getFieldDecorator('source', {
            rules: [
              {
                required: true,
                message: '请输入项目来源',
              },
            ],
          })(<InputItem title="项目来源" placeholder="请输入项目来源" />)}
          {getFieldDecorator('description', {
            initialValue: item.description,
            rules: [
              {
                required: true,
                message: '请输入项目描述',
              },
            ],
          })(
            <InputItem
              title="项目描述"
              placeholder="请输入项目描述"
              vertical
            />,
          )}
          <View style={styles.notice.container}>
            <Text style={styles.notice.text}>
              添加更多投资信息可前往网页版 hotnode.io
            </Text>
          </View>
        </ScrollView>
        <AuthButton
          style={styles.confirm}
          disabled={false}
          title="信息无误，下一步"
        />
      </SafeAreaView>
    );
  }
}

export default ExpressCreate;
