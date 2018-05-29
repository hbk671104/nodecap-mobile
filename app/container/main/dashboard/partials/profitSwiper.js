import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, ViewPropTypes } from 'react-native'
import Swiper from 'react-native-swiper'
import { Card } from 'react-native-elements'

const profitSwiper = ({ style, data }) => (
	<View style={[styles.container, style]}>
		<Swiper height={100} showsPagination={false} loop={false}>
			<Card containerStyle={styles.card}>
				<Text>哦哦哦拉拉拉</Text>
			</Card>
			<Card containerStyle={styles.card}>
				<Text>哦哦哦拉拉拉</Text>
			</Card>
			<Card containerStyle={styles.card}>
				<Text>哦哦哦拉拉拉</Text>
			</Card>
		</Swiper>
	</View>
)

const styles = {
	container: {
		position: 'absolute',
		top: -48,
		left: 0,
		right: 0
	},
	card: {
		margin: 0,
		height: 96,
		marginHorizontal: 27.5,
		borderRadius: 2,
		borderWidth: 0,
		shadowColor: 'rgba(0, 0, 0, 0.08)',
		shadowRadius: 4,
		justifyContent: 'center',
		alignItems: 'center'
	}
}

profitSwiper.propTypes = {
	style: ViewPropTypes.style,
	data: PropTypes.array
}

export default profitSwiper
