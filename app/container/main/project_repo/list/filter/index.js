import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { SafeAreaView } from 'react-navigation';

import { handleSelection as selection } from 'utils/utils';
import FilterGroup from './group';
import FilterBottom from './bottom';
import styles from './style';

@connect(({ filter, public_project, loading }) => ({
  institution: R.pathOr([], ['institution', 'data'])(filter),
  coinTag: R.pathOr([], ['coinTag', 'data'])(filter),
  pagination: R.pathOr(null, ['list', 'index', 'pagination'])(public_project),
  params: R.pathOr({}, ['list', 'params'])(public_project),
  loading: loading.effects['public_project/fetch'],
}))
export default class ProjectListFilter extends Component {
  handleSelection = ({ value, key }) => {
    const { params } = this.props;
    this.props.dispatch({
      type: 'public_project/fetch',
      params: {
        ...params,
        [key]: selection(params, { key, value }),
      },
    });
  };

  handleConfirmPress = () => {
    // console.log(this.props);
    // this.props.drawerRef.closeDrawer();
  };

  handleResetPress = () => {
    this.props.dispatch({
      type: 'public_project/resetListParam',
    });
  };

  render() {
    const { institution, coinTag, params } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>筛选条件</Text>
          <FilterGroup
            title="知名机构"
            data={institution}
            selection={R.pipe(
              R.pathOr('', ['industry_id']),
              R.split(','),
            )(params)}
            onSelect={value =>
              this.handleSelection({ value, key: 'industry_id' })
            }
          />
          <View style={styles.separator} />
          <FilterGroup
            title="领域"
            data={coinTag}
            selection={R.pipe(
              R.pathOr('', ['tag_id']),
              R.split(','),
            )(params)}
            onSelect={value => this.handleSelection({ value, key: 'tag_id' })}
          />
        </ScrollView>
        <FilterBottom
          {...this.props}
          onResetPress={this.handleResetPress}
          onConfirmPress={this.handleConfirmPress}
        />
      </SafeAreaView>
    );
  }
}
