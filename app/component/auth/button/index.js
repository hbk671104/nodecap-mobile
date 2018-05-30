import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd-mobile'
import { Text, ViewPropTypes ,
	ActivityIndicator} from 'react-native'
import styles from './style'

const authButton = ({ style, disabled, loading, onPress, loading }) => {
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
			{loading ? (
				<ActivityIndicator color="white" />
			) : (
				<Text
					style={[styles.title.normal, !disabled && styles.title.highlight]}
				>
					登 录
				</Text>
			)}
		</Button>
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
