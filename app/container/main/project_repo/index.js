import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import { compose, withProps } from 'recompose';
import { RouterEmitter } from '../../../router';
import DrawerLayout from 'react-native-drawer-layout';

import NavBar from 'component/navBar';
import SearchBarDisplay from 'component/searchBar/display';
import Touchable from 'component/uikit/touchable';

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
    const targeted_coinset_index = navigation.getParam('coinset_index');
    return {
      targeted_coinset_index:
        targeted_coinset_index ||
        R.findIndex(
          s =>
            s.id === targeted_coinset_id || `${s.id}` === targeted_coinset_id,
        )(sets) + 1,
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
        if (this.tabView) {
          this.tabView.goToPage(nextProps.targeted_coinset_index);
        }
      }, 500);
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

  renderTab = (name, page, isTabActive, onPressHandler, onLayoutHandler) => {
    const textColor = isTabActive ? 'rgba(0, 0, 0, 0.85)' : '#B8CBDD';
    return (
      <View onLayout={onLayoutHandler}>
        <Touchable key={`${name}_${page}`} onPress={() => onPressHandler(page)}>
          <View style={[styles.tabBar.tab]}>
            <Text
              style={[
                styles.tabBar.text,
                { color: textColor, fontWeight: 'bold' },
              ]}
            >
              {name}
            </Text>
          </View>
        </Touchable>
        {isTabActive && (
          <View style={styles.tabBar.under}>
            <View style={styles.tabBar.underInner} />
          </View>
        )}
      </View>
    );
  };

  renderTabBar = () => (
    <ScrollableTabBar
      style={styles.tabBar.container}
      tabStyle={styles.tabBar.tab}
      textStyle={styles.tabBar.text}
      activeTextColor="rgba(0, 0, 0, 0.85)"
      inactiveTextColor="#B8CBDD"
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
            barStyle="dark-content"
            wrapperStyle={styles.navBar}
            renderTitle={() => (
              <View style={styles.searchBar.container}>
                <SearchBarDisplay
                  style={{
                    backgroundColor: '#F5F5F5',
                    flexDirection: 'row-reverse',
                  }}
                  iconContainerStyle={{ marginLeft: 12 }}
                  title="搜索项目名、Token"
                  onPress={this.handleSearchPress}
                  titleStyle={{ color: '#999999' }}
                  iconColor="#666666"
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
