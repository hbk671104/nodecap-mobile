import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

import Group from '../components/holdingItem/group';
import Item from '../components/holdingItem';
import styles from './style';

@connect(({ fund }, { fid }) => ({
  holding: R.pipe(
    R.pathOr([], ['funds']),
    R.find(R.propEq('id', fid)),
    R.pathOr({}, ['holding_report']),
  )(fund),
}))
class FundHoldings extends Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'fund/fetchHoldingReport',
      id: this.props.fid,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Group title="剩余可投">
            <Item />
            <Item />
            <Item noBottomBorder />
          </Group>
          <Group title="已出货部分">
            <Item />
            <Item />
            <Item noBottomBorder />
          </Group>
          <Group title="当前持有">
            <Item />
            <Item />
            <Item noBottomBorder />
          </Group>
        </ScrollView>
      </View>
    );
  }
}

export default FundHoldings;
