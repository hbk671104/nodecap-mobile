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
  componentWillMount() {
    this.props.dispatch({
      type: 'fund/fetchInvestmentReport',
      id: this.props.fid,
    });
  }

  handleItemPress = item => () => {};

  renderItem = ({ item }) => (
    <ReportItem onPress={this.handleItemPress(item)} />
  );

  render() {
    const { loading, investment } = this.props;
    return (
      <View style={styles.container}>
        <List
          loading={loading}
          data={investment}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
