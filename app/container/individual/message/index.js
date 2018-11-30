import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { TabView, TabBar } from 'react-native-tab-view';
import { compose, withState } from 'recompose';

import NavBar from 'component/navBar';
import { NumberBadge } from 'component/badge';

import SessionList from './list/session';
import NotificationList from './list/notification';
import styles from './style';

@global.bindTrack({
  page: '消息中心',
  name: 'App_MessageCenterOperation',
})
@connect(({ message_center }) => ({
  session_unread: R.pipe(
    R.path(['session', 'data']),
    R.reduce((accu, d) => accu + d.unread, 0),
  )(message_center),
  notification_unread: 70,
}))
@compose(
  withState('index', 'setIndex', 0),
  withState('routes', 'setRoutes', [
    { key: 'session', title: '消息' },
    { key: 'notification', title: '通知' },
  ]),
)
class MessageWrapper extends PureComponent {
  componentDidMount() {
    this.props.track('进入');
  }

  handleIndexChange = index => {
    this.props.setIndex(index, () => {
      this.props.track('Tab切换', { subModuleName: index });
    });
  };

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'session':
        return <SessionList />;
      case 'notification':
        return <NotificationList />;
      default:
        return null;
    }
  };

  renderHeader = props => (
    <NavBar
      barStyle="dark-content"
      contentContainerStyle={styles.navBar}
      renderContent={() => (
        <TabBar
          {...props}
          useNativeDriver
          style={styles.tabBar.container}
          tabStyle={styles.tabBar.tab}
          indicatorStyle={styles.tabBar.indicator}
          labelStyle={styles.tabBar.label}
          renderBadge={({ route }) => {
            const session_unread = R.pathOr(0, ['session_unread'])(this.props);
            const notification_unread = R.pathOr(0, ['notification_unread'])(
              this.props,
            );
            return (
              <NumberBadge
                wrapperStyle={styles.tabBar.badge.wrapper}
                number={
                  route.key === 'session' ? session_unread : notification_unread
                }
              />
            );
          }}
        />
      )}
    />
  );

  render() {
    const { index, routes } = this.props;
    return (
      <View style={styles.container}>
        <TabView
          initialLayout={styles.initialLayout}
          navigationState={{
            index,
            routes,
          }}
          renderScene={this.renderScene}
          renderTabBar={this.renderHeader}
          onIndexChange={this.handleIndexChange}
        />
      </View>
    );
  }
}

export default MessageWrapper;
