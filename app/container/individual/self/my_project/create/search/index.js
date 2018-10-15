import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import { Toast } from 'antd-mobile';
import _ from 'lodash';

import NavBar from 'component/navBar';
import SearchBar from 'component/searchBar';
import Touchable from 'component/uikit/touchable';
import List from 'component/uikit/list';
import styles from './style';

@global.bindTrack({
  page: '创建项目搜索',
  name: 'App_CreateMyProjectSearchOperation',
})
@connect(({ user, login, loading }) => ({
  data: [],
  //   loading: loading.effects['login/switch'],
}))
class CreateMyProjectSearch extends Component {
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

  onSearchTextChange = text => {
    this.setState({ searchText: text }, this.searchDelayed);
  };

  requestData = () => {
    const { searchText } = this.state;
    if (R.isEmpty(searchText)) return;

    Toast.loading('loading...', 0);
    // this.props.dispatch({
    //   type: 'portfolio/searchMatchedCoin',
    //   payload: {
    //     q: searchText,
    //   },
    //   callback: () => {
    //     Toast.hide();
    //   },
    // });
  };

  handleSavePress = () => {};

  renderNavBar = () => (
    <NavBar
      back
      gradient
      title="项目名称"
      renderRight={() => (
        <Touchable borderless onPress={this.handleSavePress}>
          <Text style={styles.navBar.right}>保存</Text>
        </Touchable>
      )}
    />
  );

  renderHeader = () => (
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

  renderItem = ({ item }) => null;

  render() {
    const { data, loading } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderHeader()}
        <List data={data} renderItem={this.renderItem} />
      </View>
    );
  }
}

export default CreateMyProjectSearch;
