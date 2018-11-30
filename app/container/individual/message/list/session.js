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
  subModuleName: '消息列表',
})
@connect(({ message_center }) => ({
  data: R.pathOr([], ['session', 'data'])(message_center),
}))
class SessionList extends PureComponent {
  componentDidMount() {
    this.props.track('进入');
  }

  handleItemPress = item => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'IMPage',
        params: {
          id: R.path(['im_info', 'user_id'])(item),
        },
      }),
    );
  };

  renderItem = ({ item }) => (
    <SessionItem data={item} onPress={this.handleItemPress(item)} />
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { data } = this.props;
    return (
      <List
        disableRefresh
        contentContainerStyle={styles.listContent}
        data={data}
        renderItem={this.renderItem}
        renderSeparator={this.renderSeparator}
      />
    );
  }
}

export default SessionList;
