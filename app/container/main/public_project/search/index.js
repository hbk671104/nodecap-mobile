import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';

import List from 'component/uikit/list';
import NavBar from 'component/navBar';
import SearchBar from 'component/searchBar';
import Touchable from 'component/uikit/touchable';
import FavorItem from 'component/favored/item';
import styles from './style';

@global.bindTrack({
  page: '项目搜索',
  name: 'App_PublicProjectSearchOperation',
})
@connect(({ public_project }) => ({
  data: R.pathOr(null, ['search'])(public_project),
}))
class PublicProjectSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.searchDelayed = _.debounce(this.requestData, 250);
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'public_project/clearSearch' });
  }

  onSearchTextChange = text => {
    this.setState({ searchText: text }, this.searchDelayed);
  };

  requestData = () => {
    const { searchText } = this.state;
    if (R.isEmpty(searchText)) return;

    this.props.dispatch({
      type: 'public_project/search',
      payload: {
        q: searchText,
      },
    });
  };

  handleItemPress = item => () => {
    // this.props.dispatch(
    //   NavigationActions.navigate({
    //     routeName: 'PortfolioDetail',
    //     params: {
    //       item,
    //     },
    //   }),
    // );
  };

  handleBackPress = () => {
    this.props.dispatch(NavigationActions.back());
  };

  renderNavBar = () => {
    return (
      <NavBar
        gradient
        titleStyle={styles.narBar.title}
        renderTitle={() => (
          <View style={styles.searchBar.container}>
            <SearchBar
              placeholder="搜索项目名、Token"
              style={styles.searchBar.bar}
              autoFocus
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
    <FavorItem item={item} onPress={this.handleItemPress(item)} />
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

export default PublicProjectSearch;
