import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import NotificationItem from 'component/notification/item';
import { NavigationActions } from 'react-navigation';
import styles from './style';

@global.bindTrack({
  page: '上所公告',
  name: 'App_ExchangeAnnoucementOperation',
})
@connect(({ notification, loading }) => ({
  data: R.pathOr([], ['list', 'data'])(notification),
  pagination: R.pathOr(null, ['list', 'pagination'])(notification),
  loading: loading.effects['notification/fetch'],
}))
export default class Announcement extends Component {
  handleItemPress = id => () => {
    this.props.track('点击进入详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'NotificationDetail',
        params: {
          id,
        },
      }),
    );
  };

  requestData = (page, size) => {
    this.props.dispatch({
      type: 'notification/fetch',
      payload: {
        currentPage: page,
        pageSize: size,
      },
    });
  };

  renderItem = ({ item }) => (
    <NotificationItem data={item} onPress={this.handleItemPress} />
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { loading, data, pagination } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient back title="上所公告" />
        <List
          action={this.requestData}
          loading={loading}
          pagination={pagination}
          data={data}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
          style={{
            backgroundColor: '#F9F9F9',
          }}
        />
      </View>
    );
  }
}
