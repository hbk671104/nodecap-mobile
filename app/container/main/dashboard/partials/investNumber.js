import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, ViewPropTypes } from 'react-native'

const investNumber = ({ style, data }) => (
	<View style={[styles.container, style]}>
		<View style={styles.left.container}>
			<View>
				<Text style={styles.left.title}>251</Text>
				<View style={{ flexDirection: 'row', marginTop: 16 }}>
					<Text style={styles.left.subtitle}>
						本周{'  '}12 {'     '} 本月{'  '}75
					</Text>
				</View>
			</View>
		</View>
		<View style={styles.right.container}>
			<Text>此处有图</Text>
		</View>
	</View>
)

const styles = {
	container: {
		flexDirection: 'row',
		height: 123,
		paddingHorizontal: 22
	},
	left: {
		container: {
			flex: 1,
			justifyContent: 'center'
		},
		title: {
			fontSize: 30,
			color: '#333333',
			fontWeight: 'bold'
		},
		subtitle: {
			fontSize: 14,
			color: '#333333'
		}
	},
	right: {
		container: {
			justifyContent: 'center'
		}
	}
}

investNumber.propTypes = {
	style: ViewPropTypes.style,
	data: PropTypes.object
}

export default investNumber
