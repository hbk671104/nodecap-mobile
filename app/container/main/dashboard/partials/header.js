import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { View, Text, ViewPropTypes } from 'react-native'

const header = ({ style, dashboard }) => {
  const ROI = R.path(['ROI', 'CNY'])(dashboard);
  const ROIUSD = R.path(['ROI', 'USD'])(dashboard);
  const ROIBTC = R.path(['ROI', 'BTC'])(dashboard);
  const ROIETH = R.path(['ROI', 'ETH'])(dashboard);
	return (
		<View style={[styles.container, style]}>
			<View>
				<View style={styles.wrapper}>
					<Text style={styles.label}>投资回报率</Text>
					<Text style={[styles.title, { marginTop: 12 }]}>
						{ROI}% <Text style={{ fontSize: 13 }}>CNY</Text>
					</Text>
				</View>
				<View style={styles.bottom}>
					<Text style={styles.subtitle}>{ROIUSD}% USD</Text>
					<Text style={styles.subtitle}> | </Text>
					<Text style={styles.subtitle}>{ROIBTC}% BTC</Text>
					<Text style={styles.subtitle}> | </Text>
					<Text style={styles.subtitle}>{ROIETH}% ETH</Text>
				</View>
			</View>
		</View>
  )
}

const styles = {
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	wrapper: {
		alignItems: 'center'
	},
	bottom: {
		marginTop: 40,
		flexDirection: 'row',
		alignItems: 'center'
	},
	label: {
		fontSize: 14,
		color: 'white',
		fontWeight: 'bold'
	},
	title: {
		fontSize: 50,
		color: 'white',
		fontWeight: 'bold',
		textShadowColor: 'rgba(8, 112, 199, 0.27)',
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 2
	},
	subtitle: {
		fontSize: 15,
		color: 'white',
		fontWeight: 'bold'
	}
}

header.propTypes = {
	style: ViewPropTypes.style,
	data: PropTypes.object
}

export default header
