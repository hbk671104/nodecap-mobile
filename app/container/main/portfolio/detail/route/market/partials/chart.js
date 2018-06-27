import React, { PureComponent } from 'react';
import R from 'ramda';
import moment from 'moment';
import { View, Text, TouchableOpacity } from 'react-native';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryArea } from 'victory-native';

class Chart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      period: 'H24',
    };
  }

  render() {
    const style = this.props.style;
    const trend = R.path(['stat', 'trend'])(this.props);

    if (R.isNil(trend)) {
      return null;
    }

    const data = R.pipe(
      R.path([this.state.period, 'currencies', 'CNY']),
      R.map(i => ({
        price: i.close,
        dateTime: i.dateTime,
      }))
    )(trend);

    const formatMate = {
      H24: 'HH:mm',
      W1: 'MM/DD',
      D30: 'MM/DD',
      Y1: 'YYYY/MM',
    };

    const { period } = this.state;
    return (
      <View style={[styles.container, style]}>
        <View style={styles.top.container}>
          <Text style={styles.top.title}>价格走势</Text>
          <View style={styles.periods}>
            <TouchableOpacity
              style={styles.periodWrapper}
              onPress={() => this.setState({ period: 'H24' })}
            >
              <Text style={[styles.periodItem, period === 'H24' ? styles.periodActive : null]}>
                24h
              </Text>
              {period === 'H24' && <View style={styles.periodline} />}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.periodWrapper}
              onPress={() => this.setState({ period: 'W1' })}
            >
              <Text style={[styles.periodItem, period === 'W1' ? styles.periodActive : null]}>
                周
              </Text>
              {period === 'W1' && <View style={styles.periodline} />}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.periodWrapper}
              onPress={() => this.setState({ period: 'D30' })}
            >
              <Text style={[styles.periodItem, period === 'D30' ? styles.periodActive : null]}>
                月
              </Text>
              {period === 'D30' && <View style={styles.periodline} />}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.periodWrapper}
              onPress={() => this.setState({ period: 'Y1' })}
            >
              <Text style={[styles.periodItem, period === 'Y1' ? styles.periodActive : null]}>
                年
              </Text>
              {period === 'Y1' && <View style={styles.periodline} />}
            </TouchableOpacity>
          </View>
        </View>
        <View pointerEvents="none">
          <VictoryChart height={215} padding={styles.chart} allowZoom={false}>
            <VictoryAxis
              crossAxis
              style={styles.axis.cross}
              tickFormat={x => moment(x).format(formatMate[this.state.period])}
            />
            <VictoryAxis dependentAxis style={styles.axis.dependent} />
            <VictoryArea style={styles.bar} data={data} cornerRadius={8} x="dateTime" y="price" />
            <VictoryLine
              style={styles.line}
              interpolation="natural"
              data={data}
              x="dateTime"
              y="price"
            />
          </VictoryChart>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    marginTop: 24,
  },
  chart: {
    left: 48,
    right: 24,
    bottom: 36,
    top: 24,
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
    },
    title: {
      color: '#999999',
      fontSize: 14,
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
};

export default Chart;
