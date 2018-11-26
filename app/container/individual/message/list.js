import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import CategoryItem from 'component/hotnode_index/category_item';
import Header from 'component/hotnode_index/header';
import styles from './style';

@global.bindTrack({
  page: '消息中心',
  name: 'App_MessageCenterOperation',
  subModuleName: '消息列表',
})
@connect(({ message_center, loading }, { type }) => ({
  data: R.pathOr([], [type, 'data'])(message_center),
  pagination: R.path([type, 'pagination'])(message_center),
}))
class MessageList extends PureComponent {
  componentDidMount() {
    this.props.track('进入');
  }

  renderItem = ({ item }) => null;

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
