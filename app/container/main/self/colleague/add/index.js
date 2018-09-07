import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { createForm } from 'rc-form';
import { Toast } from 'antd-mobile';
import R from 'ramda';

import EnhancedScroll from 'component/enhancedScroll';
import NavBar from 'component/navBar';
import PickerSelect from 'component/picker';
import InputItem from 'component/inputItem';
import AuthButton from 'component/auth/button';
import styles from './style';

@global.bindTrack({
  page: '我的同事添加/编辑',
  name: 'App_ColleagueAdd/UpdateOperation',
})
@createForm()
@connect(({ global }) => ({
  roles: R.pathOr([], ['constants', 'roles'])(global),
}))
class ColleagueAdd extends Component {
  handleSubmitPress = () => {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        const initial = this.props.navigation.getParam('default', {});
        const hasInitial = !R.isEmpty(initial);
        const permissions = R.pipe(
          R.find(r => r.name === value.role),
          R.path(['permissions']),
          R.keys,
          R.map(r => ({ name: r })),
        )(this.props.roles);

        // track
        this.props.track(hasInitial ? '更新' : '添加');

        Toast.loading(hasInitial ? '更新中...' : '添加中...', 0);
        this.props.dispatch({
          type: `colleague/${hasInitial ? 'save' : 'create'}`,
          payload: {
            ...value,
            permissions,
            ...(hasInitial ? { id: initial.id } : {}),
          },
          callback: () => {
            Toast.hide();
            this.goBack();
          },
        });
      }
    });
  };

  goBack = () => {
    this.props.dispatch(NavigationActions.back());
  };

  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;
    const { roles } = this.props;

    const initial = this.props.navigation.getParam('default', {});
    const hasInitial = !R.isEmpty(initial);

    return (
      <View style={styles.container}>
        <NavBar gradient back title={`${hasInitial ? '编辑' : '添加'}同事`} />
        <EnhancedScroll>
          {getFieldDecorator('realname', {
            initialValue: initial.realname,
            rules: [
              {
                required: true,
                message: '请输入姓名',
              },
            ],
          })(
            <InputItem
              title="姓名"
              titleStyle={styles.item.title}
              placeholder="请输入姓名"
              error={getFieldError('realname')}
            />,
          )}
          {!R.isEmpty(roles) &&
            getFieldDecorator('role', {
              initialValue: initial.role,
              rules: [
                {
                  required: true,
                  message: '请选择角色',
                },
              ],
            })(
              <InputItem
                title="角色"
                titleStyle={styles.item.title}
                placeholder="请选择角色"
                renderContent={({ onChange, value }) => (
                  <PickerSelect
                    hideIcon
                    placeholder={{
                      label: '请选择角色',
                      value: null,
                    }}
                    data={roles.map(f => ({ label: f.name, value: f.name }))}
                    onChange={onChange}
                    value={value}
                  />
                )}
                error={getFieldError('role')}
              />,
            )}
          {getFieldDecorator('mobile', {
            initialValue: initial.mobile,
          })(
            <InputItem
              title="手机"
              titleStyle={styles.item.title}
              placeholder="请输入手机"
              inputProps={{ keyboardType: 'phone-pad' }}
              error={getFieldError('mobile')}
            />,
          )}
          {getFieldDecorator('email', {
            initialValue: initial.email,
            rules: [
              {
                required: true,
                message: '请输入登录账号',
              },
            ],
          })(
            <InputItem
              title="登录账号"
              titleStyle={styles.item.title}
              placeholder="请输入登录账号"
              error={getFieldError('email')}
            />,
          )}
          {!hasInitial &&
            getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入初始密码',
                },
              ],
            })(
              <InputItem
                title="初始密码"
                titleStyle={styles.item.title}
                placeholder="请输入初始密码"
                error={getFieldError('password')}
              />,
            )}
        </EnhancedScroll>
        <AuthButton
          style={styles.bottom.container}
          disabled={false}
          title={hasInitial ? '保 存' : '添 加'}
          onPress={this.handleSubmitPress}
        />
      </View>
    );
  }
}

export default ColleagueAdd;
