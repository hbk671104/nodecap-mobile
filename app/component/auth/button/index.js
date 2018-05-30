import React from 'react'
import PropTypes from 'prop-types'
import {
	View,
	TouchableOpacity,
	Text,
	ViewPropTypes,
	ActivityIndicator
} from 'react-native'
import styles from './style'

const authButton = ({ style, disabled, loading, onPress }) => {
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
			{loading ? (
				<ActivityIndicator color="white" />
			) : (
				<Text
					style={[styles.title.normal, !disabled && styles.title.highlight]}
				>
					登 录
				</Text>
			)}
		</Wrapper>
	)
}

authButton.defaultProps = {
	disabled: true,
	loading: false
}

authButton.propTypes = {
	style: ViewPropTypes.style,
	disabled: PropTypes.bool,
	loading: PropTypes.bool,
	onPress: PropTypes.func
}

export default authButton
