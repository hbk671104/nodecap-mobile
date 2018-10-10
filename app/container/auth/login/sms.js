import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import EnhancedScroll from 'component/enhancedScroll';
import AuthButton from 'component/auth/button';
import Touchable from 'component/uikit/touchable';
import InputItem from 'component/inputItem';
import NavBar from 'component/navBar';
import styles from './style';

@connect(({ loading }) => ({
  loading: loading.effects['login/smsLogin'],
  sendingSMS: loading.effects['login/sendLoginSMS'],
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
          type: 'login/smsLogin',
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
      type: 'login/sendLoginSMS',
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
                this.countdown = null;
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
    const { loading, sendingSMS } = this.props;
    const { countdown } = this.state;
    const account = getFieldValue('mobile');
    const verification_code = getFieldValue('verification_code');

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
                    routeName: 'Password',
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
          <Image
            style={styles.logo}
            source={require('asset/logo_horizontal.png')}
          />
          <View style={{ marginTop: 25 }}>
            {getFieldDecorator('mobile', {
              rules: [{ required: true, message: '请输入手机号' }],
            })(
              <InputItem
                style={styles.input}
                placeholder="请输入手机号"
                inputProps={{ keyboardType: 'number-pad', autoFocus: true }}
              />,
            )}
            <View style={{ marginTop: 20 }}>
              {getFieldDecorator('verification_code', {
                rules: [{ required: true, message: '请输入验证码' }],
              })(
                <InputItem
                  style={styles.input}
                  titleStyle={styles.item.title}
                  placeholder="请输入您的验证码"
                  inputProps={{ keyboardType: 'number-pad' }}
                  renderRight={() => {
                    if (sendingSMS) {
                      return <ActivityIndicator />;
                    }
                    return (
                      <Touchable
                        disabled={R.isEmpty(account) || R.isNil(account)}
                        hitSlop={styles.hitSlop}
                        onPress={this.handleSendSMSCode}
                      >
                        <Text style={styles.smscode}>
                          {!this.countdown ? '获取验证码' : `${countdown}s`}
                        </Text>
                      </Touchable>
                    );
                  }}
                  error={getFieldError('message_code')}
                />,
              )}
            </View>
          </View>
          <AuthButton
            loading={loading}
            disabled={!account || !verification_code}
            style={styles.button}
            onPress={this.handleOnSubmit}
          />
        </EnhancedScroll>
      </View>
    );
  }
}

export default SMSLogin;
