import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { createForm } from 'rc-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Toast } from 'antd-mobile';

import SafeAreaView from 'component/uikit/safeArea';
import NavBar from 'component/navBar';
import AuthButton from 'component/auth/button';
import InputItem from 'component/inputItem';

import styles from './style';

@connect()
@createForm()
class ManualCreate extends Component {
  handleNext = () => {
    this.props.form.validateFields((error, value) => {
      if (R.isNil(error)) {
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: 'InvestmentCreate',
            params: {
              express: false,
              projectInfo: {
                ...value,
              },
            },
          }),
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <SafeAreaView style={styles.container}>
        <NavBar gradient back title="手动添加 (1/2)" />
        <KeyboardAwareScrollView keyboardDismissMode="on-drag">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入项目名称',
              },
            ],
          })(<InputItem title="项目名称" placeholder="请输入项目名称" />)}
          {getFieldDecorator('token_name', {
            rules: [
              {
                required: true,
                message: '请输入 Token 简称',
              },
            ],
          })(
            <InputItem
              title="Token 简称"
              placeholder="请输入项目 Token 简称"
            />,
          )}
          {getFieldDecorator('source', {
            rules: [
              {
                required: true,
                message: '请输入项目来源',
              },
            ],
          })(<InputItem title="项目来源" placeholder="请输入项目来源" />)}
          {getFieldDecorator('description', {
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
        </KeyboardAwareScrollView>
        <AuthButton
          style={styles.confirm}
          disabled={false}
          title="下一步"
          onPress={this.handleNext}
        />
      </SafeAreaView>
    );
  }
}

export default ManualCreate;
