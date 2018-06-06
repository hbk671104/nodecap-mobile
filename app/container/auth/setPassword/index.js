import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { compose, withState } from 'recompose';
import AuthButton from 'component/auth/button';
import AuthInput from 'component/auth/input';
import styles from './style';

@connect(({ loading }) => ({
  loading: loading.effects['login/setPassword'],
}))
@createForm()
class SetPassword extends Component {
  handleOnSubmit = () => {
    if (this.props.loading) {
      return;
    }
    this.props.form.validateFields((err, value) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/setPassword',
          payload: {
            ...value,
            password_reset_token: this.props.navigation.getParam('resetToken'),
          },
        });
      }
    });
  }

  render() {
    const { loading } = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsError, isFieldTouched } = this.props.form;
    const originPassword = getFieldValue('password');
    /**
     * 密码校验规则
     * @type {[null,null]}
     */
    const passwordRules = [
      {
        required: true, message: '请输入密码！',
      },
      {
        pattern: /^(?=.*\d)(?=.*[a-z]).{6,}$/, message: '请输入包含英文和数字的6位以上密码！',
      },
    ];

    /**
     * 重复密码校验规则
     * @type {[null]}
     */
    const resetPasswordRules = [{
      required: true, message: '请再次输入密码！',
    }, (rule, value, callback) => {
      const error = [];
      if (value !== originPassword) {
        error.push(new Error('两次输入的密码不一致'));
      }
      callback(error);
      return error;
    }];

    const hasError = !R.pipe(
      R.values,
      R.filter(i => !!i),
      R.isEmpty,
    )(getFieldsError(['confirm_password', 'password']));

    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>重设您的密码</Text>
            <Text style={styles.tip}>首次登录需要您设置包含英文和数字的 6 位以上密码</Text>
          </View>
          <View style={{ marginTop: 100 }}>
            {getFieldDecorator('password', {
              rules: passwordRules,
            })(
              <AuthInput
                style={styles.input}
                title="新密码"
                placeholder="请输入包含英文和数字的 6 位以上密码"
                inputProps={{ secureTextEntry: true }}
              />
            )}
            {getFieldDecorator('confirm_password', {
              rules: resetPasswordRules,
            })(
              <AuthInput
                style={[styles.input, { marginTop: 27 }]}
                title="再次输入密码"
                placeholder="请再次输入你的密码"
                inputProps={{ secureTextEntry: true }}
              />
            )}
          </View>
          <AuthButton
            loading={loading}
            disabled={hasError || !isFieldTouched('confirm_password') || !isFieldTouched('password')}
            style={styles.button}
            onPress={this.handleOnSubmit}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export default SetPassword;
