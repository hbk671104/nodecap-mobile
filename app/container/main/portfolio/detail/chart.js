import React, { PureComponent } from 'react';
import R from 'ramda';
import moment from 'moment';
import { View, Text, StyleSheet } from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryArea,
} from 'victory-native';

import PlaceHolder from 'component/loading_placeholder';
import Touchable from 'component/uikit/touchable';
import { priceFormat } from 'component/price';

import Empty from './page/empty';

const chartHeight = 215;
const barHeight = 20;

class Chart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      period: '24_hours',
    };
  }

  handlePeriodSwitch = period => () => {
    this.setState({ period }, () => {
      this.props.track('价格走势时间跨度');
    });
  };

  renderSwitch = () => (
    <View style={styles.top.container}>
      <Text style={styles.top.title}>价格走势</Text>
      <View style={styles.periods}>
        <View style={styles.periodWrapper}>
          <Touchable borderless onPress={this.handlePeriodSwitch('24_hours')}>
            <Text
              style={[
                styles.periodItem,
                this.state.period === '24_hours' && styles.periodActive,
              ]}
            >
              24h
            </Text>
          </Touchable>
          {this.state.period === '24_hours' && (
            <View style={styles.periodline} />
          )}
        </View>
        <View style={styles.periodWrapper}>
          <Touchable borderless onPress={this.handlePeriodSwitch('7_days')}>
            <Text
              style={[
                styles.periodItem,
                this.state.period === '7_days' && styles.periodActive,
              ]}
            >
              周
            </Text>
          </Touchable>
          {this.state.period === '7_days' && <View style={styles.periodline} />}
        </View>
        <View style={styles.periodWrapper}>
          <Touchable borderless onPress={this.handlePeriodSwitch('30_days')}>
            <Text
              style={[
                styles.periodItem,
                this.state.period === '30_days' ? styles.periodActive : null,
              ]}
            >
              月
            </Text>
          </Touchable>
          {this.state.period === '30_days' && (
            <View style={styles.periodline} />
          )}
        </View>
        <View style={styles.periodWrapper}>
          <Touchable borderless onPress={this.handlePeriodSwitch('365_days')}>
            <Text
              style={[
                styles.periodItem,
                this.state.period === '365_days' ? styles.periodActive : null,
              ]}
            >
              年
            </Text>
          </Touchable>
          {this.state.period === '365_days' && (
            <View style={styles.periodline} />
          )}
        </View>
      </View>
    </View>
  );

  renderChart = trend => {
    const data = R.pipe(R.path([this.state.period]))(trend);
    if (R.length(data) <= 1) {
      return (
        <View style={styles.empty.container}>
          <Empty title="暂无数据" />
        </View>
      );
    }

    const currentSym = this.props.base_symbol;
    const chartPadding = {
      ...styles.chart,
      ...(currentSym === 'USD' || currentSym === 'USDT' || currentSym === 'CNY'
        ? { left: 48 }
        : {}),
    };

    const formatMate = {
      '24_hours': 'HH:mm',
      '7_days': 'MM/DD',
      '30_days': 'MM/DD',
      '365_days': 'YYYY/MM',
    };
    return (
      <View pointerEvents="none">
        <VictoryChart
          height={chartHeight}
          padding={chartPadding}
          allowZoom={false}
        >
          <VictoryAxis
            crossAxis
            style={styles.axis.cross}
            tickFormat={x => moment(x).format(formatMate[this.state.period])}
          />
          <VictoryAxis
            dependentAxis
            style={styles.axis.dependent}
            tickFormat={y => priceFormat({ symbol: currentSym, text: y })}
          />
          <VictoryLine
            animate
            style={styles.line}
            interpolation="natural"
            data={data}
            x="datetime"
            y="price"
          />
          <VictoryArea
            animate
            style={styles.bar}
            interpolation="natural"
            data={data}
            x="datetime"
            y="price"
          />
        </VictoryChart>
      </View>
    );
  };

  render() {
    const { can_calculate, stat_loading } = this.props;
    if (R.not(can_calculate)) {
      return null;
    }
    const trend = R.path(['portfolio', 'stats', 'trend'])(this.props);
    return (
      <PlaceHolder
        style={styles.placeholder}
        onReady={R.not(R.isNil(trend)) && !stat_loading}
        animate="shine"
      >
        <View style={[styles.container, this.props.style]}>
          {this.renderSwitch()}
          {this.renderChart(trend)}
        </View>
      </PlaceHolder>
    );
  }
}

const styles = {
  placeholder: {
    height: barHeight + chartHeight,
    marginHorizontal: 12,
    marginTop: 20,
  },
  container: {
    paddingBottom: 12,
    marginTop: 20,
    marginHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  chart: {
    left: 72,
    right: 36,
    bottom: 30,
    top: 36,
  },
  axis: {
    cross: {
      tickLabels: {
        fontSize: 11,
        fill: '#a9a9a9',
      },
      axis: { stroke: '#DDDDDD', strokeWidth: 0.5 },
    },
    dependent: {
      tickLabels: {
        fontSize: 11,
        fill: '#666666',
      },
      grid: { stroke: 'rgba(221, 221, 221, 0.8)', strokeWidth: 0.5 },
      axis: { stroke: 'transparent', strokeWidth: 0.5 },
    },
  },
  bar: {
    data: { fill: 'rgba(9, 172, 50, .2)' },
  },
  line: {
    data: { stroke: '#14B93D', strokeWidth: 0.5 },
  },
  top: {
    container: {
      height: barHeight,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // paddingHorizontal: 12,
    },
    title: {
      color: '#999999',
      fontSize: 14,
      fontWeight: '200',
    },
  },
  periods: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  periodWrapper: {
    height: 24,
    marginLeft: 16,
    justifyContent: 'center',
  },
  periodline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#1890FF',
    borderRadius: 1,
  },
  periodItem: {
    color: '#666666',
    fontSize: 13,
  },
  periodActive: {
    color: '#1890FF',
  },
  empty: {
    container: {
      height: chartHeight,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};

export default Chart;
