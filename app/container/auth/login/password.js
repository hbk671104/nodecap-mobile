import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import EnhancedScroll from 'component/enhancedScroll';
import AuthButton from 'component/auth/button';
import InputItem from 'component/inputItem';
import Touchable from 'component/uikit/touchable';
import NavBar from 'component/navBar';
import styles from './style';

@connect(({ loading }) => ({
  loading: loading.effects['login/login'],
}))
@createForm()
class Login extends Component {
  handleOnSubmit = () => {
    if (this.props.loading) {
      return;
    }
    this.props.form.validateFields((err, value) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/login',
          payload: {
            ...value,
          },
        });
      }
    });
  };

  handleResetPwdPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ResetPwd',
      }),
    );
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { loading } = this.props;
    const account = getFieldValue('account');
    const password = getFieldValue('password');
    return (
      <View style={styles.container}>
        <NavBar
          back
          barStyle="dark-content"
          renderRight={() => (
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.dispatch(
                  NavigationActions.navigate({
                    routeName: 'SMS',
                  }),
                );
              }}
            >
              <View>
                <Text style={styles.rightButton}>验证码登录</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
        <EnhancedScroll>
          <Image
            style={styles.logo}
            source={require('asset/logo_horizontal.png')}
          />
          <View style={{ marginTop: 25 }}>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: '请输入手机号/邮箱登录' }],
            })(
              <InputItem
                style={styles.input}
                placeholder="请输入手机号/邮箱登录"
              />,
            )}
            <View style={{ marginTop: 20 }}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <InputItem
                  style={styles.input}
                  placeholder="请输入密码"
                  inputProps={{ secureTextEntry: true }}
                />,
              )}
            </View>
          </View>
          <AuthButton
            loading={loading}
            disabled={!account || !password}
            style={styles.button}
            onPress={this.handleOnSubmit}
          />
          <Touchable
            borderless
            style={styles.resetPwd.container}
            onPress={this.handleResetPwdPress}
          >
            <Text style={styles.resetPwd.text}>忘记密码？</Text>
          </Touchable>
        </EnhancedScroll>
      </View>
    );
  }
}

export default Login;
