import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import Accounting from 'accounting'

const numConvert = (number, disablePrefix) => {
	const num = Accounting.formatNumber(number, 0)
	if (disablePrefix) return num
	if (number > 0) {
		return `+${num}`
	} else {
		return num
	}
}

const text = props => {
	const { children, disablePrefix } = props
	if (typeof children === 'string') {
		if (!isNaN(children)) {
			return <Text {...props}>{numConvert(children, disablePrefix)}</Text>
		}
	}
	if (typeof children === 'number') {
		return <Text {...props}>{numConvert(children, disablePrefix)}</Text>
	}
	return <Text {...props}>{children}</Text>
}

text.defaultProps = {
	disablePrefix: false
}

text.propTypes = {
	disablePrefix: PropTypes.bool
}

export default text
