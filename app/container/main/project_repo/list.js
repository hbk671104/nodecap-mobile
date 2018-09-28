import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { NavigationActions } from 'react-navigation';

import List from 'component/uikit/list';
import FavorItem from 'component/favored/item';
import styles from './style';

@connect(({ public_project, loading }, { index }) => ({
  data: R.pathOr([], ['list', index, 'index', 'data'])(public_project),
  pagination: R.pathOr(null, ['list', index, 'index', 'pagination'])(
    public_project,
  ),
  loading: loading.effects['public_project/fetch'],
}))
export default class ProjectList extends Component {
  requestData = (page, size) => {
    const { progress } = this.props;
    this.props.dispatch({
      type: 'public_project/fetch',
      params: {
        progress,
        currentPage: page,
        pageSize: size,
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

  renderItem = ({ item }) => (
    <FavorItem data={item} onPress={this.handleItemPress(item)} />
  );

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
        />
      </View>
    );
  }
}
