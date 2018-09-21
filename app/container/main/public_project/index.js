import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import R from 'ramda';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import SearchBarDisplay from 'component/searchBar/display';
import FavorItem from 'component/favored/item';
import PublicProjectItem from 'component/public_project/item';

import Header from './header';
import styles from './style';

@global.bindTrack({
  page: '项目公海',
  name: 'App_PublicProjectOperation',
})
@connect(({ public_project, institution, loading, login }) => ({
  data: R.pathOr([], ['list', 'index', 'data'])(public_project),
  pagination: R.pathOr(null, ['list', 'index', 'pagination'])(public_project),
  progress: R.pathOr([], ['list', 'progress'])(public_project),
  params: R.pathOr({}, ['list', 'params'])(public_project),
  institution: R.pathOr([], ['list'])(institution),
  loading: loading.effects['public_project/fetch'],
  in_individual: login.in_individual,
}))
@connectActionSheet
export default class PublicProject extends Component {
  requestData = (page, size) => {
    this.props.dispatch({
      type: 'public_project/fetch',
      params: {
        ...this.props.params,
        currentPage: page,
        pageSize: size,
      },
    });
  };

  loadData = params => {
    this.props.dispatch({
      type: 'public_project/fetch',
      params: {
        ...params,
        currentPage: 1,
        pageSize: 20,
      },
    });
  };

  handleItemPress = item => () => {
    this.props.track('点击进入详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PublicProjectDetail',
        params: {
          item,
        },
      }),
    );
  };

  handleInstitutionItemPress = item => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'InstitutionReport',
        params: {
          item,
        },
      }),
    );
  };

  handleSearchPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PublicProjectSearch',
      }),
    );
  };

  handleFilterPress = () => {
    const { progress } = this.props;
    const cancelButtonIndex = R.length(progress);
    this.props.showActionSheetWithOptions(
      {
        options: [...progress, '取消'],
        cancelButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex === cancelButtonIndex) {
          return;
        }
        this.loadData({
          progress: buttonIndex,
        });
      },
    );
  };

  renderItem = ({ item }) => {
    return this.props.in_individual ? (
      <FavorItem data={item} onPress={this.handleItemPress(item)} />
    ) : (
      <PublicProjectItem data={item} onPress={this.handleItemPress(item)} />
    );
  };

  renderHeader = () => (
    <Header
      {...this.props}
      onItemPress={this.handleInstitutionItemPress}
      onFilterPress={this.handleFilterPress}
    />
  );

  renderSeparator = () => <View style={styles.separator} />;

  renderNavBar = () => (
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
  );

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <List
          contentContainerStyle={styles.listContent}
          action={this.requestData}
          loading={loading}
          pagination={pagination}
          data={data}
          renderItem={this.renderItem}
          renderHeader={this.renderHeader}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}
