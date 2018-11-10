import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import R from 'ramda';
import { Flex } from 'antd-mobile';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryArea,
} from 'victory-native';
import moment from 'moment';

import Touchable from 'component/uikit/touchable';

const dateSelector = ({ range, onSelect }) => (
  <Flex>
    <Touchable onPress={onSelect('7_days')}>
      <Text
        style={[
          styles.selector.text,
          range === '7_days' && styles.selector.highlight,
        ]}
      >
        周
      </Text>
    </Touchable>
    <Touchable onPress={onSelect('30_days')}>
      <Text
        style={[
          styles.selector.text,
          range === '30_days' && styles.selector.highlight,
        ]}
      >
        月
      </Text>
    </Touchable>
    <Touchable onPress={onSelect('365_days')}>
      <Text
        style={[
          styles.selector.text,
          range === '365_days' && styles.selector.highlight,
        ]}
      >
        年
      </Text>
    </Touchable>
    <Touchable onPress={onSelect('max_days')}>
      <Text
        style={[
          styles.selector.text,
          range === 'max_days' && styles.selector.highlight,
        ]}
      >
        全部
      </Text>
    </Touchable>
  </Flex>
);

class CoinHeader extends PureComponent {
  state = {
    range: '7_days',
  };

  handleDateSelect = range => () => {
    this.setState({ range });
  };

  render() {
    const { global } = this.props;
    const { range } = this.state;
    const date = R.pathOr('--', ['date'])(global);
    const count = R.pathOr('--', ['count'])(global);
    const trend = R.pipe(
      R.pathOr([], [range]),
      R.map(t => ({
        x: t.date,
        y: t.count,
      })),
    )(global);

    return (
      <View style={styles.container}>
        <View style={styles.top.container}>
          <Flex align="center" justify="space-between">
            <Text style={styles.top.title}>项目数</Text>
            <Text style={styles.top.cutoff}>截止至 {date}</Text>
          </Flex>
          <Text style={styles.top.content}>{count}</Text>
        </View>
        {R.length(trend) > 1 && (
          <View style={styles.chart.container}>
            <Flex align="center" justify="space-between">
              <Text style={styles.chart.title}>单位：个</Text>
              {dateSelector({ range, onSelect: this.handleDateSelect })}
            </Flex>
            <VictoryChart
              height={192}
              padding={styles.chart.padding}
              domainPadding={{ x: [16, 8], y: [0, 8] }}
            >
              <VictoryAxis
                crossAxis
                style={styles.chart.axis.cross}
                tickFormat={x => moment(x).format('MM.DD')}
              />
              <VictoryAxis dependentAxis style={styles.chart.axis.dependent} />
              <VictoryArea
                interpolation="basis"
                style={styles.chart.area}
                data={trend}
              />
              <VictoryLine
                interpolation="basis"
                style={styles.chart.line}
                data={trend}
              />
            </VictoryChart>
          </View>
        )}
      </View>
    );
  }
}

const styles = {
  container: {},
  top: {
    container: {
      padding: 12,
    },
    title: {
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 'bold',
      fontSize: 15,
    },
    cutoff: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 11,
    },
    content: {
      marginTop: 12,
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 'bold',
      fontSize: 26,
    },
  },
  chart: {
    container: {
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    title: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 11,
    },
    padding: {
      top: 12,
      left: 36,
      right: 24,
      bottom: 24,
    },
    axis: {
      cross: {
        tickLabels: {
          fontSize: 11,
          fill: 'rgba(0, 0, 0, 0.45)',
        },
        axis: { stroke: '#979797', strokeWidth: StyleSheet.hairlineWidth },
      },
      dependent: {
        tickLabels: {
          fontSize: 10,
          fill: 'rgba(0, 0, 0, 0.45)',
        },
        grid: { stroke: '#EFEFEF', strokeWidth: StyleSheet.hairlineWidth },
        axis: { stroke: 'none', strokeWidth: StyleSheet.hairlineWidth },
      },
    },
    line: {
      data: {
        stroke: '#1890FF',
        strokeWidth: 4,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    },
    area: {
      data: { fill: '#ECF6FF' },
    },
  },
  selector: {
    text: {
      fontSize: 12,
      color: '#B8CBDD',
      fontWeight: 'bold',
      marginLeft: 16,
    },
    highlight: {
      fontSize: 13,
      color: '#1890FF',
      marginBottom: 1,
    },
  },
};

export default CoinHeader;
