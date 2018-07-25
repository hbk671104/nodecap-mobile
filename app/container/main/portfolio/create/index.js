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
import Touchable from 'component/uikit/touchable';
import SearchBar from 'component/searchBar';
import styles from './style';

@connect(({ portfolio, loading }) => ({
  data: R.pathOr(null, ['matchCoinList', 'index', 'data'])(portfolio),
  loading: loading.effects['portfolio/searchMatchedCoin'],
}))
class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.searchDelayed = _.debounce(this.requestData, 250);
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'portfolio/clearMatchCoin' });
  }

  onSearchTextChange = text => {
    this.setState({ searchText: text }, this.searchDelayed);
  };

  requestData = () => {
    const { searchText } = this.state;
    if (R.isEmpty(searchText)) return;

    Toast.loading('loading...', 0);
    this.props.dispatch({
      type: 'portfolio/searchMatchedCoin',
      payload: {
        q: searchText,
      },
      callback: () => {
        Toast.hide();
      },
    });
  };

  renderNavBar = () => (
    <NavBar
      gradient
      back
      title="添加项目"
      renderRight={() => (
        <Touchable borderless>
          <Text style={styles.navBar.right}>手动添加</Text>
        </Touchable>
      )}
    />
  );

  renderItem = ({ item }) => <Text>{item.name}</Text>;

  renderHeader = () => (
    <View style={styles.searchBar.container}>
      <SearchBar
        autoFocus
        style={styles.searchBar.wrapper}
        inputStyle={styles.searchBar.input}
        onChange={this.onSearchTextChange}
        placeholder="输入Token/项目名称快速添加项目"
        placeholderTextColor="rgba(0, 0, 0, 0.45)"
        iconColor="#1890FF"
      />
    </View>
  );

  render() {
    const { data, loading } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        {this.renderNavBar()}
        {this.renderHeader()}
        <List
          loadOnStart={false}
          action={this.requestData}
          data={data}
          loading={loading}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    );
  }
}

export default CreateProject;
