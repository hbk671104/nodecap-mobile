import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';

import List from 'component/uikit/list';
import NavBar from 'component/navBar';
import SearchBar from 'component/searchBar';
import SimplifiedItem from 'component/public_project/simplified_item';

import styles from './style';

@global.bindTrack({
  page: '创建机构项目搜索',
  name: 'App_MyInstitutionCreateProjectSearchOperation',
})
@connect(({ public_project }) => ({
  data: R.pathOr(null, ['search', 'index', 'data'])(public_project),
}))
class PublicProjectSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.searchDelayed = _.debounce(this.requestData, 250);
  }

  componentDidMount() {
    this.props.track('进入');
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
    // this.props.track('点击进入详情');
    // this.props.dispatch(
    //   NavigationActions.navigate({
    //     routeName: 'PublicProjectDetail',
    //     params: {
    //       item,
    //     },
    //     key: `PublicProjectDetail_${this.props.data.id}`,
    //   }),
    // );
  };

  handleBackPress = () => {
    this.props.dispatch(NavigationActions.back());
  };

  renderNavBar = () => <NavBar back gradient title="项目名称" />;

  renderSearchHeader = () => (
    <View style={styles.searchBar.container}>
      <SearchBar
        autoFocus
        style={styles.searchBar.wrapper}
        inputStyle={styles.searchBar.input}
        onChange={this.onSearchTextChange}
        placeholder="请填写项目名称"
        placeholderTextColor="rgba(0, 0, 0, 0.45)"
        iconColor="#1890FF"
      />
    </View>
  );

  renderItem = ({ item }) => (
    <SimplifiedItem data={item} onPress={this.handleItemPress(item)} />
  );

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderSearchHeader()}
        <List
          disableRefresh
          contentContainerStyle={styles.listContent}
          data={data}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default PublicProjectSearch;
