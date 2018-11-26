import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import List from 'component/uikit/list';
import Item from 'component/message_center/item';
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

  renderItem = ({ item }) => <Item data={item} />;

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
