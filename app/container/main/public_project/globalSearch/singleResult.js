import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import List from 'component/uikit/list';
import InstitutionItem from 'component/institution/item';

import styles from './style';

@global.bindTrack({
  page: '找服务',
  name: 'App_ServiceOperation',
  subModuleName: '列表',
})
@connect(({ globalSearch, loading }, { type }) => {
  return {
    data: R.pathOr([], ['search', type, 'data'])(globalSearch),
    pagination: R.pathOr(null, ['search', type, 'pagination'])(globalSearch),
    loading: loading.effects[`globalSearch/${type}`],
  };
})
export default class SingleResult extends Component {
  requestData = (page, size) => {
    if (this.props.searchText) {
      this.props.dispatch({
        type: `globalSearch/${this.props.type}`,
        payload: {
          q: this.props.searchText,
          page,
          'per-page': size,
        },
      });
    }
  };

  renderItem = ({ item }) => (
    <this.props.item
      data={item}
      onPress={() => (this.props.itemOnPress ? this.props.itemOnPress(item) : {})}
    />
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { data, loading, pagination } = this.props;
    return (
      <View style={styles.container}>
        <List
          contentContainerStyle={styles.list.content}
          action={this.requestData}
          loading={loading}
          data={data}
          pagination={pagination}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
          keyboardDismissMode="on-drag"
        />
      </View>
    );
  }
}
