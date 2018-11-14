import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { SafeAreaView } from 'react-navigation';

import { handleSelection as selection } from 'utils/utils';
import FilterGroup from './group';
import MiscGroup from './misc_group';
import FilterBottom from './bottom';
import { emitter } from '../index';
import styles from './style';

@global.bindTrack({
  page: '项目大全筛选',
  name: 'App_ProjectRepoFilterOperation',
})
@connect(({ global, filter, public_project, loading }) => ({
  institution: R.pathOr([], ['institution', 'data'])(filter),
  coinTag: R.pathOr([], ['coinTag', 'data'])(filter),
  regions: R.pathOr([], ['constants', 'regions'])(global),
  count: R.pathOr(0, ['list', 'count'])(public_project),
  params: R.pathOr({}, ['list', 'params'])(public_project),
  loading: loading.effects['public_project/fetch'],
}))
export default class ProjectListFilter extends Component {
  handleSelection = ({ value, name, key }) => {
    const { params, track } = this.props;
    track('筛选项点击', { name });
    this.props.dispatch({
      type: 'public_project/fetchCount',
      params: {
        ...params,
        [key]: selection(params, { key, value }),
      },
    });
  };

  handleMiscSelection = ({ value, name, key }) => {
    this.props.track('筛选项点击', { name });
    this.props.dispatch({
      type: 'public_project/fetchCount',
      params: {
        ...this.props.params,
        [key]: value,
      },
    });
  };

  handleConfirmPress = () => {
    emitter.emit('shouldScroll');
    const { params } = this.props;
    this.props.dispatch({
      type: 'public_project/fetch',
      params: {
        ...params,
        currentPage: 1,
        pageSize: 20,
      },
      refresh: true,
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

  handleMiscAllPress = () => {
    const { params } = this.props;
    this.props.dispatch({
      type: 'public_project/fetchCount',
      params: {
        ...params,
        is_reachable: 0,
        has_weekly_report: 0,
        has_rating: 0,
        has_white_paper: 0,
        is_renowned_industry: 0,
      },
    });
  };

  render() {
    const { institution, coinTag, regions, params } = this.props;

    const industry_id = R.pathOr('', ['industry_id'])(params);
    const tag_id = R.pathOr('', ['tag_id'])(params);
    const region_id = R.pathOr('', ['region_id'])(params);

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>筛选条件</Text>
          <MiscGroup
            title="亮点"
            selection={params}
            onSelect={this.handleMiscSelection}
            onAllPress={this.handleMiscAllPress}
          />
          <View style={styles.separator} />
          <FilterGroup
            title="知名机构"
            data={institution}
            selection={R.isEmpty(industry_id) ? [] : R.split(',')(industry_id)}
            onSelect={({ value, name }) =>
              this.handleSelection({ value, name, key: 'industry_id' })
            }
            onAllPress={this.handleAllPress('industry_id')}
          />
          <View style={styles.separator} />
          <FilterGroup
            title="领域"
            data={coinTag}
            selection={R.isEmpty(tag_id) ? [] : R.split(',')(tag_id)}
            onSelect={({ value, name }) =>
              this.handleSelection({ value, name, key: 'tag_id' })
            }
            onAllPress={this.handleAllPress('tag_id')}
          />
          <View style={styles.separator} />
          <FilterGroup
            title="国家/地区"
            data={regions}
            selection={R.isEmpty(region_id) ? [] : R.split(',')(region_id)}
            onSelect={({ value, name }) =>
              this.handleSelection({ value, name, key: 'region_id' })
            }
            onAllPress={this.handleAllPress('region_id')}
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
