import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';

import NavBar from 'component/navBar';
import SearchBarDisplay from 'component/searchBar/display';

import ProjectList from './list';
import styles from './style';

@global.bindTrack({
  page: '项目大全',
  name: 'App_ProjectRepoOperation',
})
@connect(({ public_project }) => ({
  tab: R.pathOr([], ['list'])(public_project),
}))
export default class ProjectRepo extends Component {
  handleSearchPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PublicProjectSearch',
      }),
    );
  };

  renderTabBar = () => (
    <DefaultTabBar
      style={styles.tabBar.container}
      tabStyle={styles.tabBar.tab}
      textStyle={styles.tabBar.text}
      activeTextColor="#1890FF"
      inactiveTextColor="rgba(0, 0, 0, 0.65)"
      underlineStyle={styles.tabBar.underline}
    />
  );

  render() {
    const { tab } = this.props;
    return (
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
          {R.addIndex(R.map)((t, index) => (
            <ProjectList
              key={index}
              index={index}
              progress={t.id}
              tabLabel={t.title}
            />
          ))(tab)}
        </ScrollableTabView>
      </View>
    );
  }
}
