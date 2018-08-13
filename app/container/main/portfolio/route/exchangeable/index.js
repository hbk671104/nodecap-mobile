import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import List from 'component/uikit/list';
import ProjectItem from 'component/project/item';
import PriceChangeItem from 'component/project/priceChangeItem';
import InvestmentItem from 'component/project/investmentItem';
import { hasPermission } from 'component/auth/permission/lock';
import styles from './style';

@global.bindTrack({
  page: '投资库',
  name: 'App_ProjectOperation',
  subModuleName: '已投项目',
})
@connect(({ portfolio, loading }, { rank }) => ({
  data: R.pathOr(null, ['exchangeable', rank, 'index', 'data'])(portfolio),
  pagination: R.pathOr(null, ['exchangeable', rank, 'index', 'pagination'])(
    portfolio,
  ),
  params: R.pathOr(null, ['exchangeable', rank, 'params'])(portfolio),
  loading: loading.effects['portfolio/investment'],
}))
export default class Exchangeable extends Component {
  requestData = (page, size, callback) => {
    const { rank } = this.props;
    this.props.dispatch({
      type: 'portfolio/investment',
      payload: {
        rank,
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

  renderItem = ({ item, index }) => {
    switch (this.props.rank) {
      case 'profits':
      case 'roi':
        return (
          <ProjectItem
            item={item}
            index={index}
            onPress={this.handleItemPress(item)}
          />
        );
      case 'increase':
        return (
          <PriceChangeItem
            item={item}
            index={index}
            onPress={this.handleItemPress(item)}
          />
        );
      case 'cost':
        return (
          <InvestmentItem
            item={item}
            index={index}
            onPress={this.handleItemPress(item)}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <View style={styles.container}>
        <List
          action={this.requestData}
          data={data}
          pagination={pagination}
          loading={loading}
          renderItem={this.renderItem}
          onScroll={this.props.onScroll}
          onMomentumScrollBegin={this.props.onMomentumScrollBegin}
          onMomentumScrollEnd={this.props.onMomentumScrollEnd}
          scrollEventThrottle={500}
        />
      </View>
    );
  }
}
