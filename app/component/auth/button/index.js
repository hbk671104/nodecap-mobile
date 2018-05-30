import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd-mobile'
import { Text, ViewPropTypes } from 'react-native'
import styles from './style'

const authButton = ({ style, disabled, onPress, loading }) => {
	return (
		<Button
			style={[
				styles.container.normal,
				!disabled && styles.container.highlight,
				style
			]}
			loading={loading}
			disabled={disabled}
			onClick={onPress}
		>
			<Text style={[styles.title.normal, !disabled && styles.title.highlight]}>
				登 录
			</Text>
		</Button>
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
