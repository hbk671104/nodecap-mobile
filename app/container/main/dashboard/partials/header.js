import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, ViewPropTypes } from 'react-native'

const header = ({ style, data }) => (
	<View style={[styles.container, style]}>
		<View>
			<View style={styles.wrapper}>
				<Text style={styles.label}>投资回报率</Text>
				<Text style={[styles.title, { marginTop: 12 }]}>
					1020% <Text style={{ fontSize: 13 }}>CNY</Text>
				</Text>
			</View>
			<View style={styles.bottom}>
				<Text style={styles.subtitle}>872% USD</Text>
				<Text style={styles.subtitle}> | </Text>
				<Text style={styles.subtitle}>4234% BTC</Text>
				<Text style={styles.subtitle}> | </Text>
				<Text style={styles.subtitle}>323% ETH</Text>
			</View>
		</View>
	</View>
)

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
