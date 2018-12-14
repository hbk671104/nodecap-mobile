import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Flex } from 'antd-mobile';
import * as R from 'ramda';
import moment from 'moment';

class DappChartTable extends Component {
  render() {
    const chartData = R.pathOr([], ['data', 'week_base_stats'])(this.props);
    if (!chartData.length) {
      return null;
    }
    return (
      <View>
        <Flex style={styles.header}>
          <Text style={[styles.date, styles.headerText]}>日期</Text>
          <Text style={[styles.dau, styles.headerText]}>活跃用户</Text>
          <Text style={[styles.tx, styles.headerText]}>交易笔数</Text>
          <Text style={[styles.volume, styles.headerText]}>交易额</Text>
        </Flex>
        <View >
          {chartData.map(i => (
            <Flex style={styles.item}>
              <Text style={[styles.date, styles.dateText]}>{moment(i.date).format('MM.DD')}</Text>
              <Text style={[styles.dau, styles.otherText]}>{i.dau_last_day}</Text>
              <Text style={[styles.tx, styles.otherText]}>{i.tx_last_day}</Text>
              <Text style={[styles.volume, styles.otherText]}>{i.volume_last_day}</Text>
            </Flex>
          ))}
        </View>
      </View>
    );
  }
}

const styles = {
  header: {
    backgroundColor: '#f5f5f5',
    height: 32,
    paddingLeft: 20,
  },
  headerText: { fontSize: 12, color: 'rgba(0,0,0,0.65)', letterSpacing: 0.5 },
  date: {
    width: 98,
  },
  dau: {
    width: 88,
  },
  tx: {
    width: 88,
  },
  item: {
    paddingLeft: 20,
    height: 44,
    borderBottomColor: '#e9e9e9',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  dateText: { fontFamily: 'PingFangSC-Medium', fontSize: 12, color: 'rgba(0,0,0,0.65)' },
  otherText: { fontSize: 12, color: 'rgba(0,0,0,0.65)' },
};

DappChartTable.propTypes = {};
DappChartTable.defaultProps = {};

export default DappChartTable;
