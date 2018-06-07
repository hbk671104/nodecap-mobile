import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import moment from 'moment';
import { View, Text, ViewPropTypes, TouchableOpacity } from 'react-native';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryArea } from 'victory-native';

class returnRateChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      period: 'H24',
    };
  }

  render() {
    const style = this.props.style;
    const dashboard = this.props.dashboard;

    if (!dashboard) {
      return <View />;
    }

    const data = R.pipe(
      R.path(['ROITrend', this.state.period, 'CNY']),
      R.map(i => ({
        ROI: i.ROI,
        dateTime: i.dateTime,
      }))
    )(dashboard);

    const formatMate = {
      H24: 'HH:mm',
      W1: 'MM/DD',
      D30: 'MM/DD',
      Y1: 'YYYY/MM/DD',
    };

    const { period } = this.state;
    return (
      <View style={[styles.container, style]}>
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
        <View pointerEvents="none">
          <VictoryChart style={styles.wrapper} height={220} allowZoom={false}>
            <VictoryAxis
              crossAxis
              tickCount={4}
              style={styles.axis.cross}
              tickFormat={x => moment(x).format(formatMate[this.state.period])}
            />
            <VictoryAxis dependentAxis style={styles.axis.dependent} tickFormat={x => `${x}%`} />
            <VictoryArea style={styles.bar} data={data} cornerRadius={8} x="dateTime" y="ROI" />
            <VictoryLine
              style={styles.line}
              interpolation="natural"
              data={data}
              x="dateTime"
              y="ROI"
            />
          </VictoryChart>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    paddingHorizontal: 11,
  },
  wrapper: {
    parent: {
      // paddingHorizontal: 10
    },
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
  periods: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 15,
  },
  periodWrapper: {
    height: 25,
    marginLeft: 17,
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

returnRateChart.propTypes = {
  style: ViewPropTypes.style,
  data: PropTypes.array,
};

export default returnRateChart;
