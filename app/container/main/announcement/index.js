import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { compose, withState, withProps } from 'recompose';

import ShareNews from './shareAnnouncement';
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
@compose(
  withState('showShareModal', 'toggleShareModal', false),
  withState('currentShareNews', 'setShareNews', ''),
)
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

  handleNewsSharePress = data => {
    this.props.setShareNews(data);
    this.props.toggleShareModal(true);
  };

  requestData = (page, size) => {
    this.props.dispatch({
      type: 'notification/fetch',
      refreshLastRead: true,
      payload: {
        currentPage: page,
        pageSize: size,
      },
    });
  };

  renderItem = ({ item }) => (
    <NotificationItem
      data={item}
      onPress={this.handleItemPress}
      onPressShare={() => this.handleNewsSharePress(item)}
    />
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
        <ShareNews
          visible={this.props.showShareModal}
          news={this.props.currentShareNews}
          onClose={() => {
            this.props.toggleShareModal(false);
            this.props.setShareNews('');
          }}
        />
      </View>
    );
  }
}
