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
import ResourceItem from 'component/resources/item';
import styles from './style';

@global.bindTrack({
  page: '我的同事',
  name: 'App_ColleagueOperation',
})
@compose(withState('addButtonVisible', 'setAddButtonVisible', true))
@connect(({ resource, loading }, { type }) => ({
  data: R.pathOr(null, ['list', type, 'index', 'data'])(resource),
  pagination: R.pathOr(null, ['list', type, 'index', 'pagination'])(resource),
  params: R.pathOr(null, ['list', type, 'params'])(resource),
  loading: loading.effects['resource/index'],
}))
export default class Colleague extends Component {
  requestData = (page, size) => {
    const { type } = this.props;
    this.props.dispatch({
      type: 'resource/index',
      payload: {
        type,
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

  handleItemPress = item => () => {
    if (!hasPermission('resource-view')) {
      return;
    }
    this.props.track('项目卡片', { subModuleName: this.props.type });
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ResourceDetail',
        params: {
          item,
        },
      }),
    );
  };

  renderItem = ({ item }) => (
    <ResourceItem data={item} onPress={this.handleItemPress(item)} />
  );

  renderNavBar = () => (
    <NavBar
      gradient
      back
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
          hasPermission('resource-create') && (
            <AddButton onPress={this.handleAddPress} />
          )}
      </View>
    );
  }
}
