import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { createForm, createFormField } from 'rc-form';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import { Toast } from 'antd-mobile';

import EnhancedScroll from 'component/enhancedScroll';
import NavBar from 'component/navBar';
import InputItem from 'component/inputItem';
import Touchable from 'component/uikit/touchable';
import { launchImagePicker } from 'utils/imagepicker';
import { uploadImage } from 'services/upload';

import styles from './style';

@global.bindTrack({
  page: '认领我的项目认证',
  name: 'App_MyProjectClaimOperation',
})
@connect(({ project_create, loading }, props) => {
  const id = props.navigation.getParam('project_id');
  return {
    id,
    owner: R.pathOr({}, ['owner'])(project_create),
    submitting: loading.effects['project_create/claimProject'],
  };
})
@createForm({
  onValuesChange: ({ dispatch }, changed) => {
    dispatch({
      type: 'project_create/saveOwner',
      payload: changed,
    });
  },
  mapPropsToFields: ({ owner }) =>
    R.pipe(
      R.keys,
      R.reduce(
        (acc, key) => ({
          ...acc,
          [key]: createFormField({
            value: owner[key],
          }),
        }),
        {},
      ),
    )(owner),
})
class ClaimProject extends Component {
  componentDidMount() {
    this.props.track('进入');
  }

  handleUpload = async response => {
    Toast.loading('上传中...', 0);
    const { url } = await uploadImage({
      image: response,
      type: 'business_card',
    });
    Toast.hide();

    this.props.form.setFieldsValue({
      owner_card: url,
    });
  };

  handleBusinessCardPress = () => {
    launchImagePicker(response => {
      if (!response.didCancel && !response.error) {
        this.handleUpload(response);
      }
    });
  };

  handleSavePress = () => {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        this.handleSubmit(value);
      }
    });
  };

  handleSubmit = value => {
    const { id } = this.props;
    this.props.dispatch({
      type: id ? 'project_create/claimProject' : '///',
      id,
      payload: value,
      callback: success => {
        if (success) {
          this.props.dispatch(
            NavigationActions.navigate({
              routeName: 'CreateMyProjectDone',
            }),
          );
        }
      },
    });
  };

  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;
    return (
      <View style={styles.container}>
        <NavBar
          back
          gradient
          title="认领项目"
          renderRight={() => {
            if (this.props.submitting) {
              return <ActivityIndicator color="white" />;
            }
            return (
              <Touchable borderless onPress={this.handleSavePress}>
                <Text style={styles.navBar.right}>提交</Text>
              </Touchable>
            );
          }}
        />
        <EnhancedScroll>
          {getFieldDecorator('owner_name', {
            rules: [{ required: true, message: '请输入姓名' }],
          })(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="姓名"
              placeholder="请输入姓名"
              inputProps={{ style: styles.inputItem.input }}
              error={getFieldError('owner_name')}
            />,
          )}
          {getFieldDecorator('owner_title', {
            rules: [{ required: true, message: '请输入公司职位' }],
          })(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="职位"
              placeholder="请输入公司职位"
              inputProps={{ style: styles.inputItem.input }}
              error={getFieldError('owner_title')}
            />,
          )}
          {getFieldDecorator('owner_mobile', {
            rules: [{ required: true, message: '请输入手机号码' }],
          })(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="手机"
              placeholder="请输入手机号码"
              inputProps={{ style: styles.inputItem.input }}
              error={getFieldError('owner_mobile')}
            />,
          )}
          {getFieldDecorator('owner_wechat', {
            rules: [{ required: true, message: '请输入微信号' }],
          })(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="微信"
              placeholder="请输入微信号"
              inputProps={{ style: styles.inputItem.input }}
              error={getFieldError('owner_wechat')}
            />,
          )}
          {getFieldDecorator('owner_card', {
            rules: [{ required: true, message: '请上传名片' }],
          })(
            <InputItem
              style={styles.inputItem.container}
              wrapperStyle={{ alignItems: 'flex-start' }}
              titleStyle={styles.inputItem.title}
              title="名片"
              placeholder="请上传名片"
              inputProps={{ style: styles.inputItem.input }}
              contentWrapperStyle={{ alignSelf: 'flex-end' }}
              renderContent={({ value }) => (
                <Image
                  style={styles.image}
                  source={
                    value
                      ? { uri: value }
                      : require('asset/project_create/business_card.png')
                  }
                />
              )}
              onPress={this.handleBusinessCardPress}
              error={getFieldError('owner_card')}
            />,
          )}
          <View style={styles.notice.container}>
            <Text style={styles.notice.text}>
              以上信息均用作审核使用，平台保证您的信息安全
            </Text>
          </View>
        </EnhancedScroll>
      </View>
    );
  }
}

export default ClaimProject;
