import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { createForm } from 'rc-form';
import { Toast } from 'antd-mobile';
import R from 'ramda';

import EnhancedScroll from 'component/enhancedScroll';
import NavBar from 'component/navBar';
import InputItem from 'component/inputItem';
import AuthButton from 'component/auth/button';
import Selector from './selector';
import styles from './style';

@connect(({ resource }) => ({
  types: resource.types,
}))
@createForm()
class ResourceAdd extends Component {
  handleSubmitPress = () => {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        const initial = this.props.navigation.getParam('default', {});
        const hasInitial = !R.isEmpty(initial);
        Toast.loading(hasInitial ? '更新中...' : '创建中...', 0);
        this.props.dispatch({
          type: `resource/${hasInitial ? 'save' : 'create'}`,
          payload: value,
          ...(hasInitial ? { id: initial.id } : {}),
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
    const { types } = this.props;
    const initial = this.props.navigation.getParam('default', {});
    const hasInitial = !R.isEmpty(initial);
    return (
      <View style={styles.container}>
        <NavBar gradient back title={`${hasInitial ? '编辑' : '创建'}人脉`} />
        <EnhancedScroll>
          {getFieldDecorator('name', {
            initialValue: initial.name,
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
              error={getFieldError('name')}
            />,
          )}
          {getFieldDecorator('types', {
            initialValue: initial.types,
            rules: [
              {
                required: true,
                message: '请至少选择一个类型',
              },
            ],
          })(
            <InputItem
              vertical
              title="类型"
              renderContent={({ onChange, value }) => (
                <Selector data={types} onChange={onChange} value={value} />
              )}
              error={getFieldError('types')}
            />,
          )}
          {getFieldDecorator('org', {
            initialValue: initial.org,
            rules: [
              {
                required: true,
                message: '请输入机构',
              },
            ],
          })(
            <InputItem
              title="机构"
              titleStyle={styles.item.title}
              placeholder="请输入机构"
              error={getFieldError('org')}
            />,
          )}
          {getFieldDecorator('title', {
            initialValue: initial.title,
          })(
            <InputItem
              title="职位"
              titleStyle={styles.item.title}
              placeholder="请输入职位"
              error={getFieldError('title')}
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
          {getFieldDecorator('wechat', {
            initialValue: initial.wechat,
          })(
            <InputItem
              title="微信"
              titleStyle={styles.item.title}
              placeholder="请输入微信"
              error={getFieldError('wechat')}
            />,
          )}
          {getFieldDecorator('email', {
            initialValue: initial.email,
          })(
            <InputItem
              title="邮箱"
              titleStyle={styles.item.title}
              placeholder="请输入邮箱"
              error={getFieldError('email')}
            />,
          )}
          {getFieldDecorator('address', {
            initialValue: initial.address,
          })(
            <InputItem
              title="常驻地"
              titleStyle={styles.item.title}
              placeholder="请输入常驻地"
              error={getFieldError('address')}
            />,
          )}
          {getFieldDecorator('comment', {
            initialValue: initial.comment,
          })(
            <InputItem
              title="备注"
              titleStyle={styles.item.title}
              placeholder="请输入备注"
              error={getFieldError('comment')}
            />,
          )}
          <AuthButton
            style={styles.bottom.container}
            disabled={false}
            title={hasInitial ? '保 存' : '创 建'}
            onPress={this.handleSubmitPress}
          />
        </EnhancedScroll>
      </View>
    );
  }
}

export default ResourceAdd;
