import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

import List from 'component/uikit/list';
import NotificationItem from 'component/message_center/notification_item';
import styles from '../style';
import { NavigationActions } from 'react-navigation';
import Toast from 'antd-mobile/lib/toast';

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

  onPressItem = (item) => {
    if (R.compose(R.not, R.isEmpty, R.pathOr([], ['coinInfo']))(item)) {
      const coin = R.head()(R.pathOr([], ['coinInfo'])(item));
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'PortfolioDetail',
          params: {
            id: coin.id,
          },
        }),
      );
    } else if (R.compose(R.not, R.isEmpty, R.pathOr([], ['orgInfo']))(item)) {
      const org = R.head()(R.pathOr([], ['orgInfo'])(item));
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'InstitutionDetail',
          params: {
            id: org.id,
          },
        }),
      );
    } else {
      Toast.show('该用户暂无更多个人信息');
    }
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

  renderItem = ({ item }) => <NotificationItem onPress={this.onPressItem} data={item} />;

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
