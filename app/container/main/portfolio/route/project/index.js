import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { NavigationActions } from 'react-navigation';

import List from 'component/uikit/list';
import UnexchangeableItem from 'component/project/unexchangeable';
import { hasPermission } from 'component/auth/permission/lock';
import styles from './style';

@global.bindTrack({
  page: '投资库',
  name: 'App_ProjectOperation',
  subModuleName: '待投项目',
})
@connect(({ portfolio, loading }, { status }) => ({
  data: R.pathOr(null, ['projectList', status, 'index', 'data'])(portfolio),
  pagination: R.pathOr(null, ['projectList', status, 'index', 'pagination'])(
    portfolio,
  ),
  params: R.pathOr(null, ['projectList', status, 'params'])(portfolio),
  loading: loading.effects['portfolio/index'],
}))
export default class Project extends Component {
  requestData = (page, size, callback) => {
    const { status } = this.props;
    this.props.dispatch({
      type: 'portfolio/index',
      payload: {
        status,
        currentPage: page,
        pageSize: size,
      },
      callback,
    });
  };

  handleItemPress = item => () => {
    if (!hasPermission('project-view')) {
      return;
    }
    this.props.track('项目卡片');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PortfolioDetail',
        params: {
          item,
        },
      }),
    );
  };

  renderItem = ({ item }) => (
    <UnexchangeableItem item={item} onPress={this.handleItemPress(item)} />
  );

  renderEmpty = () => (
    <View style={styles.empty.container}>
      <Image source={require('asset/project/empty_unexchangeable.png')} />
      <View style={styles.empty.title.container}>
        <Text style={styles.empty.title.text}>
          {'库中暂无项目，点击右下角添加项目\n即可查看详细的可视化收益统计'}
        </Text>
      </View>
    </View>
  );

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <View style={styles.container}>
        <List
          contentContainerStyle={{ paddingTop: 10 }}
          action={this.requestData}
          data={data}
          pagination={pagination}
          loading={loading}
          renderItem={this.renderItem}
          renderEmpty={this.renderEmpty}
          onScroll={this.props.onScroll}
          onMomentumScrollBegin={this.props.onMomentumScrollBegin}
          onMomentumScrollEnd={this.props.onMomentumScrollEnd}
          scrollEventThrottle={500}
        />
        {R.isEmpty(data) && (
          <View style={styles.empty.subtitle.container}>
            <Text style={styles.empty.subtitle.text}>
              Hotnode 现已支持 Top10 交易所的最新数据
            </Text>
          </View>
        )}
      </View>
    );
  }
}
