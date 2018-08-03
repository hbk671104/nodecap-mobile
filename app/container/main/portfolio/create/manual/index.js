import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { createForm } from 'rc-form';

import EnhancedScroll from 'component/enhancedScroll';
import SafeAreaView from 'component/uikit/safeArea';
import NavBar from 'component/navBar';
import AuthButton from 'component/auth/button';
import InputItem from 'component/inputItem';

import styles from './style';

@global.bindTrack({
  page: '项目手动创建',
  name: 'App_ProjectCreateManualOperation',
})
@connect()
@createForm()
class ManualCreate extends Component {
  handleNext = () => {
    this.props.form.validateFields((error, value) => {
      if (R.isNil(error)) {
        this.props.track('下一步');
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
    const { getFieldDecorator, getFieldError } = this.props.form;
    return (
      <SafeAreaView style={styles.container}>
        <NavBar gradient back title="手动添加 (1/2)" />
        <EnhancedScroll>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入项目名称',
              },
            ],
          })(
            <InputItem
              title="项目名称"
              placeholder="请输入项目名称"
              inputProps={{ autoFocus: true }}
              error={getFieldError('name')}
            />,
          )}
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
              error={getFieldError('token_name')}
            />,
          )}
          {getFieldDecorator('source', {
            rules: [
              {
                required: true,
                message: '请输入项目来源',
              },
            ],
          })(
            <InputItem
              title="项目来源"
              placeholder="请输入项目来源"
              error={getFieldError('source')}
            />,
          )}
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
              error={getFieldError('description')}
            />,
          )}
          <View style={styles.notice.container}>
            <Text style={styles.notice.text}>
              添加更多投资信息可前往网页版 hotnode.io
            </Text>
          </View>
        </EnhancedScroll>
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
