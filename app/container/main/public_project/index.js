import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import SearchBarDisplay from 'component/searchBar/display';
import FavorItem, { itemHeight } from 'component/favored/item';

import Header from './header';
import styles from './style';

@global.bindTrack({
  page: '项目公海',
  name: 'App_PublicProjectOperation',
})
@connect(({ public_project, institution, loading }) => ({
  data: R.pathOr([], ['list', 'data'])(public_project),
  pagination: R.pathOr(null, ['list', 'pagination'])(public_project),
  institution: R.pathOr([], ['list'])(institution),
  loading: loading.effects['public_project/fetch'],
}))
export default class PublicProject extends Component {
  requestData = (page, size) => {
    this.props.dispatch({
      type: 'public_project/fetch',
      payload: {
        currentPage: page,
        pageSize: size,
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

  handleSearchPress = () => {};

  renderItem = ({ item }) => (
    <FavorItem data={item} onPress={this.handleItemPress(item)} />
  );

  renderHeader = () => (
    <Header
      data={this.props.institution}
      onItemPress={this.handleInstitutionItemPress}
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
          itemHeight={itemHeight}
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
