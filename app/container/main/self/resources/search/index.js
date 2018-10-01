import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';

import { hasPermission } from 'component/auth/permission/lock';
import List from 'component/uikit/list';
import NavBar from 'component/navBar';
import SearchBar from 'component/searchBar';
import Touchable from 'component/uikit/touchable';
import ResourceItem from 'component/resources/item';
import styles from './style';

@global.bindTrack({
  page: '人脉资源库搜索',
  name: 'App_HumanResourceSearchOperation',
})
@connect(({ resource }) => ({
  data: R.pathOr(null, ['search', 'index', 'data'])(resource),
}))
class ResourceSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.searchDelayed = _.debounce(this.requestData, 250);
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'resource/clearSearch' });
  }

  onSearchTextChange = text => {
    this.setState({ searchText: text }, this.searchDelayed);
  };

  requestData = () => {
    const { searchText } = this.state;
    if (R.isEmpty(searchText)) return;

    this.props.dispatch({
      type: 'resource/search',
      payload: {
        q: searchText,
      },
    });
  };

  handleItemPress = item => () => {
    if (!hasPermission('resource-view')) {
      return;
    }
    this.props.track('项目卡片');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ResourceDetail',
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
              showMagnifier={R.isEmpty(this.state.searchText)}
              style={styles.searchBar.bar}
              autoFocus
              placeholder="输入人脉关键字搜索"
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
    <ResourceItem data={item} onPress={this.handleItemPress(item)} />
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

export default ResourceSearch;
