import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { Toast } from 'antd-mobile';
import _ from 'lodash';

import SafeAreaView from 'component/uikit/safeArea';
import List from 'component/uikit/list';
import NavBar from 'component/navBar';
import SearchBar from 'component/searchBar';
import Touchable from 'component/uikit/touchable';
import UnexchangeableItem from 'component/project/unexchangeable';
import styles from './style';

@connect(({ portfolio, loading }) => ({
  data: R.pathOr(null, ['searchList', 'index', 'data'])(portfolio),
  pagination: R.pathOr(null, ['searchList', 'index', 'pagination'])(portfolio),
  loading: loading.effects['portfolio/search'],
}))
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.searchDelayed = _.debounce(this.searchData, 250);
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'portfolio/clearSearch' });
  }

  onSearchTextChange = text => {
    this.setState({ searchText: text }, this.searchDelayed);
  };

  requestData = (page, size) => {
    const { searchText } = this.state;
    if (R.isEmpty(searchText)) return;

    if (R.isNil(page)) {
      Toast.loading('loading...', 0);
    }
    this.props.dispatch({
      type: 'portfolio/search',
      payload: {
        q: searchText,
        currentPage: page,
        pageSize: size,
      },
      callback: () => {
        if (R.isNil(page)) {
          Toast.hide();
        }
      },
    });
  };

  searchData = () => {
    this.requestData();
  };

  handleItemPress = item => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PortfolioDetail',
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
    // const { searchText } = this.state;
    return (
      <NavBar
        gradient
        renderTitle={() => (
          <View style={styles.searchBar.container}>
            <SearchBar
              style={styles.searchBar.bar}
              autoFocus
              onChange={this.onSearchTextChange}
              // value={searchText}
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
    <UnexchangeableItem item={item} onPress={this.handleItemPress(item)} />
  );

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        {this.renderNavBar()}
        <List
          loadOnStart={false}
          action={this.requestData}
          data={data}
          pagination={pagination}
          loading={loading}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    );
  }
}

export default Search;
