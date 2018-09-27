import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import List from 'component/uikit/list';
import NavBar from 'component/navBar';

import MeetingItem from './item';
import styles from './style';

@global.bindTrack({
  page: '找会议',
  name: 'App_MeetingHuntOperation',
})
@connect(({ activity, loading }) => ({
  data: R.pathOr([], ['list', 'data'])(activity),
  pagination: R.pathOr(null, ['list', 'pagination'])(activity),
  loading: loading.effects['activity/fetch'],
}))
export default class MeetingList extends Component {
  requestData = (page, size) => {
    this.props.dispatch({
      type: 'activity/fetch',
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
        routeName: 'MeetingListRaw',
        params: {
          uri: item.detail_url,
          title: item.title,
        },
      }),
    );
  };

  renderItem = ({ item }) => (
    <MeetingItem data={item} onPress={this.handleItemPress(item)} />
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient back title="会议大全" />
        <List
          contentContainerStyle={styles.listContent}
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
