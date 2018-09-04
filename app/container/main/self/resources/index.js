import React, { Component } from 'react';
import { View, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { TabView, TabBar } from 'react-native-tab-view';
import { compose, withState } from 'recompose';
import { NavigationActions } from 'react-navigation';

import { hasPermission } from 'component/auth/permission/lock';
import NavBar from 'component/navBar';
import AddButton from 'component/add';
import SearchBarDisplay from 'component/searchBar/display';
import ResourceList from './list';
import styles from './style';

@global.bindTrack({
  page: '人脉资源库',
  name: 'App_HumanResourceOperation',
})
@compose(withState('addButtonVisible', 'setAddButtonVisible', true))
@connect(({ resource }) => ({
  routes: resource.types,
}))
class Resources extends Component {
  state = {
    index: 0,
    routes: [
      { key: '0', title: '全部' },
      ...this.props.routes.map(r => ({
        key: `${r.id}`,
        title: r.name,
      })),
    ],
  };

  handleIndexChange = index => {
    this.setState({ index }, () => {
      this.props.track('Tab切换', { subModuleName: index });
    });
  };

  handleMomentumScrollBegin = () => {
    LayoutAnimation.easeInEaseOut();
    this.props.setAddButtonVisible(false);
  };

  handleMomentumScrollEnd = () => {
    LayoutAnimation.easeInEaseOut();
    this.props.setAddButtonVisible(true);
  };

  handleSearchPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ResourceSearch',
      }),
    );
  };

  handleAddPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ResourceAdd',
      }),
    );
  };

  renderHeader = props => {
    return (
      <NavBar
        titleStyle={styles.navBar.title}
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
    // if (Math.abs(this.state.index - this.state.routes.indexOf(route)) > 2) {
    //   return null;
    // }
    return (
      <ResourceList
        type={route.key}
        onMomentumScrollBegin={this.handleMomentumScrollBegin}
        onMomentumScrollEnd={this.handleMomentumScrollEnd}
      />
    );
  };

  render() {
    const { addButtonVisible } = this.props;
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
        {!!addButtonVisible &&
          hasPermission('resource-create') && (
            <AddButton onPress={this.handleAddPress} />
          )}
      </View>
    );
  }
}

export default Resources;
