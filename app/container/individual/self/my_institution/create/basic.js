import React, { PureComponent } from 'react';
import { Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { createForm, createFormField } from 'rc-form';
import R from 'ramda';
import { Toast } from 'antd-mobile';

import EnhancedScroll from 'component/enhancedScroll';
import InputItem from 'component/inputItem';
import { launchImagePicker } from 'utils/imagepicker';
import { uploadImage } from 'services/upload';

import Wrapper from './index';
import styles from './style';

@connect(({ project_create, filter, global }) => ({
  current: R.pathOr({}, ['current'])(project_create),
  coinTag: R.pathOr([], ['coinTag', 'data'])(filter),
  purpose: R.pathOr([], ['constants', 'purpose'])(global),
}))
@createForm({
  onValuesChange: ({ dispatch, current }, changed) => {
    const purpose = R.path(['purpose'])(changed);
    const store_purpose = R.pathOr([], ['purpose'])(current);
    dispatch({
      type: 'project_create/saveCurrent',
      payload: {
        ...changed,
        ...(R.isNil(purpose)
          ? {}
          : {
              purpose: R.contains(purpose)(store_purpose)
                ? R.filter(p => p !== purpose)(store_purpose)
                : [...store_purpose, purpose],
            }),
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

  handleTagPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'CreateMyProjectTagSelect',
      }),
    );
  };

  // handleWhitepaperPress = () => {};

  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;
    return (
      <Wrapper {...this.props} barStyle={this.state.barStyle}>
        <EnhancedScroll>
          {getFieldDecorator('symbol', {
            rules: [
              {
                required: true,
                message: '请输入项目 Token 简称',
              },
            ],
          })(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="Token 简称"
              placeholder="请输入项目 Token 简称"
              inputProps={{ style: styles.inputItem.input }}
              error={getFieldError('symbol')}
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
          {getFieldDecorator('tags', {
            rules: [
              {
                required: true,
                message: '请选择标签/领域',
              },
            ],
          })(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              contentWrapperStyle={{ marginLeft: 12, alignSelf: 'flex-end' }}
              title="标签/领域"
              placeholder="请选择标签/领域"
              showArrow
              renderContent={({ value }) => {
                const { coinTag } = this.props;
                return (
                  <Text
                    style={[
                      styles.inputItem.greyOutText,
                      !R.isEmpty(value) && styles.inputItem.valueText,
                    ]}
                  >
                    {R.isEmpty(value)
                      ? '请选择标签/领域'
                      : R.pipe(
                          R.map(v => {
                            const item = R.find(i => i.id === v)(coinTag);
                            return item.name;
                          }),
                          R.join('、'),
                        )(value)}
                  </Text>
                );
              }}
              inputProps={{ style: styles.inputItem.input }}
              onPress={this.handleTagPress}
              error={getFieldError('tags')}
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
              placeholder="请输入官网"
              inputProps={{ style: styles.inputItem.input }}
            />,
          )}
          {getFieldDecorator('country_origin')(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="国别"
              placeholder="请输入国别"
              inputProps={{ style: styles.inputItem.input }}
            />,
          )}
        </EnhancedScroll>
      </Wrapper>
    );
  }
}

export default BasicInfo;
