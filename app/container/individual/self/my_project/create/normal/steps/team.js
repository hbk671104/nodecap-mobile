import React, { PureComponent } from 'react';
import { View, Text, Image, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { createForm, createFormField } from 'rc-form';
import R from 'ramda';

import EnhancedScroll from 'component/enhancedScroll';
import Touchable from 'component/uikit/touchable';
import InputItem from 'component/inputItem';
import { launchImagePicker } from 'utils/imagepicker';
import { deepCheckEmptyOrNull, nullOrEmpty } from 'utils/utils';

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
  handleLogoPress = () => {
    launchImagePicker(response => {
      if (!response.didCancel && !response.error) {
        // this.handleAvatarUpdate(response);
      }
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

  handleMultiFormValidation = (rule, value, callback) => {
    const { members } = this.props;
    const isNullOrEmpty = deepCheckEmptyOrNull(members);
    if (isNullOrEmpty) {
      callback();
      return;
    }

    if (nullOrEmpty(value)) {
      callback(null);
      return;
    }

    callback();
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
              validator: this.handleMultiFormValidation,
              message: '请输入成员姓名',
            },
          ],
        })(
          <InputItem
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
            renderContent={() => (
              <Image
                source={require('asset/project_create/logo_placeholder.png')}
              />
            )}
            inputProps={{ style: styles.inputItem.input }}
            onPress={this.handleLogoPress}
          />,
        )}
        {getFieldDecorator(`members[${index}].title`, {
          rules: [
            {
              validator: this.handleMultiFormValidation,
              message: '请输入成员职位',
            },
          ],
        })(
          <InputItem
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="职位"
            placeholder="请输入成员职位"
            inputProps={{ style: styles.inputItem.input }}
            error={getFieldError(`members[${index}].title`)}
          />,
        )}
        {getFieldDecorator(`members[${index}].mobile`, {
          rules: [
            {
              validator: this.handleMultiFormValidation,
              message: '请输入成员手机号',
            },
          ],
        })(
          <InputItem
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="手机号"
            placeholder="请输入成员手机号"
            inputProps={{ style: styles.inputItem.input }}
            error={getFieldError(`members[${index}].mobile`)}
          />,
        )}
        {getFieldDecorator(`members[${index}].wechat`, {
          rules: [
            {
              validator: this.handleMultiFormValidation,
              message: '请输入成员微信',
            },
          ],
        })(
          <InputItem
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="微信"
            placeholder="请输入成员微信"
            inputProps={{ style: styles.inputItem.input }}
            error={getFieldError(`members[${index}].wechat`)}
          />,
        )}
        {getFieldDecorator(`members[${index}].linkedin_url`)(
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
      <Wrapper {...this.props}>
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
