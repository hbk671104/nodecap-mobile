import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, ViewPropTypes } from 'react-native'
import {
	VictoryBar,
	VictoryAxis,
	VictoryChart,
	VictoryLine
} from 'victory-native'

const returnRateChart = ({ style, data }) => (
	<View style={[styles.container, style]}>
		<VictoryChart
			style={styles.wrapper}
			height={220}
			// domainPadding={15}
		>
			<VictoryAxis crossAxis style={styles.axis.cross} />
			<VictoryAxis
				dependentAxis
				style={styles.axis.dependent}
				tickFormat={x => x + '%'}
			/>
			<VictoryBar
				style={styles.bar}
				data={data}
				cornerRadius={8}
				x="quarter"
				y="earnings"
			/>
			<VictoryLine
				style={styles.line}
				interpolation="natural"
				data={data}
				x="quarter"
				y="earnings"
			/>
		</VictoryChart>
	</View>
)

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
				fill: '#666666'
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
		data: { fill: '#EAF8ED' }
	},
	line: {
		data: { stroke: '#09AC32', strokeWidth: 3 }
	}
}

returnRateChart.defaultProps = {
	data: [
		{ quarter: '5/22', earnings: 200 },
		{ quarter: '5/23', earnings: 400 },
		{ quarter: '5/24', earnings: 100 },
		{ quarter: '5/25', earnings: 500 },
		{ quarter: '5/26', earnings: 600 },
		{ quarter: '5/27', earnings: 200 },
		{ quarter: '5/28', earnings: 800 }
	]
}

returnRateChart.propTypes = {
	style: ViewPropTypes.style,
	data: PropTypes.array
}

export default returnRateChart
