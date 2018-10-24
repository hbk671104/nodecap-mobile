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
  page: '找服务',
  name: 'App_ServiceOperation',
  subModuleName: '列表',
})
@connect(({ service, loading }) => {
  return {
    data: R.pathOr(null, ['pr', 'list'])(service),
    pagination: R.pathOr(null, ['list', 'pagination'])(service),
    loading: loading.effects['institution/fetch'],
  };
})
export default class ServiceList extends Component {
  requestData = (page, size) => {};

  handleItemPress = item => () => {
    this.props.track('点击进入详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ServiceDetail',
        params: {
          id: item.id,
        },
        key: `ServiceDetail_${item.id}`,
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
