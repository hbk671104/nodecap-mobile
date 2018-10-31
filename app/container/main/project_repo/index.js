import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import { compose, withProps } from 'recompose';
import Button from 'react-native-scrollable-tab-view/Button';
import { RouterEmitter } from '../../../router';
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
@compose(
  withProps(({ navigation, sets }) => {
    const targeted_coinset_id = navigation.getParam('coinset_id');
    return {
      targeted_coinset_index:
        R.findIndex(s => `${s.id}` === targeted_coinset_id)(sets) + 1,
    };
  }),
)
export default class ProjectRepo extends Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'coinSets/fetch',
    });
    RouterEmitter.addListener('changeTab', navigation => {
      const key = R.path(['navigation', 'state', 'key'])(this.props);

      if (key === 'ProjectRepo' && navigation.routeName === 'ProjectRepo') {
        this.props.dispatch({
          type: 'coinSets/fetch',
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.targeted_coinset_index &&
      nextProps.targeted_coinset_index > 0
    ) {
      setTimeout(() => {
        this.tabView.goToPage(nextProps.targeted_coinset_index);
      }, 250);
    }
  }

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

  handleOnDrawerSlide = () => {
    const tabBarVisible = this.props.navigation.getParam('tabBarVisible', true);
    if (!tabBarVisible) {
      return;
    }

    setStatusBar('dark-content');
    this.props.dispatch(
      NavigationActions.setParams({
        params: { tabBarVisible: false },
        key: 'ProjectRepo',
      }),
    );
  };

  handleCloseDrawer = () => {
    this.drawer.closeDrawer();
  };

  renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
    const textColor = isTabActive ? '#1890FF' : 'rgba(0, 0, 0, 0.65)';
    const fontWeight = isTabActive ? 'bold' : 'normal';
    const useIcon = name === '项目大全';
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
              source={require('asset/tabIcon/latest/project_sel.png')}
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
        useNativeAnimations
        ref={drawer => {
          this.drawer = drawer;
        }}
        drawerWidth={285}
        drawerPosition="right"
        onDrawerClose={this.handleOnDrawerClose}
        onDrawerSlide={this.handleOnDrawerSlide}
        renderNavigationView={() => (
          <Filter closeDrawer={this.handleCloseDrawer} />
        )}
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
            ref={ref => {
              this.tabView = ref;
            }}
            renderTabBar={this.renderTabBar}
            prerenderingSiblingsNumber={Infinity}
            onChangeTab={({ i }) => {
              this.props.track('tab 滑动', { tabIndex: `${i}` });
            }}
          >
            <ProjectList drawerRef={this.drawer} tabLabel="项目大全" />
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
