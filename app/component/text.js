import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

const text = props => {
	const { children } = props
	if (!Number.isNaN(children)) {
		const num = number => {
			if (number > 0) {
				return `+${number}`
			} else if (number < 0) {
				return `-${number}`
			} else {
				return number
			}
		}
		return <Text {...props}>{num(children)}</Text>
	}
	return <Text {...props}>{children}</Text>
}

export default text
