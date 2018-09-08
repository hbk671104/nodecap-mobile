import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { Toast } from 'antd-mobile';
import _ from 'lodash';

import List from 'component/uikit/list';
import NavBar from 'component/navBar';
import SearchBar from 'component/searchBar';
import AuthButton from 'component/auth/button';

import SearchItem from './item';
import styles from './style';

@global.bindTrack({
  page: '项目详情币种匹配更新',
  name: 'App_ProjectDetailCoinMatchUpdateOperation',
})
@connect(({ portfolio, loading }, props) => {
  const update = props.navigation.getParam('update');
  const coin = props.navigation.getParam('coin');
  return {
    data: R.pathOr(null, ['matchCoinList', 'index', 'data'])(portfolio),
    coin,
    loading: loading.effects['portfolio/searchMatchedCoin'],
    update,
  };
})
export default class UpdateMatchCoin extends Component {
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

  handlePress = item => () => {
    this.props.update({ coin_id: item.id });
    this.props.dispatch(NavigationActions.back());
  };

  renderItem = ({ item }) => (
    <SearchItem item={item} onPress={this.handlePress(item)} />
  );

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

  renderSeparator = () => <View style={styles.separator} />;

  renderEmpty = () => (
    <View style={styles.empty.container}>
      <Image
        style={styles.empty.image}
        source={require('asset/project/create/no_project_found.png')}
      />
      <Text style={styles.empty.title}>搜索不到该项目，请手动添加</Text>
      <AuthButton
        style={styles.empty.button}
        disabled={false}
        title="立即添加"
        onPress={this.handleManualCreate}
      />
    </View>
  );

  renderFixHeader = () => {
    const name = R.pathOr('', ['coin', 'name'])(this.props);
    const symbol = R.pipe(
      R.pathOr('', ['coin', 'symbol']),
      R.toUpper,
    )(this.props);

    if (R.or(R.isEmpty(name)) || R.isEmpty(symbol)) {
      return null;
    }

    return (
      <View style={styles.fixHeader.container}>
        <Text style={styles.fixHeader.text}>
          当前已匹配： {name} ({symbol})
        </Text>
      </View>
    );
  };

  render() {
    const { data, loading } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient back title="匹配币种" />
        {this.renderHeader()}
        {this.renderFixHeader()}
        <List
          contentContainerStyle={styles.listContent}
          loadOnStart={false}
          action={this.requestData}
          data={data}
          loading={loading}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}
