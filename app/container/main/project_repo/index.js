import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import Button from 'react-native-scrollable-tab-view/Button';
import DrawerLayout from 'react-native-drawer-layout';

import NavBar from 'component/navBar';
import SearchBarDisplay from 'component/searchBar/display';
import { setStatusBar } from 'component/uikit/statusBar';

import ProjectList from './list';
import ProjectSets from './sets';
import Filter from './list/filter';
import styles from './style';

@global.bindTrack({
  page: '项目大全',
  name: 'App_ProjectRepoOperation',
})
@connect(({ coinSets }) => ({
  sets: R.pathOr([], ['sets'])(coinSets),
}))
export default class ProjectRepo extends Component {
  handleSearchPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PublicProjectSearch',
      }),
    );
  };

  handleOnDrawerClose = () => {
    setStatusBar('light-content');
    this.props.dispatch(
      NavigationActions.setParams({
        params: { tabBarVisible: true },
        key: 'ProjectRepo',
      }),
    );
  };

  renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
    const textColor = isTabActive ? '#1890FF' : 'rgba(0, 0, 0, 0.65)';
    const fontWeight = isTabActive ? 'bold' : 'normal';
    const useIcon = name === '最热';
    return (
      <Button
        key={`${name}_${page}`}
        accessible
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}
        onLayout={onLayoutHandler}
      >
        <View style={[styles.tabBar.tab]}>
          {useIcon ? (
            <Image
              source={require('asset/public_project/hot.png')}
              style={styles.tabBar.hot}
            />
          ) : null}
          <Text style={[{ color: textColor, fontWeight }, styles.tabBar.text]}>
            {name}
          </Text>
          {isTabActive ? (
            <View style={styles.tabBar.under}>
              <View style={styles.tabBar.underInner} />
            </View>
          ) : null}
        </View>
      </Button>
    );
  }

  renderTabBar = () => (
    <ScrollableTabBar
      style={styles.tabBar.container}
      tabStyle={styles.tabBar.tab}
      textStyle={styles.tabBar.text}
      activeTextColor="#1890FF"
      inactiveTextColor="rgba(0, 0, 0, 0.65)"
      underlineStyle={styles.tabBar.underline}
      renderTab={this.renderTab}
    />
  );

  render() {
    const { sets } = this.props;
    return (
      <DrawerLayout
        ref={drawer => {
          this.drawer = drawer;
        }}
        drawerWidth={285}
        drawerPosition="right"
        onDrawerClose={this.handleOnDrawerClose}
        renderNavigationView={() => <Filter drawerRef={this.drawer} />}
      >
        <View style={styles.container}>
          <NavBar
            gradient
            renderTitle={() => (
              <View style={styles.searchBar.container}>
                <SearchBarDisplay
                  title="搜索项目名、Token"
                  onPress={this.handleSearchPress}
                />
              </View>
            )}
          />
          <ScrollableTabView
            renderTabBar={this.renderTabBar}
            prerenderingSiblingsNumber={Infinity}
          >
            <ProjectList drawerRef={this.drawer} tabLabel="最热" />
            {R.map(t => (
              <ProjectSets
                key={t.id}
                index={t.id}
                set_id={t.id}
                tabLabel={t.name}
              />
            ))(sets)}
          </ScrollableTabView>
        </View>
      </DrawerLayout>
    );
  }
}
