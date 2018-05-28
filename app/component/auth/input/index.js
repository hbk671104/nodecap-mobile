import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, ViewPropTypes } from 'react-native'
import styles from './style'

const authInput = ({ style, title, inputProps }) => (
	<View style={[style]}>
		<Text style={styles.title}>{title}</Text>
		<TextInput {...inputProps} style={styles.input} />
	</View>
)

authInput.defaultProps = {}

authInput.propTypes = {
	style: ViewPropTypes.style,
	title: PropTypes.string.isRequired,
	inputProps: PropTypes.object
}

export default authInput
