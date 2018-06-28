import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { compose, withState } from 'recompose';

import List from 'component/uikit/list';
import NavBar from 'component/navBar';
import SearchBar from 'component/searchBar';
import UnexchangeableItem from 'component/project/unexchangeable';
import styles from './style';

@compose(withState('searchText', 'setSearchText', ''))
@connect(({ portfolio, loading }) => ({
  data: R.pathOr([], ['searchList', 'index', 'data'])(portfolio),
  pagination: R.pathOr({}, ['searchList', 'index', 'pagination'])(portfolio),
  loading: loading.effects['portfolio/search'],
}))
class Search extends Component {
  componentWillUnmount() {
    this.props.dispatch({ type: 'portfolio/clearSearch' });
  }

  onSearchTextChange = text => this.props.setSearchText(text);

  onSubmitEditing = () => {
    this.requestData();
  };

  requestData = (page, size) => {
    this.props.dispatch({
      type: 'portfolio/search',
      payload: {
        q: this.props.searchText,
        currentPage: page,
        pageSize: size,
      },
    });
  };

  renderNavBar = () => {
    const { searchText } = this.props;
    return (
      <NavBar
        gradient
        renderTitle={() => (
          <View style={styles.searchBar.container}>
            <SearchBar
              style={styles.searchBar.bar}
              autoFocus
              onChangeText={this.onSearchTextChange}
              value={searchText}
              onSubmitEditing={this.onSubmitEditing}
            />
          </View>
        )}
      />
    );
  };

  renderItem = ({ item }) => <UnexchangeableItem item={item} />;

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <List
          loadOnStart={false}
          action={this.requestData}
          data={data}
          pagination={pagination}
          loading={loading}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default Search;
