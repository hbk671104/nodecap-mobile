import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import List from 'component/uikit/list';
import Item from 'component/message_center/item';
import Badge, { NumberBadge } from 'component/badge';
import styles from './style';

@global.bindTrack({
  page: '消息中心',
  name: 'App_MessageCenterOperation',
  subModuleName: '消息列表',
})
@connect(({ message_center, loading }, { type }) => ({
  data: R.pathOr([{ id: 1 }, { id: 2 }, { id: 3 }], [type, 'data'])(
    message_center,
  ),
  pagination: R.path([type, 'pagination'])(message_center),
}))
class MessageList extends PureComponent {
  componentDidMount() {
    this.props.track('进入');
  }

  handleItemPress = item => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'IMPage',
        params: {
          id: 0,
        },
      }),
    );
  };

  renderItem = ({ item }) => {
    const { type } = this.props;
    const in_notification = type === 'notification';
    return (
      <Item
        disabled={in_notification}
        data={item}
        onPress={this.handleItemPress(item)}
        renderBadge={() => {
          return in_notification ? (
            <Badge style={styles.item.badge.wrapper} size={8} />
          ) : (
            <NumberBadge wrapperStyle={styles.item.badge.wrapper} number={34} />
          );
        }}
      />
    );
  };

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <List
        contentContainerStyle={styles.listContent}
        // action={this.requestData}
        // loading={loading}
        pagination={pagination}
        data={data}
        renderItem={this.renderItem}
      />
    );
  }
}

export default MessageList;
