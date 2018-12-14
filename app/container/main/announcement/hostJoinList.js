import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { compose, withState, withProps } from 'recompose';

import ShareNews from './shareAnnouncement';
import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import NotificationItem from 'component/notification/hostItem';
import { NavigationActions } from 'react-navigation';
import styles from './style';

@global.bindTrack({
  page: '入驻公告',
  name: 'App_HostJoinOperation',
})
@connect(({ notification, login, loading }) => ({
  data: R.pathOr([], ['insite_list', 'data'])(notification),
  pagination: R.pathOr(null, ['insite_list', 'pagination'])(notification),
  is_loggedin: !!login.token,
  loading: loading.effects['notification/fetchInSite'],
}))
@compose(
  withState('showShareModal', 'toggleShareModal', false),
  withState('currentShareNews', 'setShareNews', ''),
)
export default class HostJoinList extends Component {
  handleItemPress = id => {
    this.props.track('点击进入个人详情');
    if (!this.props.is_loggedin) {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      );
      return;
    }

    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'IMPage',
        params: {
          id,
        },
      }),
    );
  };

  requestData = (page, size) => {
    this.props.dispatch({
      type: 'notification/fetchInSite',
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
        <NavBar barStyle="dark-content" back title="最新公告" />
        <List
          action={this.requestData}
          loading={loading}
          pagination={pagination}
          data={data}
          renderItem={this.renderItem}
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
