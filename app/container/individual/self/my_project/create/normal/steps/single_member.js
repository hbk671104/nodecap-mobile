import React, { PureComponent } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { createForm, createFormField } from 'rc-form';
import R from 'ramda';
import { Toast } from 'antd-mobile';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import EnhancedScroll from 'component/enhancedScroll';
import InputItem from 'component/inputItem';
import Touchable from 'component/uikit/touchable';
import { launchImagePicker } from 'utils/imagepicker';
import { uploadImage } from 'services/upload';

import styles from './style';

@connect(({ project_create, loading }, { navigation }) => {
  const index = navigation.getParam('index', 0);
  return {
    member: R.path(['current', 'members', index])(project_create),
    loading: loading.effects['project_create/editMember'],
  };
})
@createForm({
  mapPropsToFields: ({ member }) => {
    return R.pipe(
      R.keys,
      R.reduce(
        (accu, key) => ({
          ...accu,
          [key]: createFormField({
            value: member[key],
          }),
        }),
        {},
      ),
    )(member);
  },
})
class TeamMember extends PureComponent {
  handleUpload = async response => {
    Toast.loading('上传中...', 0);
    const { url } = await uploadImage({
      image: response,
      type: 'avatar',
    });
    Toast.hide();

    this.props.form.setFieldsValue({
      profile_pic: url,
    });
  };

  handleLogoPress = () => {
    launchImagePicker(response => {
      if (!response.didCancel && !response.error) {
        this.handleUpload(response);
      }
    });
  };

  handleSavePress = () => {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        // save
        const { member } = this.props;
        this.props.dispatch({
          type: 'project_create/editMember',
          id: member.id,
          payload: value,
          callback: success => {
            if (success) {
              this.props.dispatch(NavigationActions.back());
            }
          },
        });
      }
    });
  };

  renderForm = () => {
    const { getFieldDecorator, getFieldError } = this.props.form;
    return (
      <View>
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '请输入成员姓名',
            },
          ],
        })(
          <InputItem
            required
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="姓名"
            placeholder="请输入成员姓名"
            inputProps={{ style: styles.inputItem.input }}
            error={getFieldError('name')}
          />,
        )}
        {getFieldDecorator('profile_pic')(
          <InputItem
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            contentWrapperStyle={{ alignSelf: 'flex-end' }}
            title="头像"
            placeholder="请上传头像"
            showArrow
            renderContent={({ value: v }) => (
              <Image
                style={styles.avatar}
                source={
                  v
                    ? { uri: v }
                    : require('asset/project_create/logo_placeholder.png')
                }
              />
            )}
            inputProps={{ style: styles.inputItem.input }}
            onPress={this.handleLogoPress}
          />,
        )}
        {getFieldDecorator('title', {
          rules: [
            {
              required: true,
              message: '请输入成员职位',
            },
          ],
        })(
          <InputItem
            required
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="职位"
            placeholder="请输入成员职位"
            inputProps={{ style: styles.inputItem.input }}
            error={getFieldError('title')}
          />,
        )}
        {getFieldDecorator('mobile')(
          <InputItem
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="手机号"
            placeholder="请输入成员手机号"
            inputProps={{
              style: styles.inputItem.input,
              keyboardType: 'number-pad',
            }}
            error={getFieldError('mobile')}
          />,
        )}
        {getFieldDecorator('wechat')(
          <InputItem
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="微信"
            placeholder="请输入成员微信"
            inputProps={{ style: styles.inputItem.input }}
            error={getFieldError('wechat')}
          />,
        )}
        {getFieldDecorator('linkedIn_url')(
          <InputItem
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="LinkedIn"
            placeholder="请输入成员LinkedIn"
            inputProps={{ style: styles.inputItem.input }}
          />,
        )}
        {getFieldDecorator('introduction')(
          <InputItem
            vertical
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="简介"
            placeholder="请输入成员简介"
          />,
        )}
      </View>
    );
  };

  render() {
    const { loading } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <NavBar
          back
          barStyle="dark-content"
          title="编辑成员"
          renderRight={() => {
            if (loading) {
              return <ActivityIndicator color="white" />;
            }
            return (
              <Touchable borderless onPress={this.handleSavePress}>
                <Text style={styles.navBar.right}>保存</Text>
              </Touchable>
            );
          }}
        />
        <EnhancedScroll>{this.renderForm()}</EnhancedScroll>
      </View>
    );
  }
}

export default TeamMember;
