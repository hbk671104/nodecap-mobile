import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import EnhancedScroll from 'component/enhancedScroll';
import AuthButton from 'component/auth/button';
import AuthInput from 'component/auth/input';
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
        <NavBar barStyle="dark-content" back />
        <EnhancedScroll>
          <Image style={styles.logo} source={require('asset/big_logo.png')} />
          <View style={{ marginTop: 55 }}>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: '请输入手机号/邮箱登录' }],
            })(
              <AuthInput
                style={styles.input}
                title="账号"
                placeholder="请输入手机号/邮箱登录"
              />,
            )}
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <AuthInput
                style={[styles.input, { marginTop: 27 }]}
                title="密码"
                placeholder="请输入密码"
                inputProps={{ secureTextEntry: true }}
              />,
            )}
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
