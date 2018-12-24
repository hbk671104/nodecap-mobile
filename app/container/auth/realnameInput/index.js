import React, { PureComponent } from 'react';
import { View, Image, Text } from 'react-native';
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import { Flex } from 'antd-mobile';
import { createForm } from 'rc-form';

import NavBar from 'component/navBar';
import Input from 'component/uikit/textInput';
import Icon from 'component/uikit/icon';
import AuthButton from 'component/auth/button';
import AvatarConfirmAlert from 'component/avatar_confirm_alert';
import styles from './style';
import { NavigationActions } from 'react-navigation';

@global.bindTrack({
  page: '真实姓名填写页面',
  name: 'App_RealnameInputOperation',
})
@connect(({ loading }) => ({
  submitting: loading.effects['user/updateUserProfile'],
}))
@createForm()
@compose(withState('avatarConfirmVisible', 'setAvatarConfirmVisible', false))
class RealnameInput extends PureComponent {
  componentDidMount() {
    this.props.track('进入');
  }

  handleSkipPress = () => {
    this.props.setAvatarConfirmVisible(true);
  };

  handleBack = () => {
    this.props.dispatch(NavigationActions.back());
  };

  handleSubmit = () => {
    this.props.form.validateFields((err, { realname }) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/updateUserProfile',
          payload: {
            realname,
          },
          callback: this.handleBack,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const realname = getFieldValue('realname');
    return (
      <View style={styles.container}>
        <NavBar back showBottomBorder title="姓名" barStyle="dark-content" />
        <View style={styles.contentContainer}>
          <View style={{ flex: 1 }}>
            <Flex style={styles.alert.container}>
              <Image source={require('asset/alert_icon.png')} />
              <Text style={styles.alert.title}>
                填写真实姓名，有助于提高信任值，增加沟通机会
              </Text>
            </Flex>
            <View style={styles.input.container}>
              {getFieldDecorator('realname')(
                <Input style={{ fontSize: 16 }} placeholder="请输入您的姓名" />,
              )}
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <AuthButton
              loading={submitting}
              disabled={!realname}
              style={styles.auth}
              title="提 交"
              onPress={this.handleSubmit}
            />
            <View style={styles.skip.container}>
              <Text style={styles.skip.text} onPress={this.handleSkipPress}>
                跳过 <Icon name="arrow-forward" />
              </Text>
            </View>
          </View>
        </View>
        <AvatarConfirmAlert
          {...this.props}
          title="是否跳过填写姓名"
          content="会降低您收到消息的概率，确认跳过？"
          actionTitle="去填写"
          subActionTitle="跳过"
          onSubmit={this.handleBack}
        />
      </View>
    );
  }
}

export default RealnameInput;
