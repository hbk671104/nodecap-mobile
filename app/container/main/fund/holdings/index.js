import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

import RefreshableScroll from 'component/scrollView';
import Group from '../components/holdingItem/group';
import Item from '../components/holdingItem';
import styles from './style';

@connect(({ fund, loading }, { fid }) => ({
  holding: R.pipe(
    R.pathOr([], ['funds']),
    R.find(f => `${f.id}` === fid),
    R.pathOr({}, ['holding_report']),
  )(fund),
  loading: loading.effects['fund/fetchHoldingReport'],
}))
class FundHoldings extends Component {
  componentWillMount() {
    this.loadHolding();
  }

  loadHolding = () => {
    this.props.dispatch({
      type: 'fund/fetchHoldingReport',
      id: this.props.fid,
    });
  };

  render() {
    const { loading } = this.props;
    return (
      <View style={styles.container}>
        <RefreshableScroll
          enableRefresh
          loading={loading}
          onRefresh={this.loadHolding}
        >
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
        </RefreshableScroll>
      </View>
    );
  }
}

export default FundHoldings;
