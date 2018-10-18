import React, { PureComponent } from 'react';
import { View, Text, Image, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { createForm, createFormField } from 'rc-form';
import R from 'ramda';

import EnhancedScroll from 'component/enhancedScroll';
import Touchable from 'component/uikit/touchable';
import InputItem from 'component/inputItem';

import Wrapper from './index';
import styles from './style';

@connect(({ project_create }) => ({
  social_network: R.path(['current', 'social_network'])(project_create),
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

  handleTypePress = () => {};

  renderForm = (value, index) => {
    const { getFieldDecorator } = this.props.form;
    return (
      <View key={`${index}`}>
        <View style={styles.formTitle.container}>
          <Text style={styles.formTitle.text}>社群 {index + 1}</Text>
        </View>
        {getFieldDecorator(`social_network[${index}].name`)(
          <InputItem
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            contentWrapperStyle={{ alignSelf: 'flex-end' }}
            title="类型"
            placeholder="请选择社区类型"
            showArrow
            renderContent={() => (
              <Text style={styles.inputItem.greyOutText}>请选择社区类型</Text>
            )}
            inputProps={{ style: styles.inputItem.input }}
            onPress={this.handleTypePress}
          />,
        )}
        {getFieldDecorator(`social_network[${index}].link_url`)(
          <InputItem
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="地址"
            placeholder="请输入社群地址"
            inputProps={{ style: styles.inputItem.input }}
          />,
        )}
        {getFieldDecorator(`social_network[${index}].fans_count`)(
          <InputItem
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="粉丝数"
            placeholder="请输入社群粉丝数"
            inputProps={{ style: styles.inputItem.input }}
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
