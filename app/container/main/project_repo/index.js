import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import NavBar from 'component/navBar';
import SearchBarDisplay from 'component/searchBar/display';
import List from 'component/uikit/list';

import styles from './style';

@global.bindTrack({
  page: '项目大全',
  name: 'App_ProjectRepoOperation',
})
@connect(({ public_project, loading }) => ({
  data: R.pathOr([], ['list', 'data'])(public_project),
  pagination: R.pathOr(null, ['list', 'pagination'])(public_project),
  //   loading: loading.effects['notification/fetch'],
  //   in_individual: login.in_individual,
}))
export default class ProjectRepo extends Component {
  handleItemPress = id => () => {
    this.props.track('点击进入详情');
    // this.props.dispatch(
    //   NavigationActions.navigate({
    //     routeName: 'NotificationDetail',
    //     params: {
    //       id,
    //     },
    //   }),
    // );
  };

  handleSearchPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PublicProjectSearch',
      }),
    );
  };

  render() {
    const { loading, data, pagination } = this.props;
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
        {/* <ScrollableTabView /> */}
      </View>
    );
  }
}
