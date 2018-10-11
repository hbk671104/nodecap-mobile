import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { NavigationActions } from 'react-navigation';

import { setStatusBar } from 'component/uikit/statusBar';
import List from 'component/uikit/list';
import FavorItem from 'component/favored/item';

import { handleSelection as selection } from 'utils/utils';
import Header from './header';
import styles from '../style';

@connect(({ public_project, loading }) => ({
  data: R.pathOr([], ['list', 'index', 'data'])(public_project),
  pagination: R.pathOr(null, ['list', 'index', 'pagination'])(public_project),
  count: R.pathOr(0, ['list', 'count'])(public_project),
  params: R.pathOr({}, ['list', 'params'])(public_project),
  loading: loading.effects['public_project/fetch'],
}))
export default class ProjectList extends Component {
  requestData = (page, size) => {
    const { params } = this.props;
    this.props.dispatch({
      type: 'public_project/fetch',
      params: {
        ...params,
        currentPage: page,
        pageSize: size,
      },
    });
  };

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

  handleItemPress = item => () => {
    this.props.track('点击进入详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PublicProjectDetail',
        params: {
          item,
        },
      }),
    );
  };

  handleFilterPress = () => {
    setStatusBar('dark-content');
    this.props.dispatch(
      NavigationActions.setParams({
        params: { tabBarVisible: false },
        key: 'ProjectRepo',
      }),
    );

    this.props.drawerRef.openDrawer();
  };

  renderItem = ({ item }) => (
    <FavorItem data={item} onPress={this.handleItemPress(item)} />
  );

  renderSeparator = () => <View style={styles.separator} />;

  renderHeader = () => {
    const progress = R.pathOr('', ['progress'])(this.props.params);
    return (
      <Header
        {...this.props}
        selection={R.isEmpty(progress) ? [] : R.split(',')(progress)}
        onFilterPress={this.handleFilterPress}
        onSelect={value => this.handleSelection({ value, key: 'progress' })}
      />
    );
  };

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <View style={styles.container}>
        <List
          contentContainerStyle={styles.listContainer}
          action={this.requestData}
          data={data}
          pagination={pagination}
          loading={loading}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
          renderHeader={this.renderHeader}
        />
      </View>
    );
  }
}
