import React, { Component } from 'react';
import { View } from 'react-native';
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
    const { loading, holding } = this.props;

    const balance = R.pathOr({}, ['balance'])(holding);
    const shipment = R.pathOr({}, ['shipment'])(holding);
    const storage = R.pathOr({}, ['storage'])(holding);
    const balanceList = R.pathOr([], ['list'])(balance);
    const shipmentList = R.pathOr([], ['list'])(shipment);
    const storageList = R.pathOr([], ['list'])(storage);

    return (
      <View style={styles.container}>
        <RefreshableScroll
          enableRefresh
          loading={loading}
          onRefresh={this.loadHolding}
        >
          <Group
            title="剩余可投"
            item={{
              ...balance,
              invest_symbol: R.pathOr('ETH', ['valuation', 'symbol'])(balance),
              valuation: R.pathOr({}, ['valuation', 'valuation'])(balance),
            }}
          >
            {R.addIndex(R.map)((b, i) => (
              <Item
                key={i}
                item={{ ...b, invest_symbol: R.pathOr('--', ['symbol'])(b) }}
                noBottomBorder={i === R.length(balanceList) - 1}
              />
            ))(balanceList)}
          </Group>
          <Group title="已卖出部分" item={shipment}>
            {R.addIndex(R.map)((b, i) => (
              <Item
                key={i}
                item={{
                  ...b,
                  invest_symbol: R.pathOr('--', ['invest_symbol'])(shipment),
                }}
                noBottomBorder={i === R.length(shipmentList) - 1}
              />
            ))(shipmentList)}
          </Group>
          <Group title="当前持有">
            {R.addIndex(R.map)((b, i) => (
              <Item
                key={i}
                item={{
                  ...b,
                  invest_symbol: R.pathOr('--', ['invest_symbol'])(storage),
                }}
              />
            ))(storageList)}
          </Group>
        </RefreshableScroll>
      </View>
    );
  }
}

export default FundHoldings;
