import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  VictoryCursorContainer,
  VictoryAxis,
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryLine,
  VictoryGroup,
} from 'victory-native';
import * as R from 'ramda';
import moment from 'moment';
import { Flex } from 'antd-mobile';

class DappChart extends Component {
  render() {
    const chartData = R.reverse(R.pathOr([], ['data', 'week_base_stats'])(this.props));
    if (chartData.length < 2) {
      return null;
    }
    return (
      <View>
        <Flex style={{ marginLeft: 12 }}>
          <Flex style={styles.tip}>
            <View style={[styles.dot, { backgroundColor: '#1890FF' }]} />
            <Text style={styles.tipTitle}>活跃用户</Text>
          </Flex>
          <Flex style={styles.tip}>
            <View style={[styles.dot, { backgroundColor: '#FF7600' }]} />
            <Text style={styles.tipTitle}>交易笔数</Text>
          </Flex>
          <Flex style={styles.tip}>
            <View style={[styles.dot, { backgroundColor: '#09AC32' }]} />
            <Text style={styles.tipTitle}>交易额</Text>
          </Flex>
        </Flex>
        <VictoryChart
          height={187}
          padding={{ left: 0, right: 0, top: 20, bottom: 50 }}
          domainPadding={{ x: 25 }}
        >
          <VictoryAxis
            style={{
            grid: { stroke: '#E9E9E9', strokeWidth: StyleSheet.hairlineWidth },
            axis: { stroke: '#BCBCBC', strokeWidth: StyleSheet.hairlineWidth },
            tickLabels: { fontFamily: 'DIN Alternate', fontWeight: 'normal', fontSize: 12, color: 'rgba(0,0,0,0.65)' },
          }}
          />
          <VictoryLine
            interpolation="natural"
            data={chartData.map(i => ({
            x: moment(i.date).format('MM.DD'),
            y: Number(i.volume_last_day.replace(',', '')),
            name: '交易量',
            idx: 2,
          }))}
            style={{ data: { stroke: '#09AC32', strokeWidth: 4, strokeLinecap: 'round' } }}
          />
          <VictoryLine
            interpolation="natural"
            data={chartData.map(i => ({
            x: moment(i.date).format('MM.DD'),
            y: Number(i.tx_last_day.replace(',', '')),
            name: '交易笔数',
            idx: 1,
          }))}
            style={{ data: { stroke: '#FF7600', strokeWidth: 4, strokeLinecap: 'round' } }}
          />
          <VictoryLine
            interpolation="natural"
            data={chartData.map(i => ({
            x: moment(i.date).format('MM.DD'),
            y: Number(i.dau_last_day.replace(',', '')),
            name: '活跃用户',
            idx: 0,
          }))}
            style={{ data: { stroke: '#1890FF', strokeWidth: 4, strokeLinecap: 'round' } }}
          />
        </VictoryChart>
      </View>
    );
  }
}

const styles = {
  tip: {
    marginRight: 20,
  },
  tipTitle: { fontSize: 12, color: 'rgba(0,0,0,0.65)' },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
};
DappChart.propTypes = {};
DappChart.defaultProps = {};

export default DappChart;
