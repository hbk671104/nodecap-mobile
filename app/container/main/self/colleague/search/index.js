import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { Toast } from 'antd-mobile';
import _ from 'lodash';

import { hasPermission } from 'component/auth/permission/lock';
import List from 'component/uikit/list';
import NavBar from 'component/navBar';
import SearchBar from 'component/searchBar';
import Touchable from 'component/uikit/touchable';
import ColleagueItem from 'component/colleague/item';
import styles from './style';

@global.bindTrack({
  page: '我的同事搜索',
  name: 'App_ColleagueSearchOperation',
})
@connect(({ colleague }) => ({
  data: R.pathOr(null, ['search', 'index', 'data'])(colleague),
}))
class ColleagueSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.searchDelayed = _.debounce(this.requestData, 250);
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'colleague/clearSearch' });
  }

  onSearchTextChange = text => {
    this.setState({ searchText: text }, this.searchDelayed);
  };

  requestData = () => {
    const { searchText } = this.state;
    if (R.isEmpty(searchText)) return;

    Toast.loading('loading...', 0);
    this.props.dispatch({
      type: 'colleague/search',
      payload: {
        q: searchText,
      },
      callback: () => {
        Toast.hide();
      },
    });
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

  handleBackPress = () => {
    this.props.dispatch(NavigationActions.back());
  };

  renderNavBar = () => {
    return (
      <NavBar
        gradient
        renderTitle={() => (
          <View style={styles.searchBar.container}>
            <SearchBar
              style={styles.searchBar.bar}
              autoFocus
              placeholder="输入姓名关键字搜索"
              onChange={this.onSearchTextChange}
            />
          </View>
        )}
        renderRight={() => (
          <Touchable
            borderless
            style={styles.searchBar.cancel.container}
            onPress={this.handleBackPress}
          >
            <Text style={styles.searchBar.cancel.text}>取消</Text>
          </Touchable>
        )}
      />
    );
  };

  renderItem = ({ item }) => (
    <ColleagueItem data={item} onPress={this.handleItemPress(item)} />
  );

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <List
          contentContainerStyle={styles.listContent}
          loadOnStart={false}
          action={this.requestData}
          data={data}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default ColleagueSearch;
