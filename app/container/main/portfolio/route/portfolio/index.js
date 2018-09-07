import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { compose, withState } from 'recompose';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { Toast } from 'antd-mobile';

import List from 'component/uikit/list';
import ProjectItem from 'component/project/item';
import PriceChangeItem from 'component/project/priceChangeItem';
import InvestmentItem from 'component/project/investmentItem';
import UnexchangeableItem from 'component/project/unexchangeable';
import { hasPermission } from 'component/auth/permission/lock';

import Selector from './selector';
import styles from './style';

@global.bindTrack({
  page: '投资库',
  name: 'App_ProjectOperation',
  subModuleName: '已投项目',
})
@connect(({ portfolio, loading }, { canCalculate }) => {
  const key = canCalculate ? 'exchangeable' : 'unexchangeable';
  return {
    data: R.pathOr(null, ['portfolioList', key, 'index', 'data'])(portfolio),
    pagination: R.pathOr(null, ['portfolioList', key, 'index', 'pagination'])(
      portfolio,
    ),
    params: R.pathOr(null, ['portfolioList', key, 'params'])(portfolio),
    rank: R.path(['rank'])(portfolio),
    loading: loading.effects['portfolio/investment'],
  };
})
@compose(
  withState('currentRank', 'setCurrentRank', props =>
    R.path(['rank', 0])(props),
  ),
  withState('selectorVisible', 'setSelectorVisible', true),
)
@connectActionSheet
export default class Portfolio extends Component {
  requestData = (page, size, callback) => {
    const { currentRank, canCalculate } = this.props;
    this.props.dispatch({
      type: 'portfolio/investment',
      payload: {
        rank: currentRank.id,
        can_calculate: canCalculate ? 1 : 0,
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

  handleSelectorPress = () => {
    const { setCurrentRank, rank, showActionSheetWithOptions } = this.props;
    showActionSheetWithOptions(
      {
        options: [...R.map(r => r.name)(rank), '取消'],
        cancelButtonIndex: R.length(rank),
      },
      buttonIndex => {
        const newRank = R.pathOr({}, [buttonIndex])(rank);
        if (R.isEmpty(newRank)) {
          return;
        }
        setCurrentRank(newRank, () => {
          Toast.loading('加载中...', 0);
          this.list.scrollToOffset({ offset: 0, animated: false });
          this.requestData(1, 20, () => {
            Toast.hide();
          });
        });
      },
    );
  };

  handleMomentumScrollBegin = () => {
    this.props.onMomentumScrollBegin();
    this.props.setSelectorVisible(false);
  };

  handleMomentumScrollEnd = () => {
    this.props.onMomentumScrollEnd();
    this.props.setSelectorVisible(true);
  };

  renderItem = ({ item, index }) => {
    if (!this.props.canCalculate) {
      return (
        <UnexchangeableItem item={item} onPress={this.handleItemPress(item)} />
      );
    }
    switch (this.props.currentRank.id) {
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

  renderSelector = () => (
    <Selector
      item={this.props.currentRank}
      onPress={this.handleSelectorPress}
    />
  );

  render() {
    const {
      data,
      pagination,
      loading,
      canCalculate,
      selectorVisible,
    } = this.props;
    return (
      <View style={styles.container}>
        <List
          listRef={ref => {
            this.list = ref;
          }}
          contentContainerStyle={{ paddingTop: 10 }}
          action={this.requestData}
          data={data}
          pagination={pagination}
          loading={loading}
          renderItem={this.renderItem}
          onScroll={this.props.onScroll}
          onMomentumScrollBegin={this.handleMomentumScrollBegin}
          onMomentumScrollEnd={this.handleMomentumScrollEnd}
          scrollEventThrottle={500}
        />
        {selectorVisible && canCalculate && this.renderSelector()}
      </View>
    );
  }
}
