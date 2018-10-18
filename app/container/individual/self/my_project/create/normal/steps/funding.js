import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { createForm, createFormField } from 'rc-form';
import R from 'ramda';

import EnhancedScroll from 'component/enhancedScroll';
import InputItem from 'component/inputItem';
import DatePicker from 'component/datePicker';

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
class Funding extends PureComponent {
  render() {
    const { getFieldDecorator, getFieldValue, getFieldError } = this.props.form;
    const start_at = getFieldValue('start_at');
    const end_at = getFieldValue('end_at');
    return (
      <Wrapper {...this.props}>
        <EnhancedScroll>
          {getFieldDecorator('start_at', {
            rules: [
              {
                required: true,
                message: '请选择开始时间',
              },
            ],
          })(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              contentWrapperStyle={{ alignSelf: 'flex-end' }}
              title="开始时间"
              placeholder="请选择开始时间"
              renderContent={({ onChange, value }) => (
                <DatePicker
                  style={{ flex: 1 }}
                  inputStyle={{ alignItems: 'flex-end' }}
                  onChange={onChange}
                  value={value}
                  maxDate={end_at || null}
                />
              )}
              showArrow
              inputProps={{ style: styles.inputItem.input }}
              error={getFieldError('start_at')}
            />,
          )}
          {getFieldDecorator('end_at', {
            rules: [
              {
                required: true,
                message: '请选择结束时间',
              },
            ],
          })(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              contentWrapperStyle={{ alignSelf: 'flex-end' }}
              title="结束时间"
              placeholder="请选择开始时间"
              renderContent={({ onChange, value }) => (
                <DatePicker
                  style={{ flex: 1 }}
                  inputStyle={{ alignItems: 'flex-end' }}
                  onChange={onChange}
                  value={value}
                  minDate={start_at || null}
                />
              )}
              showArrow
              inputProps={{ style: styles.inputItem.input }}
              error={getFieldError('end_at')}
            />,
          )}
          {getFieldDecorator('soft_cap', {
            rules: [
              {
                required: true,
                message: '请输入募资软顶',
              },
            ],
          })(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="软顶"
              placeholder="请输入募资软顶"
              inputProps={{ style: styles.inputItem.input }}
              error={getFieldError('soft_cap')}
            />,
          )}
          {getFieldDecorator('hard_cap', {
            rules: [
              {
                required: true,
                message: '请输入募资硬顶',
              },
            ],
          })(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="硬顶"
              placeholder="请输入募资硬顶"
              inputProps={{ style: styles.inputItem.input }}
              error={getFieldError('hard_cap')}
            />,
          )}
          {getFieldDecorator('token_accepted', {
            rules: [
              {
                required: true,
                message: '请输入募集币种',
              },
            ],
          })(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="募集币种"
              placeholder="请输入募集币种"
              inputProps={{ style: styles.inputItem.input }}
              error={getFieldError('token_accepted')}
            />,
          )}
        </EnhancedScroll>
      </Wrapper>
    );
  }
}

export default Funding;
