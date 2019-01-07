import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import List from 'component/uikit/list';
import SessionItem from 'component/message_center/item';
import NotificationItem from 'component/message_center/notification_item';
import LoginPlaceholder from '../component/login';
import styles from '../style';

@global.bindTrack({
  page: '消息中心',
  name: 'App_MessageCenterOperation',
  subModuleName: '消息列表',
})
@connect(({ message_center, login }) => ({
  data: R.pathOr([], ['session', 'data'])(message_center),
  logged_in: !!login.token,
  loading: message_center.loading,
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
    const { data, logged_in, loading } = this.props;
    if (!logged_in) {
      return (
        <LoginPlaceholder
          image={require('asset/message_center/chat_image_1.png')}
          title="登录即可聊天"
          content="登录状态下，可联系项目及所有投资、项目方"
        />
      );
    }
    return (
      <List
        loading={loading}
        action={() => null}
        contentContainerStyle={styles.listContent}
        data={data}
        renderItem={this.renderItem}
        renderSeparator={this.renderSeparator}
      />
    );
  }
}

export default SessionList;
