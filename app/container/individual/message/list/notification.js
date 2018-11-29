import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import List from 'component/uikit/list';
import SessionItem from 'component/message_center/item';
import NotificationItem from 'component/message_center/notification_item';
import styles from '../style';

@global.bindTrack({
  page: '消息中心',
  name: 'App_MessageCenterOperation',
  subModuleName: '通知列表',
})
@connect(({ message_center, loading }) => ({
  data: R.pathOr([], ['notification', 'data'])(message_center),
  pagination: R.path(['notification', 'pagination'])(message_center),
  loading: loading.effects['message_center/fetchNotification'],
}))
class NotificationList extends PureComponent {
  componentDidMount() {
    this.props.track('进入');
  }

  requestData = (page, size) => {
    this.props.dispatch({
      type: 'message_center/fetchNotification',
      params: {
        page,
        'p-page': size,
      },
    });
  };

  renderItem = ({ item }) => <NotificationItem data={item} />;

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <List
        contentContainerStyle={styles.listContent}
        action={this.requestData}
        loading={loading}
        pagination={pagination}
        data={data}
        renderItem={this.renderItem}
        renderSeparator={this.renderSeparator}
      />
    );
  }
}

export default NotificationList;
