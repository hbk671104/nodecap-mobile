import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Flex } from 'antd-mobile';
import * as R from 'ramda';

const window = Dimensions.get('window');

class Trade extends Component {
  render() {
    const base = R.pathOr({}, ['data', 'base_stats'])(this.props);
    const unit = R.pathOr('', ['data', 'topic', 'name'])(this.props).toUpperCase();
    return (
      <Flex style={{ flexWrap: 'wrap' }}>
        <View style={styles.item}>
          <Flex>
            <Text style={[styles.tip, { backgroundColor: '#1890FF' }]}>24H</Text>
            <Text style={styles.title}>交易额</Text>
          </Flex>
          <Text style={styles.amount}>{base.volume_last_day} {unit}</Text>
        </View>
        <View style={[styles.item, { marginLeft: 10 }]}>
          <Flex>
            <Text style={[styles.tip, { backgroundColor: '#1890FF' }]}>24H</Text>
            <Text style={styles.title}>交易笔数</Text>
          </Flex>
          <Text style={styles.amount}>{base.tx_last_day}</Text>
        </View>
        <View style={styles.item}>
          <Flex>
            <Text style={[styles.tip, { backgroundColor: '#FF7600' }]}>7D</Text>
            <Text style={styles.title}>交易额</Text>
          </Flex>
          <Text style={styles.amount}>{base.volume_last_week} {unit}</Text>
        </View>
        <View style={[styles.item, { marginLeft: 10 }]}>
          <Flex>
            <Text style={[styles.tip, { backgroundColor: '#FF7600' }]}>7D</Text>
            <Text style={styles.title}>交易笔数</Text>
          </Flex>
          <Text style={styles.amount}>{base.tx_last_week}</Text>
        </View>
      </Flex>
    );
  }
}

const styles = {
  item: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderColor: '#e9e9e9',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    width: (window.width - 36) / 2,
    marginBottom: 12,
  },
  tip: {
    padding: 2,
    color: 'white',
    fontSize: 11,
    borderRadius: 2,
    marginRight: 5,
  },
  amount: { fontFamily: 'PingFangSC-Medium', fontSize: 16, color: 'rgba(0,0,0,0.65)', marginTop: 10 },
  title: { fontSize: 13, color: 'rgba(0,0,0,0.65)' },
};
Trade.propTypes = {};
Trade.defaultProps = {};

export default Trade;
