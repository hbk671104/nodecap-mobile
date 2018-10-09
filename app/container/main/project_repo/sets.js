import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { NavigationActions } from 'react-navigation';

import List from 'component/uikit/list';
import FavorItem from 'component/favored/item';
import styles from './style';

@connect(({ coinSets, loading }, { set_id }) => ({
  data: R.pathOr([], ['coins', set_id, 'data'])(coinSets),
  pagination: R.pathOr(null, ['coins', set_id, 'pagination'])(
    coinSets,
  ),
  loading: loading.effects['coinSets/fetchCoins'],
}))
export default class CoinsInSet extends Component {
  requestData = (page, size) => {
    const { set_id } = this.props;
    this.props.dispatch({
      type: 'coinSets/fetchCoins',
      set_id,
      params: {
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
    <FavorItem
      data={item}
      onPress={this.handleItemPress(item)}
      afterFavor={() => this.requestData()}
    />
  );

  renderSeparator = () => <View style={styles.separator} />;

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
        />
      </View>
    );
  }
}
