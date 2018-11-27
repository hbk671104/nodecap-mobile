import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { TabView, TabBar } from 'react-native-tab-view';
import { compose, withState } from 'recompose';

import NavBar from 'component/navBar';
import { NumberBadge } from 'component/badge';

import MessageList from './list';
import styles from './style';

@global.bindTrack({
  page: '消息中心',
  name: 'App_MessageCenterOperation',
})
@connect(({ hotnode_index, loading }) => ({}))
@compose(
  withState('index', 'setIndex', 0),
  withState('routes', 'setRoutes', [
    { key: 'message', title: '消息' },
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

  renderScene = ({ route }) => <MessageList type={route.key} />;

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
          renderBadge={({ route }) => (
            <NumberBadge
              wrapperStyle={styles.tabBar.badge.wrapper}
              number={24}
            />
          )}
        />
      )}
    />
  );

  render() {
    const { index, routes, loading } = this.props;
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
