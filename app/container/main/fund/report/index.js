import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import List from 'component/uikit/list';
import ReportItem from '../components/reportItem';
import styles from './style';

@connect(({ fund, loading }, { fid }) => ({
  investment: R.pipe(
    R.pathOr([], ['funds']),
    R.find(f => `${f.id}` === fid),
    R.pathOr([], ['investment_report']),
  )(fund),
  loading: loading.effects['fund/fetchInvestmentReport'],
}))
export default class Report extends Component {
  loadInvestment = () => {
    this.props.dispatch({
      type: 'fund/fetchInvestmentReport',
      id: this.props.fid,
    });
  };

  handleItemPress = item => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PortfolioDetail',
        params: {
          item: {
            ...item,
            can_calculate: true,
          },
        },
      }),
    );
  };

  handleInvestmentPress = anchor_type => item => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PortfolioRecord',
        params: {
          item: {
            ...item,
            can_calculate: true,
          },
          anchor_type,
        },
      }),
    );
  };

  renderItem = ({ item }) => (
    <ReportItem
      data={item}
      onPress={this.handleItemPress(item)}
      onInvestmentPress={anchor_type =>
        this.handleInvestmentPress(anchor_type)(item)
      }
    />
  );

  render() {
    const { loading, investment } = this.props;
    return (
      <View style={styles.container}>
        <List
          contentContainerStyle={styles.listContent}
          action={this.loadInvestment}
          loading={loading}
          data={investment}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
