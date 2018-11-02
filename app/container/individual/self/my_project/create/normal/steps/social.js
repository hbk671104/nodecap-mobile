import React, { PureComponent } from 'react';
import { View, Text, LayoutAnimation, Platform } from 'react-native';
import { connect } from 'react-redux';
import { createForm, createFormField } from 'rc-form';
import R from 'ramda';

import EnhancedScroll from 'component/enhancedScroll';
import Touchable from 'component/uikit/touchable';
import InputItem from 'component/inputItem';
import PickerSelect from 'component/picker';

import Wrapper from './index';
import styles from './style';

@connect(({ project_create }) => ({
  social_network: R.path(['current', 'social_network'])(project_create),
  options: [
    'Telegram',
    'Twitter',
    'Facebook',
    'Reddit',
    'LinkedIn',
    'Medium',
    'YouTube',
  ],
}))
@createForm({
  onValuesChange: ({ dispatch }, changed, all) => {
    dispatch({
      type: 'project_create/saveCurrent',
      payload: all,
    });
  },
  mapPropsToFields: ({ social_network }) => {
    return R.addIndex(R.reduce)(
      (acc, v, i) => ({
        ...acc,
        [`social_network[${i}]`]: R.pipe(
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
    )(social_network);
  },
})
class Social extends PureComponent {
  handleAddMore = () => {
    const { social_network } = this.props;

    LayoutAnimation.easeInEaseOut();
    this.props.dispatch({
      type: 'project_create/saveCurrent',
      payload: {
        social_network: R.concat(social_network, [{}]),
      },
    });
  };

  handleDelete = index => () => {
    const { social_network } = this.props;

    LayoutAnimation.easeInEaseOut();
    this.props.dispatch({
      type: 'project_create/saveCurrent',
      payload: {
        social_network: R.remove(index, 1)(social_network),
      },
    });
  };

  renderForm = (value, index) => {
    const { options } = this.props;
    const { getFieldDecorator, getFieldError } = this.props.form;
    return (
      <View key={`${index}`}>
        <View style={styles.formTitle.container}>
          <Text style={styles.formTitle.text}>社群 {index + 1}</Text>
        </View>
        {getFieldDecorator(`social_network[${index}].name`, {
          rules: [
            {
              required: true,
              message: '请选择社区类型',
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
            renderContent={({ onChange, value: v }) => {
              if (Platform.OS === 'ios') {
                return (
                  <View style={{ flex: 1 }}>
                    <PickerSelect
                      hideIcon
                      placeholder={{
                        label: '请选择社区类型',
                        value: null,
                      }}
                      data={options.map(o => ({ label: o, value: o }))}
                      onChange={onChange}
                      value={v}
                    />
                  </View>
                );
              } else {
                return (
                  <PickerSelect
                    style={{
                      viewContainer: {
                        width: 200,
                        alignSelf: 'flex-end',
                      },
                    }}
                    hideIcon
                    placeholder={{
                      label: '请选择社区类型',
                      value: null,
                    }}
                    data={options.map(o => ({ label: o, value: o }))}
                    onChange={onChange}
                    value={v}
                  />
                );
              }
            }}
            inputProps={{ style: styles.inputItem.input }}
            error={getFieldError(`social_network[${index}].name`)}
          />,
        )}
        {getFieldDecorator(`social_network[${index}].link_url`, {
          rules: [
            {
              required: true,
              message: '请输入社群地址',
            },
          ],
        })(
          <InputItem
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="地址"
            placeholder="请输入社群地址"
            inputProps={{ style: styles.inputItem.input }}
            error={getFieldError(`social_network[${index}].link_url`)}
          />,
        )}
        {getFieldDecorator(`social_network[${index}].fans_count`)(
          <InputItem
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="粉丝数"
            placeholder="请输入社群粉丝数"
            inputProps={{
              style: styles.inputItem.input,
              keyboardType: 'number-pad',
            }}
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
    const { social_network } = this.props;
    return (
      <Wrapper {...this.props}>
        <EnhancedScroll>
          {R.addIndex(R.map)(this.renderForm)(social_network)}
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

export default Social;
