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
class InvestmentCreate extends Component {
  handleSkip = () => {};

  render() {
    // const item = this.props.navigation.getParam('item');
    const { getFieldDecorator } = this.props.form;
    return (
      <SafeAreaView style={styles.container}>
        <NavBar gradient back title="快速添加 (2/2)" />
        <KeyboardAwareScrollView keyboardDismissMode="on-drag">
          {getFieldDecorator('fund', {
            rules: [
              {
                required: true,
                message: '请选择投资主体',
              },
            ],
          })(<InputItem title="投资主体" placeholder="请选择投资主体" />)}
          {getFieldDecorator('stage_id', {
            rules: [
              {
                required: true,
                message: '请选择所投阶段',
              },
            ],
          })(<InputItem title="所投阶段" placeholder="请选择所投阶段" />)}
          {getFieldDecorator('invest_token', {
            rules: [
              {
                required: true,
                message: '请选择所投币种',
              },
            ],
          })(<InputItem title="投资币种" />)}
          {getFieldDecorator('invest_count', {
            rules: [
              {
                required: true,
                message: '请填写应投资数额',
              },
            ],
          })(<InputItem title="投资数额" placeholder="请输入投资数额" />)}
          {getFieldDecorator('return_count', {
            rules: [
              {
                required: true,
                message: '请填写应回币数量',
              },
            ],
          })(<InputItem title="应回币数量" placeholder="请输入应回币数量" />)}
          {getFieldDecorator('paid_at', {
            rules: [
              {
                required: true,
                message: '请选择打币时间',
              },
            ],
          })(<InputItem title="打币时间" placeholder="请选择打币时间" />)}
          <View style={styles.notice.container}>
            <Text style={styles.notice.text}>
              添加更多投资信息可前往网页版 hotnode.io
            </Text>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.noInvestment.container}>
          <Text style={styles.noInvestment.title}>
            暂无投资数据，
            <Text
              style={styles.noInvestment.highlight}
              onPress={this.handleSkip}
            >
              {'跳过 >'}
            </Text>
          </Text>
        </View>
        <AuthButton style={styles.confirm} disabled={false} title="提交" />
      </SafeAreaView>
    );
  }
}

export default InvestmentCreate;
