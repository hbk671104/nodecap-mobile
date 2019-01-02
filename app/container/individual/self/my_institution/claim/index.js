import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { createForm, createFormField } from 'rc-form';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import { Toast, Flex } from 'antd-mobile';
import { withState, compose } from 'recompose';

import EnhancedScroll from 'component/enhancedScroll';
import NavBar from 'component/navBar';
import InputItem from 'component/inputItem';
import Touchable from 'component/uikit/touchable';
import { launchImagePicker } from 'utils/imagepicker';
import { uploadImage } from 'services/upload';

import Tip from './wrap';
import styles from './style';

@global.bindTrack({
  page: '创建我的机构认证',
  name: 'App_MyInstitutionClaimOperation',
})
@connect(({ institution_create }, props) => {
  const id = props.navigation.getParam('id');
  return {
    id,
    owner: R.pathOr({}, ['owner'])(institution_create),
  };
})
@createForm({
  onValuesChange: ({ dispatch }, changed) => {
    dispatch({
      type: 'institution_create/saveOwner',
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
@compose(
  withState('tipVisible', 'setTipVisible', ({ navigation }) => {
    const showTip = navigation.getParam('showTip', false);
    return showTip;
  }),
)
class ClaimInstitution extends Component {
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: 'ClaimMyInstitutionAvatarUpload',
            params: {
              id: this.props.id,
              values,
            },
          }),
        );
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;
    return (
      <View style={styles.container}>
        <NavBar
          barStyle="dark-content"
          back
          title="身份认证"
          wrapperStyle={styles.navBar.wrapper}
          renderRight={() => {
            if (this.props.submitting) {
              return <ActivityIndicator color="white" />;
            }
            return (
              <Touchable borderless onPress={this.handleSavePress}>
                <Text style={styles.navBar.right}>下一步</Text>
              </Touchable>
            );
          }}
        />
        <EnhancedScroll>
          {getFieldDecorator('owner_name', {
            rules: [{ required: true, message: '请输入姓名' }],
          })(
            <InputItem
              required
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="姓名"
              placeholder="请输入姓名"
              inputProps={{ style: styles.inputItem.input, autoFocus: true }}
              error={getFieldError('owner_name')}
            />,
          )}
          {getFieldDecorator('owner_title', {
            rules: [{ required: true, message: '请输入公司职位' }],
          })(
            <InputItem
              required
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="职位"
              placeholder="请输入公司职位"
              inputProps={{ style: styles.inputItem.input }}
              error={getFieldError('owner_title')}
            />,
          )}
          {/* {getFieldDecorator('owner_mobile')(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="手机"
              placeholder="请输入手机号码"
              inputProps={{
                style: styles.inputItem.input,
                keyboardType: 'number-pad',
              }}
              error={getFieldError('owner_mobile')}
            />,
          )} */}
          {getFieldDecorator('owner_wechat')(
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
              required
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
          <Flex style={styles.notice.container} justify="center">
            <Image source={require('asset/alert_icon.png')} />
            <Text style={styles.notice.text}>
              平台严格保证入驻项目及机构质量，以上信息便于平台帮您把关
            </Text>
          </Flex>
        </EnhancedScroll>
        <Tip {...this.props} />
      </View>
    );
  }
}

export default ClaimInstitution;
