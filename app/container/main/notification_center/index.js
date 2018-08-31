import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import NotificationItem from 'component/notification/item';

import { getCurrentScreen } from '../../../router';
import styles from './style';

@connect(({ notification, loading, router }) => ({
  data: R.pathOr([], ['list'])(notification),
  loading: loading.effects['notification/fetch'],
  isCurrent: getCurrentScreen(router) === 'NotificationCenter',
}))
export default class NotificationCenter extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isCurrent) {
      this.props.dispatch({
        type: 'notification/clearBadge',
      });
    }
  }

  requestData = (page, size, callback) => {
    this.props.dispatch({
      type: 'notification/fetch',
    });
  };

  handleItemPress = id => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'NotificationDetail',
        params: {
          id,
        },
      }),
    );
  };

  renderItem = ({ item }) => (
    <NotificationItem data={item} onPress={this.handleItemPress} />
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { loading, data } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient title="项目动态" />
        <List
          action={this.requestData}
          loading={loading}
          data={data}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}
