import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { createForm, createFormField } from 'rc-form';
import R from 'ramda';
import { Toast } from 'antd-mobile';

import PickerSelect from 'component/picker';
import EnhancedScroll from 'component/enhancedScroll';
import InputItem from 'component/inputItem';
import { launchImagePicker } from 'utils/imagepicker';
import { uploadImage } from 'services/upload';

import Wrapper from './index';
import styles from './style';

@connect(({ institution_create, filter, global }) => ({
  current: R.pathOr({}, ['current'])(institution_create),
}))
@createForm({
  onValuesChange: ({ dispatch, current }, changed) => {
    dispatch({
      type: 'project_create/saveCurrent',
      payload: {
        ...changed,
      },
    });
  },
  mapPropsToFields: ({ current }) => {
    return R.pipe(
      R.keys,
      R.reduce(
        (acc, key) => ({
          ...acc,
          [key]: createFormField({
            value: current[key],
          }),
        }),
        {},
      ),
    )(current);
  },
})
class BasicInfo extends PureComponent {
  state = {
    barStyle: 'light-content',
  };

  handleUpload = async response => {
    Toast.loading('上传中...', 0);
    const { url } = await uploadImage({
      image: response,
      type: 'avatar',
    });
    Toast.hide();

    this.props.form.setFieldsValue({
      icon: url,
    });
  };

  handleLogoPress = () => {
    this.setState({ barStyle: 'dark-content' }, () => {
      launchImagePicker(response => {
        this.setState({ barStyle: 'light-content' }, () => {
          if (!response.didCancel && !response.error) {
            this.handleUpload(response);
          }
        });
      });
    });
  };

  // handleWhitepaperPress = () => {};

  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;
    return (
      <Wrapper {...this.props} barStyle={this.state.barStyle}>
        <EnhancedScroll>
          {getFieldDecorator('type', {
            rules: [
              {
                required: true,
                message: '请选择机构类型',
              },
            ],
          })(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              contentWrapperStyle={{ alignSelf: 'flex-end' }}
              title="类型"
              placeholder="请选择社区类型"
              showArrow
              renderContent={({ onChange, value: v }) => (
                <View style={{ flex: 1 }}>
                  <PickerSelect
                    hideIcon
                    placeholder={{
                      label: '请选择社区类型',
                      value: null,
                    }}
                    // data={options.map(o => ({ label: o, value: o }))}
                    onChange={onChange}
                    value={v}
                  />
                </View>
              )}
              inputProps={{ style: styles.inputItem.input }}
              error={getFieldError('type')}
            />,
          )}
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入机构名称',
              },
            ],
          })(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="名称"
              placeholder="请输入机构名称"
              inputProps={{ style: styles.inputItem.input }}
              error={getFieldError('name')}
            />,
          )}
          {getFieldDecorator('icon', {
            rules: [{ required: true, message: '请上传 Logo' }],
          })(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              contentWrapperStyle={{ alignSelf: 'flex-end' }}
              title="Logo"
              placeholder="请上传 Logo"
              showArrow
              renderContent={({ value }) => (
                <Image
                  style={styles.avatar}
                  source={
                    value
                      ? { uri: value }
                      : require('asset/project_create/logo_placeholder.png')
                  }
                />
              )}
              inputProps={{ style: styles.inputItem.input }}
              onPress={this.handleLogoPress}
              error={getFieldError('icon')}
            />,
          )}
          {/* {getFieldDecorator('white_paper')(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              contentWrapperStyle={{ alignSelf: 'flex-end' }}
              title="白皮书"
              placeholder="请上传白皮书"
              showArrow
              renderContent={() => (
                <Text style={styles.inputItem.greyOutText}>请上传白皮书</Text>
              )}
              inputProps={{ style: styles.inputItem.input }}
              onPress={this.handleWhitepaperPress}
            />,
          )} */}
          {getFieldDecorator('homepages')(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="官网"
              placeholder="请输入机构官网"
              inputProps={{ style: styles.inputItem.input }}
            />,
          )}
        </EnhancedScroll>
      </Wrapper>
    );
  }
}

export default BasicInfo;
