import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { createForm, createFormField } from 'rc-form';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';

import Demand from '../../component/demand';
import styles from './style';

@global.bindTrack({
  page: '创建项目领域选择',
  name: 'App_MyProjectCreateTagSelectOperation',
})
@connect(({ filter, project_create }) => ({
  data: R.pathOr([], ['coinTag', 'data'])(filter),
  current: R.path(['current'])(project_create),
}))
@createForm({
  onValuesChange: ({ dispatch, current }, changed) => {
    const tags = R.pathOr('', ['tags'])(changed);
    const store_tags = R.pathOr([], ['tags'])(current);
    dispatch({
      type: 'project_create/saveCurrent',
      payload: {
        ...changed,
        tags: R.contains(tags)(store_tags)
          ? R.filter(p => p !== tags)(store_tags)
          : [...store_tags, tags],
      },
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
class CreateProjectTagSelect extends Component {
  componentDidMount() {
    this.props.track('进入');
  }

  handleSavePress = () => {
    this.props.dispatch(NavigationActions.back());
  };

  render() {
    const { data } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <View style={styles.container}>
        <NavBar
          back
          gradient
          title="领域"
          renderRight={() => (
            <Touchable borderless onPress={this.handleSavePress}>
              <Text style={styles.navBar.right}>保存</Text>
            </Touchable>
          )}
        />
        <ScrollView>
          {getFieldDecorator('tags')(
            <Demand
              titleStyle={styles.selector.title}
              subtitleStyle={styles.selector.subtitle}
              containerStyle={styles.selector.container}
              itemContainerStyle={styles.selector.item.container}
              itemHighlightContainerStyle={styles.selector.item.highlight}
              data={data}
              title="项目领域"
              subtitle="请选择项目所属领域"
            />,
          )}
        </ScrollView>
      </View>
    );
  }
}

export default CreateProjectTagSelect;
