import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import moment from 'moment'
import { View, Text, ViewPropTypes } from 'react-native'
import {
	VictoryAxis,
	VictoryChart,
	VictoryLine,
	VictoryArea
} from 'victory-native'

class returnRateChart extends Component {
	constructor(props){
		super(props)
		this.state = {
			period: 'H24'
		}
	}
  render() {
  		const style = this.props.style
  		const dashboard = this.props.dashboard

    if(!dashboard){
      return <View></View>
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

    return (
			<View style={[styles.container, style]}>
				<View style={styles.periods}>
					<Text onPress={() => this.setState({period: 'H24'})} style={[styles.periodItem, this.state.period==='H24' ? styles.periodActive : null]}>24h</Text>
					<Text onPress={() => this.setState({period: 'W1'})} style={[styles.periodItem, this.state.period==='W1' ? styles.periodActive : null]}>周</Text>
					<Text onPress={() => this.setState({period: 'D30'})} style={[styles.periodItem, this.state.period==='D30' ? styles.periodActive : null]}>月</Text>
					<Text onPress={() => this.setState({period: 'Y1'})} style={[styles.periodItem, this.state.period==='Y1' ? styles.periodActive : null]}>年</Text>
				</View>
				<VictoryChart
					style={styles.wrapper}
					height={220}
					// domainPadding={15}
				>
					<VictoryAxis
						crossAxis
						tickCount={4}
						style={styles.axis.cross}
						tickFormat={x => moment(x).format(formatMate[this.state.period])}
					/>
					<VictoryAxis
						dependentAxis
						style={styles.axis.dependent}
						tickFormat={x => x + '%'}
					/>
					<VictoryArea
						style={styles.bar}
						data={data}
						cornerRadius={8}
						x="dateTime"
						y="ROI"
					/>
					<VictoryLine
						style={styles.line}
						interpolation="natural"
						data={data}
						x="dateTime"
						y="ROI"
					/>
				</VictoryChart>
			</View>
    )
  }
}

const styles = {
	container: {},
	wrapper: {
		parent: {
			paddingHorizontal: 10
		}
	},
	axis: {
		cross: {
			tickLabels: {
				fontSize: 11,
				fill: '#a9a9a9'
			},
			axis: { stroke: '#DDDDDD', strokeWidth: 0.5 }
		},
		dependent: {
			tickLabels: {
				fontSize: 11,
				fill: '#666666'
			},
			grid: { stroke: 'rgba(221, 221, 221, 0.8)', strokeWidth: 0.5 },
			axis: { stroke: 'transparent', strokeWidth: 0.5 }
		}
	},
	bar: {
		data: { fill: 'rgba(9, 172, 50, .2)' }
	},
	line: {
		data: { stroke: '#14B93D', strokeWidth: 0.5 }
	},
  periods: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 10,
		marginRight: 30
	},
  periodItem: {
		marginLeft: 20
	},
  periodActive: {
		color: 'blue'
	}
}

returnRateChart.propTypes = {
	style: ViewPropTypes.style,
	data: PropTypes.array
}

export default returnRateChart
