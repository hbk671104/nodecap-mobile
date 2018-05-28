import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, ViewPropTypes } from 'react-native'
import styles from './style'

const authInput = ({ style, title, placeholder, inputProps }) => (
	<View style={[style]}>
		<Text style={styles.title}>{title}</Text>
		<TextInput
			{...inputProps}
			style={styles.input}
			placeholder={placeholder}
			placeholderTextColor="#999999"
		/>
	</View>
)

authInput.defaultProps = {
	placeholder: '请输入文字'
}

authInput.propTypes = {
	style: ViewPropTypes.style,
	title: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	inputProps: PropTypes.object
}

export default authInput
