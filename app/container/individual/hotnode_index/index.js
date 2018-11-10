import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import CategoryItem from 'component/hotnode_index/category_item';
import Header from 'component/hotnode_index/header';
import styles from './style';

@global.bindTrack({
  page: 'Hotnode指数',
  name: 'App_HotnodeIndexOperation',
})
@connect(({ hotnode_index, loading }) => ({
  data: R.pathOr([], ['category', 'data'])(hotnode_index),
  pagination: R.pathOr(null, ['category', 'pagination'])(hotnode_index),
  global: R.pathOr({}, ['overall', 'global'])(hotnode_index),
  loading: loading.effects['hotnode_index/fetchCategory'],
}))
class HotnodeIndex extends PureComponent {
  componentDidMount() {
    this.props.track('进入');
  }

  requestData = (page, size) => {
    this.props.dispatch({
      type: 'hotnode_index/fetchCategory',
      payload: {
        page,
        'per-page': size,
      },
    });
  };

  handleHeaderPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'HotnodeCoinIndex',
      }),
    );
  };

  handleItemPress = item => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'HotnodeCoinIndex',
        params: {
          item,
        },
      }),
    );
  };

  renderItem = ({ item }) => (
    <CategoryItem data={item} onPress={this.handleItemPress(item)} />
  );

  renderHeader = () => (
    <View>
      <Header {...this.props} onPress={this.handleHeaderPress} />
      <View style={styles.categoryTitle.container}>
        <Text style={styles.categoryTitle.text}>领域</Text>
      </View>
    </View>
  );

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient title="Hotnode 指数" />
        <List
          numColumns={2}
          contentContainerStyle={styles.listContent}
          action={this.requestData}
          loading={loading}
          pagination={pagination}
          data={data}
          renderItem={this.renderItem}
          renderHeader={this.renderHeader}
        />
      </View>
    );
  }
}

export default HotnodeIndex;
