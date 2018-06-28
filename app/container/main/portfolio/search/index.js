import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { compose, withState } from 'recompose';

import NavBar from 'component/navBar';
import SearchBar from 'component/searchBar';
import styles from './style';

@compose(withState('searchText', 'setSearchText', ''))
class Search extends Component {
  onSearchTextChange = text => this.props.setSearchText(text);

  render() {
    const { searchText } = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          gradient
          renderTitle={() => (
            <View style={styles.searchBar.container}>
              <SearchBar
                style={styles.searchBar.bar}
                autoFocus
                onChangeText={this.onSearchTextChange}
                value={searchText}
              />
            </View>
          )}
        />
      </View>
    );
  }
}

export default Search;
