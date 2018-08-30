import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import NotificationItem from 'component/notification/item';

import styles from './style';

@connect(({ notification, loading }) => ({
  data: R.pathOr([], ['list'])(notification),
  loading: loading.effects['notification/fetch'],
}))
export default class NotificationCenter extends Component {
  requestData = (page, size, callback) => {
    this.props.dispatch({
      type: 'notification/fetch',
    });
  };

  handleItemPress = item => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'NotificationDetail',
        params: {
          id: item.id,
        },
      }),
    );
  };

  renderItem = ({ item }) => (
    <NotificationItem onPress={this.handleItemPress(item)} />
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
