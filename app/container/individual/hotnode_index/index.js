import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Flex } from 'antd-mobile';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import CategoryItem from 'component/hotnode_index/category_item';
import Header from 'component/hotnode_index/header';
import OrderIndex from './otherIndex';
import styles from './style';

@global.bindTrack({
  page: 'Hotnode指数',
  name: 'App_HotnodeIndexOperation',
})
@connect(({ hotnode_index, loading }) => ({
  data: R.pathOr([], ['category'])(hotnode_index),
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

  renderItem = ({ item }) => (
    <CategoryItem data={item} />
  );

  renderHeader = () => (
    <View>
      <Header {...this.props} />
      <View style={styles.divider} />
      <OrderIndex {...this.props} />
      <View style={styles.divider} />
    </View>
  );

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient title="Hotnode 指数" />
        <ScrollView>
          {this.renderHeader()}
        </ScrollView>
      </View>
    );
  }
}

export default HotnodeIndex;
