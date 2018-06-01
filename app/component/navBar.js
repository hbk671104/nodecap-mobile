import React from 'react'
import PropTypes from 'prop-types'
import { View, StatusBar, Animated, Text, ViewPropTypes } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { raised } from '../utils/style'

const navBar = ({ style, barStyle, renderTitle }) => {
	return (
		<Animated.View style={[styles.container, style]}>
			<StatusBar barStyle={barStyle} />
			<View style={styles.wrapper}>{renderTitle && renderTitle()}</View>
		</Animated.View>
	)
}

navBar.defaultProps = {
	barStyle: 'light-content'
}

navBar.propTypes = {
	barStyle: PropTypes.string,
	renderTitle: PropTypes.func
}

const styles = {
	container: {
		height: 44 + getStatusBarHeight(true),
		justifyContent: 'flex-end'
	},
	wrapper: {
		height: 44,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	}
}

export const navBarHeight = styles.container.height
export default navBar
