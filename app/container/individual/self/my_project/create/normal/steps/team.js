import React, { PureComponent } from 'react';
import { View, Text, Image, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { createForm, createFormField } from 'rc-form';
import R from 'ramda';
import { Toast } from 'antd-mobile';

import EnhancedScroll from 'component/enhancedScroll';
import Touchable from 'component/uikit/touchable';
import InputItem from 'component/inputItem';
import { launchImagePicker } from 'utils/imagepicker';
import { uploadImage } from 'services/upload';

import Wrapper from './index';
import styles from './style';

@connect(({ project_create }) => ({
  members: R.path(['current', 'members'])(project_create),
}))
@createForm({
  onValuesChange: ({ dispatch }, changed, all) => {
    dispatch({
      type: 'project_create/saveCurrent',
      payload: all,
    });
  },
  mapPropsToFields: ({ members }) => {
    return R.addIndex(R.reduce)(
      (acc, v, i) => ({
        ...acc,
        [`members[${i}]`]: R.pipe(
          R.keys,
          R.reduce(
            (accu, key) => ({
              ...accu,
              [key]: createFormField({
                value: v[key],
              }),
            }),
            {},
          ),
        )(v),
      }),
      {},
    )(members);
  },
})
class Team extends PureComponent {
  state = {
    barStyle: 'light-content',
  };

  handleUpload = async (index, response) => {
    Toast.loading('上传中...', 0);
    const { url } = await uploadImage({
      image: response,
      type: 'avatar',
    });
    Toast.hide();

    this.props.form.setFieldsValue({
      [`members[${index}].profile_pic`]: url,
    });
  };

  handleLogoPress = index => () => {
    this.setState({ barStyle: 'dark-content' }, () => {
      launchImagePicker(response => {
        this.setState({ barStyle: 'light-content' }, () => {
          if (!response.didCancel && !response.error) {
            this.handleUpload(index, response);
          }
        });
      });
    });
  };

  handleAddMore = () => {
    const { members } = this.props;

    LayoutAnimation.easeInEaseOut();
    this.props.dispatch({
      type: 'project_create/saveCurrent',
      payload: {
        members: R.concat(members, [{}]),
      },
    });
  };

  handleDelete = index => () => {
    const { members } = this.props;

    LayoutAnimation.easeInEaseOut();
    this.props.dispatch({
      type: 'project_create/saveCurrent',
      payload: {
        members: R.remove(index, 1)(members),
      },
    });
  };

  renderForm = (value, index) => {
    const { getFieldDecorator, getFieldError } = this.props.form;
    return (
      <View key={`${index}`}>
        <View style={styles.formTitle.container}>
          <Text style={styles.formTitle.text}>成员 {index + 1}</Text>
        </View>
        {getFieldDecorator(`members[${index}].name`, {
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
            error={getFieldError(`members[${index}].name`)}
          />,
        )}
        {getFieldDecorator(`members[${index}].profile_pic`)(
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
            onPress={this.handleLogoPress(index)}
          />,
        )}
        {getFieldDecorator(`members[${index}].title`, {
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
            error={getFieldError(`members[${index}].title`)}
          />,
        )}
        {getFieldDecorator(`members[${index}].mobile`)(
          <InputItem
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="手机号"
            placeholder="请输入成员手机号"
            inputProps={{
              style: styles.inputItem.input,
              keyboardType: 'number-pad',
            }}
            error={getFieldError(`members[${index}].mobile`)}
          />,
        )}
        {getFieldDecorator(`members[${index}].wechat`)(
          <InputItem
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="微信"
            placeholder="请输入成员微信"
            inputProps={{ style: styles.inputItem.input }}
            error={getFieldError(`members[${index}].wechat`)}
          />,
        )}
        {getFieldDecorator(`members[${index}].linkedIn_url`)(
          <InputItem
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="LinkedIn"
            placeholder="请输入成员LinkedIn"
            inputProps={{ style: styles.inputItem.input }}
          />,
        )}
        {getFieldDecorator(`members[${index}].introduction`)(
          <InputItem
            vertical
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="简介"
            placeholder="请输入成员简介"
          />,
        )}
        {index > 0 && (
          <Touchable
            borderless
            style={styles.delete.container}
            onPress={this.handleDelete(index)}
          >
            <Text style={styles.delete.text}>删除</Text>
          </Touchable>
        )}
      </View>
    );
  };

  render() {
    const { members } = this.props;
    return (
      <Wrapper {...this.props} barStyle={this.state.barStyle}>
        <EnhancedScroll>
          {R.addIndex(R.map)(this.renderForm)(members)}
          <Touchable
            borderless
            style={styles.addMore.container}
            onPress={this.handleAddMore}
          >
            <Text style={styles.addMore.text}>继续添加 +</Text>
          </Touchable>
        </EnhancedScroll>
      </Wrapper>
    );
  }
}

export default Team;
