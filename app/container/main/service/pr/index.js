import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import ServiceItem from './item';

import styles from './style';

@global.bindTrack({
  page: '公关公司列表',
  name: 'App_ServiceOperation',
})
@connect(({ institution, loading }) => {
  return {
    data: [{
      id: 1,
      logo_url: require('asset/services/nodecap.png'),
      name: '贝壳公关',
      description: '一家专注于区块链行业的企业宣发公司',
    }, {
      id: 2,
      logo_url: require('asset/services/nodeplus.png'),
      name: 'NodePlus',
      description: '专业的区块链行业项目路演，品牌宣传，企业宣传',
    }],
    pagination: R.pathOr(null, ['list', 'pagination'])(institution),
    loading: loading.effects['institution/fetch'],
  };
})
export default class InstitutionReport extends Component {
  requestData = (page, size) => {};

  handleItemPress = item => () => {
    this.props.track('点击进入详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PRServiceDetail',
        params: {
          id: item.id,
        },
        key: `PRServiceDetail_${item.id}`,
      }),
    );
  };

  renderItem = ({ item }) => (
    <ServiceItem data={item} onPress={this.handleItemPress(item)} />
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { data, loading, pagination } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient back title="公关服务" />
        <List
          contentContainerStyle={styles.list.content}
          action={this.requestData}
          loading={loading}
          data={data}
          pagination={pagination}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}
