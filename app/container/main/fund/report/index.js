import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import List from 'component/uikit/list';
import ReportItem from '../components/reportItem';
import styles from './style';

const mock = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];

@connect(({ fund }, { fid }) => ({
  investment: R.pipe(
    R.pathOr([], ['funds']),
    R.find(R.propEq('id', fid)),
    R.pathOr({}, ['investment_report']),
  )(fund),
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
    return (
      <View style={styles.container}>
        <List data={mock} renderItem={this.renderItem} />
      </View>
    );
  }
}
