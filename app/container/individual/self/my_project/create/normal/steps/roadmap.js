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
  roadmap: R.path(['current', 'roadmap'])(project_create),
}))
@createForm({
  onValuesChange: ({ dispatch }, changed, all) => {
    dispatch({
      type: 'project_create/saveCurrent',
      payload: all,
    });
  },
  mapPropsToFields: ({ roadmap }) => {
    return R.addIndex(R.reduce)(
      (acc, v, i) => ({
        ...acc,
        [`roadmap[${i}]`]: R.pipe(
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
    )(roadmap);
  },
})
class RoadMap extends PureComponent {
  handleAddMore = () => {
    const { roadmap } = this.props;

    LayoutAnimation.easeInEaseOut();
    this.props.dispatch({
      type: 'project_create/saveCurrent',
      payload: {
        roadmap: R.concat(roadmap, [{}]),
      },
    });
  };

  handleDelete = index => () => {
    const { roadmap } = this.props;

    LayoutAnimation.easeInEaseOut();
    this.props.dispatch({
      type: 'project_create/saveCurrent',
      payload: {
        roadmap: R.remove(index, 1)(roadmap),
      },
    });
  };

  handleTypePress = () => {};

  renderForm = (value, index) => {
    const { getFieldDecorator } = this.props.form;
    return (
      <View key={`${index}`}>
        <View style={styles.formTitle.container}>
          <Text style={styles.formTitle.text}>事件 {index + 1}</Text>
        </View>
        {getFieldDecorator(`roadmap[${index}].date`)(
          <InputItem
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="时间点"
            placeholder="请输入时间点"
            inputProps={{ style: styles.inputItem.input }}
          />,
        )}
        {getFieldDecorator(`roadmap[${index}].content`)(
          <InputItem
            style={styles.inputItem.container}
            titleStyle={styles.inputItem.title}
            title="事件或规划"
            placeholder="请输入项目规划"
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
    const { roadmap } = this.props;
    return (
      <Wrapper>
        <EnhancedScroll>
          {R.addIndex(R.map)(this.renderForm)(roadmap)}
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

export default RoadMap;
