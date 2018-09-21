import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { TabView, TabBar } from 'react-native-tab-view';
import Touchable from 'component/uikit/touchable';

import NavBar from 'component/navBar';
import Notice from './list/notice';
import News from './list/news';
import Icon from 'component/uikit/icon';
import styles from './style';

@global.bindTrack({
  page: '通知中心',
  name: 'App_NotificationCenterOperation',
})
@connect(({ notification, loading, news }) => ({
  news: news.news,
  data: R.pathOr([], ['list', 'data'])(notification),
  pagination: R.pathOr(null, ['list', 'pagination'])(notification),
  lastNewsID: R.pathOr(null, ['payload'])(news),
  loading: loading.effects['notification/fetch'],
  newsLoading: loading.effects['news/index'],
}))
export default class NotificationCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.navigation.getParam('fromRecommendation') ? 1 : 0,
      routes: [
        { key: 'news', title: '快讯' },
        { key: 'notice', title: '上所公告' },
      ],
    };
  }

  handleIndexChange = index => {
    this.setState({ index });
  };

  renderHeader = props => (
    <NavBar
      gradient
      renderTitle={() => (
        <TabBar
          {...props}
          style={styles.tabBar.container}
          tabStyle={styles.tabBar.tab}
          labelStyle={styles.tabBar.label}
          indicatorStyle={styles.tabBar.indicator}
        />
      )}
    />
  );

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'notice':
        return <Notice {...this.props} />;
      case 'news':
        return <News {...this.props} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TabView
          initialLayout={styles.initialLayout}
          navigationState={{
            index: this.state.index,
            routes: this.state.routes,
          }}
          renderScene={this.renderScene}
          tabBarPosition="top"
          renderTabBar={this.renderHeader}
          onIndexChange={this.handleIndexChange}
        />
      </View>
    );
  }
}
