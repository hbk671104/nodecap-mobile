import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import InstitutionItem from 'component/institution/item';

import styles from './style';

@global.bindTrack({
  page: '投资机构列表',
  name: 'App_InstitutionOperation',
})
@connect(({ institution, loading }) => {
  return {
    data: R.pathOr([], ['list', 'data'])(institution),
    pagination: R.pathOr(null, ['list', 'pagination'])(institution),
    loading: loading.effects['institution/fetch'],
  };
})
export default class InstitutionReport extends Component {
  requestData = (page, size) => {
    this.props.dispatch({
      type: 'institution/fetch',
      payload: {
        currentPage: page,
        pageSize: size,
      },
    });
  };

  handleItemPress = item => () => {
    this.props.track('点击进入详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'InstitutionDetail',
        params: {
          id: item.id,
        },
      }),
    );
  };

  renderItem = ({ item }) => (
    <InstitutionItem data={item} onPress={this.handleItemPress(item)} />
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { data, loading, pagination } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient back title="机构" />
        <List
          contentContainerStyle={styles.list.content}
          action={this.requestData}
          loading={loading}
          data={data}
          pagination={pagination}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}
