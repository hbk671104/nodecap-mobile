import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../style';

import List from 'component/uikit/list';
import NotificationItem from 'component/notification/item';
import { NavigationActions } from 'react-navigation';

class Notice extends Component {
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
        <List
          action={this.requestData}
          loading={loading}
          pagination={pagination}
          data={data}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}

Notice.propTypes = {};
Notice.defaultProps = {};

export default Notice;
