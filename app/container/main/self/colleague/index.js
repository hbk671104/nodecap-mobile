import React, { Component } from 'react';
import { View, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { compose, withState } from 'recompose';
import { NavigationActions } from 'react-navigation';

import { hasPermission } from 'component/auth/permission/lock';
import NavBar from 'component/navBar';
import AddButton from 'component/add';
import SearchBarDisplay from 'component/searchBar/display';
import List from 'component/uikit/list';
import ColleagueItem from 'component/colleague/item';
import styles from './style';

@global.bindTrack({
  page: '我的同事',
  name: 'App_ColleagueOperation',
})
@compose(withState('addButtonVisible', 'setAddButtonVisible', true))
@connect(({ colleague, loading }) => ({
  data: R.pathOr(null, ['list', 'index', 'data'])(colleague),
  pagination: R.pathOr(null, ['list', 'index', 'pagination'])(colleague),
  params: R.pathOr(null, ['list', 'params'])(colleague),
  loading: loading.effects['colleague/index'],
}))
export default class Colleague extends Component {
  requestData = (page, size) => {
    this.props.dispatch({
      type: 'colleague/index',
      payload: {
        currentPage: page,
        pageSize: size,
      },
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
        routeName: 'ColleagueSearch',
      }),
    );
  };

  handleAddPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ColleagueAdd',
      }),
    );
  };

  handleItemPress = item => () => {
    if (!hasPermission('user-view')) {
      return;
    }
    this.props.track('项目卡片');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ColleagueDetail',
        params: {
          item,
        },
      }),
    );
  };

  renderItem = ({ item }) => (
    <ColleagueItem data={item} onPress={this.handleItemPress(item)} />
  );

  renderNavBar = () => (
    <NavBar
      gradient
      back
      titleStyle={styles.navBar.title}
      renderTitle={() => (
        <View style={styles.searchBar.container}>
          <SearchBarDisplay
            title="请输入姓名关键字搜索"
            onPress={this.handleSearchPress}
          />
        </View>
      )}
    />
  );

  render() {
    const { data, pagination, loading, addButtonVisible } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <List
          action={this.requestData}
          data={data}
          pagination={pagination}
          loading={loading}
          renderItem={this.renderItem}
          onMomentumScrollBegin={this.props.onMomentumScrollBegin}
          onMomentumScrollEnd={this.props.onMomentumScrollEnd}
        />
        {!!addButtonVisible &&
          hasPermission('user-create') && (
            <AddButton onPress={this.handleAddPress} />
          )}
      </View>
    );
  }
}
