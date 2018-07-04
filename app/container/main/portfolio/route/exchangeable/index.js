import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { Toast } from 'antd-mobile';

import List from 'component/uikit/list';
import ProjectItem from 'component/project/item';
import PriceChangeItem from 'component/project/priceChangeItem';
import InvestmentItem from 'component/project/investmentItem';
import Header from './header';
import styles from './style';

@connect(({ portfolio, loading }) => ({
  data: R.pathOr(null, ['exchangeable', 'index', 'data'])(portfolio),
  pagination: R.pathOr(null, ['exchangeable', 'index', 'pagination'])(portfolio),
  params: R.pathOr(null, ['exchangeable', 'params'])(portfolio),
  loading: loading.effects['portfolio/investment'],
}))
export default class Exchangeable extends Component {
  state = {
    rank: R.path(['params', 'rank'])(this.props),
  };

  requestData = (page, size, callback) => {
    const { rank } = this.state;
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

  handleSelect = (rank) => {
    Toast.loading('loading...', 0);
    this.setState({ rank }, () => {
      this.requestData(undefined, undefined, () => Toast.hide());
    });
  };

  renderItem = ({ item, index }) => {
    switch (this.state.rank) {
      case 'profits':
      case 'roi':
        return <ProjectItem item={item} index={index} />;
      case 'increase':
        return <PriceChangeItem item={item} index={index} />;
      case 'cost':
        return <InvestmentItem item={item} index={index} />;
      default:
        return null;
    }
  };

  renderHeader = () => <Header value={this.state.rank} onSelect={this.handleSelect} />;

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
          renderHeader={this.renderHeader}
          onScroll={this.props.onScroll}
          scrollEventThrottle={500}
        />
      </View>
    );
  }
}
