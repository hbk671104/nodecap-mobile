import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions, StackActions } from 'react-navigation';

import EnhancedScroll from 'component/enhancedScroll';
import AuthButton from 'component/auth/button';
import AuthInput from 'component/auth/input';
import Touchable from 'component/uikit/touchable';
import InputItem from 'component/inputItem';
import NavBar from 'component/navBar';
import styles from './style';

@connect(({ loading }) => ({
  loading: loading.effects['login/login'],
}))
@createForm()
class SMSLogin extends Component {
  state = {
    countdown: 60,
  };
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
  handleSendSMSCode = () => {
    const mobile = this.props.form.getFieldValue('mobile');
    if (R.isNil(mobile) || R.isEmpty(mobile)) {
      return;
    }
    this.props.dispatch({
      type: 'login/sendSMS',
      payload: mobile,
      callback: () => {
        this.countdown = setInterval(() => {
          this.setState(
            prevState => ({
              countdown: prevState.countdown - 1,
            }),
            () => {
              if (this.state.countdown === 0) {
                clearInterval(this.countdown);
                this.setState({
                  countdown: 60,
                });
              }
            },
          );
        }, 1000);
      },
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue, getFieldError } = this.props.form;
    const { loading } = this.props;
    const { countdown } = this.state;
    const account = getFieldValue('mobile');
    const password = getFieldValue('password');
    const renderLeft = R.path(['screenProps', 'renderLeft'])(this.props);
    return (
      <View style={styles.container}>
        <NavBar
          barStyle="dark-content"
          back={false}
          renderLeft={renderLeft}
          renderRight={() => (
            <TouchableWithoutFeedback onPress={() => {
              this.props.navigation.dispatch(
                StackActions.push({
                  routeName: 'PasswordLogin',
                }),
              );
            }}
            >
              <View>
                <Text style={styles.rightButton}>密码登录</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
        <EnhancedScroll>
          <Image style={styles.logo} source={require('asset/logo_horizontal.png')} />
          <View style={{ marginTop: 25 }}>
            {getFieldDecorator('mobile', {
              rules: [{ required: true, message: '输入手机号/邮箱登录' }],
            })(
              <InputItem
                style={styles.input}
                placeholder="请输入手机号"
              />,
            )}
            <View style={{ marginTop: 20 }}>
              {getFieldDecorator('captcha', {
              rules: [{ required: true, message: '请输入验证码' }],
            })(
              <InputItem
                titleStyle={styles.item.title}
                placeholder="请输入您的验证码"
                inputProps={{ keyboardType: 'number-pad' }}
                renderRight={() => (
                  <Touchable onPress={this.handleSendSMSCode}>
                    <Text style={styles.smscode}>
                      {countdown === 60 ? '获取验证码' : `${countdown}s`}
                    </Text>
                  </Touchable>
                )}
                error={getFieldError('message_code')}
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
        </EnhancedScroll>
      </View>
    );
  }
}

export default SMSLogin;
