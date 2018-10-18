import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { createForm, createFormField } from 'rc-form';
import R from 'ramda';

import Input from 'component/uikit/textInput';
import { InputError } from 'component/inputItem';
import Wrapper from './index';
import styles from './style';

@connect(({ project_create }) => ({
  current: R.pathOr({}, ['current'])(project_create),
}))
@createForm({
  onValuesChange: ({ dispatch }, changed) => {
    dispatch({
      type: 'project_create/saveCurrent',
      payload: changed,
    });
  },
  mapPropsToFields: ({ current }) =>
    R.pipe(
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
    )(current),
})
class Description extends PureComponent {
  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;
    return (
      <Wrapper {...this.props}>
        {getFieldDecorator('description', {
          rules: [
            {
              required: true,
              message: '请输入项目简介',
            },
          ],
        })(
          <Input
            autoFocus
            style={{ margin: 12, lineHeight: 20 }}
            multiline
            placeholder="项目主要的解决的问题是？可以从这几个方面来介绍"
            placeholderTextColor="#9B9B9B"
          />,
        )}
        <View style={styles.error.container}>
          <InputError error={getFieldError('description')} />
        </View>
      </Wrapper>
    );
  }
}

export default Description;
