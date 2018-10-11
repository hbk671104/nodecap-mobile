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
  count: R.pathOr(0, ['list', 'count'])(public_project),
  params: R.pathOr({}, ['list', 'params'])(public_project),
  loading: loading.effects['public_project/fetch'],
}))
export default class ProjectListFilter extends Component {
  handleSelection = ({ value, key }) => {
    const { params } = this.props;
    this.props.dispatch({
      type: 'public_project/fetchCount',
      params: {
        ...params,
        [key]: selection(params, { key, value }),
      },
    });
  };

  handleConfirmPress = () => {
    const { params } = this.props;
    this.props.dispatch({
      type: 'public_project/fetch',
      params,
      callback: () => {
        this.props.closeDrawer();
      },
    });
  };

  handleResetPress = () => {
    this.props.dispatch({
      type: 'public_project/resetFilterParam',
    });
  };

  handleAllPress = key => () => {
    const { params } = this.props;
    this.props.dispatch({
      type: 'public_project/fetchCount',
      params: {
        ...params,
        [key]: '',
      },
    });
  };

  render() {
    const { institution, coinTag, params } = this.props;

    const industry_id = R.pathOr('', ['industry_id'])(params);
    const tag_id = R.pathOr('', ['tag_id'])(params);

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>筛选条件</Text>
          <FilterGroup
            title="知名机构"
            data={institution}
            selection={R.isEmpty(industry_id) ? [] : R.split(',')(industry_id)}
            onSelect={value =>
              this.handleSelection({ value, key: 'industry_id' })
            }
            onAllPress={this.handleAllPress('industry_id')}
          />
          <View style={styles.separator} />
          <FilterGroup
            title="领域"
            data={coinTag}
            selection={R.isEmpty(tag_id) ? [] : R.split(',')(tag_id)}
            onSelect={value => this.handleSelection({ value, key: 'tag_id' })}
            onAllPress={this.handleAllPress('tag_id')}
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
