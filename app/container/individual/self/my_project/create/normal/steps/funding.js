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
  handleStartPress = () => {};

  handleEndPress = () => {};

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Wrapper>
        <EnhancedScroll>
          {getFieldDecorator('start_at')(
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
                  maxDate={null}
                />
              )}
              showArrow
              inputProps={{ style: styles.inputItem.input }}
            />,
          )}
          {getFieldDecorator('end_at')(
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
                  maxDate={null}
                />
              )}
              showArrow
              inputProps={{ style: styles.inputItem.input }}
            />,
          )}
          {getFieldDecorator('soft_cap')(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="软顶"
              placeholder="请输入募资软顶"
              inputProps={{ style: styles.inputItem.input }}
            />,
          )}
          {getFieldDecorator('hard_cap')(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="硬顶"
              placeholder="请输入募资硬顶"
              inputProps={{ style: styles.inputItem.input }}
            />,
          )}
          {getFieldDecorator('token_accepted')(
            <InputItem
              style={styles.inputItem.container}
              titleStyle={styles.inputItem.title}
              title="募集币种"
              placeholder="请输入募集币种"
              inputProps={{ style: styles.inputItem.input }}
            />,
          )}
        </EnhancedScroll>
      </Wrapper>
    );
  }
}

export default Funding;
