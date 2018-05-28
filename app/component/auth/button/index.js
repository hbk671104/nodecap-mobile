import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text, ViewPropTypes } from 'react-native'
import styles from './style'

const authButton = ({ style, disabled, onPress }) => {
	const Wrapper = disabled ? View : TouchableOpacity
	return (
		<Wrapper
			style={[
				styles.container.normal,
				!disabled && styles.container.highlight,
				style
			]}
			onPress={onPress}
		>
			<Text style={[styles.title.normal, !disabled && styles.title.highlight]}>
				登 录
			</Text>
		</Wrapper>
	)
}

authButton.defaultProps = {
	disabled: true
}

authButton.propTypes = {
	style: ViewPropTypes.style,
	disabled: PropTypes.bool,
	onPress: PropTypes.func
}

export default authButton
