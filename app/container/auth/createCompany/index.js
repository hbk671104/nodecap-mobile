import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { createForm } from 'rc-form';
import R from 'ramda';
import { Toast } from 'antd-mobile';

import EnhancedScroll from 'component/enhancedScroll';
import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import InputItem from 'component/inputItem';
import AuthButton from 'component/auth/button';
import styles from './style';

@connect(({ loading }) => ({
  loading: loading.effects['user/createCompany'],
}))
@createForm()
class CreateCompany extends Component {
  state = {
    countdown: 30,
  };

  handleBack = () => {
    this.props.dispatch(NavigationActions.back());
  };

  handleSubmit = () => {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/createCompany',
          payload: {
            ...value,
          },
          callback: () => {
            Toast.success('成功创建企业账户，现在即可登录使用！');
            this.handleBack();
          },
        });
      }
    });
  };

  handleSendSMSCode = () => {
    const mobile = this.props.form.getFieldValue('user_mobile');
    if (R.isNil(mobile) || R.isEmpty(mobile)) {
      return;
    }
    this.props.dispatch({
      type: 'user/sendSMS',
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
                  countdown: 30,
                });
              }
            },
          );
        }, 1000);
      },
    });
  };

  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;
    const { countdown } = this.state;
    const { loading } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient back title="创建公司" />
        <EnhancedScroll>
          <View>
            {getFieldDecorator('invite_code', {
              rules: [
                {
                  required: true,
                  message: '请输入邀请码',
                },
                {
                  validator: (rule, value, callback) => {
                    if (
                      !R.contains(value, [
                        'AaNuqM',
                        'YnsZxj',
                        '8s39BD',
                        'eihEhL',
                        '5mGaxv',
                        'irlfIX',
                      ])
                    ) {
                      callback('无效的邀请码');
                    }
                  },
                },
              ],
            })(
              <InputItem
                title="邀请码"
                titleStyle={styles.item.title}
                placeholder="请输入邀请码"
                inputProps={{ autoFocus: true }}
                error={getFieldError('invite_code')}
              />,
            )}
            {getFieldDecorator('company_name', {
              rules: [
                {
                  required: true,
                  message: '请输入名称',
                },
              ],
            })(
              <InputItem
                title="名称"
                titleStyle={styles.item.title}
                placeholder="请输入名称"
                error={getFieldError('company_name')}
              />,
            )}
            {getFieldDecorator('company_description')(
              <InputItem
                title="简介"
                vertical
                placeholder="请输入公司简介"
                error={getFieldError('company_description')}
              />,
            )}
          </View>
          <View>
            <View style={styles.title.container}>
              <Text style={styles.title.text}>管理员信息</Text>
            </View>
            {getFieldDecorator('user_realname', {
              rules: [
                {
                  required: true,
                  message: '请输入您的姓名',
                },
              ],
            })(
              <InputItem
                title="姓名"
                titleStyle={styles.item.title}
                placeholder="请输入您的姓名"
                error={getFieldError('user_realname')}
              />,
            )}
            {getFieldDecorator('user_mobile', {
              rules: [
                {
                  required: true,
                  message: '请输入您的手机号码',
                },
              ],
            })(
              <InputItem
                title="手机"
                titleStyle={styles.item.title}
                placeholder="请输入您的手机号码"
                inputProps={{ keyboardType: 'phone-pad' }}
                error={getFieldError('user_mobile')}
              />,
            )}
            {getFieldDecorator('message_code', {
              rules: [
                {
                  required: true,
                  message: '请输入您的验证码',
                },
              ],
            })(
              <InputItem
                title="验证码"
                titleStyle={styles.item.title}
                placeholder="请输入您的验证码"
                inputProps={{ keyboardType: 'number-pad' }}
                renderRight={() => (
                  <Touchable onPress={this.handleSendSMSCode}>
                    <Text style={styles.smscode}>
                      {countdown === 30 ? '获取验证码' : `${countdown}s`}
                    </Text>
                  </Touchable>
                )}
                error={getFieldError('message_code')}
              />,
            )}
            {getFieldDecorator('user_email', {
              rules: [
                {
                  required: true,
                  message: '请输入您的邮箱',
                },
              ],
            })(
              <InputItem
                title="邮箱"
                titleStyle={styles.item.title}
                placeholder="请输入您的邮箱"
                error={getFieldError('user_email')}
              />,
            )}
            {getFieldDecorator('user_password', {
              rules: [
                {
                  required: true,
                  message: '请输入您的登录密码',
                },
              ],
            })(
              <InputItem
                title="密码"
                titleStyle={styles.item.title}
                placeholder="请输入您的登录密码"
                inputProps={{ secureTextEntry: true }}
                error={getFieldError('user_password')}
              />,
            )}
            {getFieldDecorator('repeat', {
              rules: [
                {
                  required: true,
                  message: '请再次输入您的登录密码',
                },
              ],
            })(
              <InputItem
                title="确认密码"
                titleStyle={styles.item.title}
                placeholder="请再次输入您的登录密码"
                inputProps={{ secureTextEntry: true }}
                error={getFieldError('repeat')}
              />,
            )}
          </View>
        </EnhancedScroll>
        <AuthButton
          loading={loading}
          disabled={false}
          style={styles.confirm}
          title="提 交"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

export default CreateCompany;
