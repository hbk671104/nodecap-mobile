import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { TabView, TabBar } from 'react-native-tab-view';
import { NavigationActions } from 'react-navigation';

import { hasPermission } from 'component/auth/permission/lock';
import NavBar from 'component/navBar';
import SearchBarDisplay from 'component/searchBar/display';
import styles from './style';

@connect(({ resource }) => ({
  routes: resource.types,
}))
class Resources extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'all', title: '全部' },
      ...this.props.routes.map(r => ({
        key: r.key,
        title: r.name,
      })),
    ],
  };

  handleIndexChange = index => {
    // const subModuleName = () => {
    //   switch (index) {
    //     case 0:
    //       return '已投项目';
    //     case 1:
    //       return '未投项目';
    //     default:
    //       return null;
    //   }
    // };
    this.setState({ index }, () => {
      // this.props.track('Tab切换', { subModuleName: subModuleName() });
    });
  };

  handleSearchPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ResourceSearch',
      }),
    );
  };

  renderHeader = props => {
    return (
      <NavBar
        gradient
        back
        renderTitle={() => (
          <View style={styles.searchBar.container}>
            <SearchBarDisplay
              title="请输入人脉关键字搜索"
              onPress={this.handleSearchPress}
            />
          </View>
        )}
        renderBottom={() => (
          <TabBar
            {...props}
            scrollEnabled
            style={styles.tabBar.container}
            tabStyle={styles.tabBar.tab}
            labelStyle={styles.tabBar.label}
            indicatorStyle={styles.tabBar.indicator}
          />
        )}
      />
    );
  };

  renderScene = ({ route }) => {
    return null;
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

export default Resources;
