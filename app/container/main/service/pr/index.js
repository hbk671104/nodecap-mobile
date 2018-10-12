import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import ServiceItem from './item';

import styles from './style';

@global.bindTrack({
  page: '公关公司列表',
  name: 'App_ServiceOperation',
})
@connect(({ service, loading }) => {
  return {
    data: R.pathOr(null, ['pr', 'list'])(service),
    pagination: R.pathOr(null, ['list', 'pagination'])(service),
    loading: loading.effects['institution/fetch'],
  };
})
export default class InstitutionReport extends Component {
  requestData = (page, size) => {};

  handleItemPress = item => () => {
    this.props.track('点击进入详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PRServiceDetail',
        params: {
          id: item.id,
        },
        key: `PRServiceDetail_${item.id}`,
      }),
    );
  };

  renderItem = ({ item }) => (
    <ServiceItem data={item} onPress={this.handleItemPress(item)} />
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { data, loading, pagination } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient back title="公关服务" />
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
