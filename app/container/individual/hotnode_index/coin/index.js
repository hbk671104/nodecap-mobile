import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { Flex } from 'antd-mobile';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import CoinItem from 'component/hotnode_index/coin_item';
import CoinHeader from 'component/hotnode_index/coin_header';
import styles from './style';

@global.bindTrack({
  page: 'Hotnode项目指数',
  name: 'App_HotnodeCoinIndexOperation',
})
@connect(({ hotnode_index, loading }, { navigation }) => {
  const id = navigation.getParam('id');
  const data = R.isNil(id)
    ? R.pathOr([], ['overall', 'list', 'data'])(hotnode_index)
    : R.pathOr([], ['coin', id, 'list', 'data'])(hotnode_index);
  const pagination = R.isNil(id)
    ? R.path(['overall', 'list', 'pagination'])(hotnode_index)
    : R.path(['coin', id, 'list', 'pagination'])(hotnode_index);
  const global = R.isNil(id)
    ? R.pathOr({}, ['overall', 'global'])(hotnode_index)
    : R.pathOr({}, ['coin', id, 'global'])(hotnode_index);

  return {
    id,
    title: id ? R.pathOr('', ['tag_name'])(global) : '区块链一级市场指数',
    data,
    pagination,
    global,
    loading: loading.effects['hotnode_index/fetchCoin'],
  };
})
class HotnodeCoinIndex extends PureComponent {
  componentDidMount() {
    this.props.track('进入');
  }

  requestData = (page, size) => {
    this.props.dispatch({
      type: 'hotnode_index/fetchCoin',
      id: this.props.id,
      payload: {
        page,
        'per-page': size,
      },
    });
  };

  handleItemPress = item => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PublicProjectDetail',
        params: {
          id: item.id,
        },
      }),
    );
  };

  renderItem = ({ item }) => (
    <CoinItem data={item} onPress={this.handleItemPress(item)} />
  );

  renderHeader = () => (
    <View>
      <CoinHeader {...this.props} />
      <View style={styles.title.container}>
        <Text style={styles.title.text}>项目指数</Text>
      </View>
      <Flex style={styles.bar.container}>
        <View style={{ flex: 5 }}>
          <Text style={styles.bar.text}>项目</Text>
        </View>
        <View style={{ flex: 4 }}>
          <Text style={styles.bar.text}>热度指数</Text>
        </View>
      </Flex>
    </View>
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { title, data, pagination, loading } = this.props;
    return (
      <View style={styles.container}>
        <NavBar back gradient title={title} />
        <List
          contentContainerStyle={styles.listContent}
          action={this.requestData}
          loading={loading}
          pagination={pagination}
          data={data}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
          renderHeader={this.renderHeader}
        />
      </View>
    );
  }
}

export default HotnodeCoinIndex;
