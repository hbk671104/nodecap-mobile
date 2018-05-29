import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, ViewPropTypes } from 'react-native'
import { Card } from 'react-native-elements'

import NodeCapIcon from 'component/icon/nodecap'
import styles from './style'

const dashboardGroup = ({ style, icon, title, children }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				{!!icon && <NodeCapIcon name={icon} size={18} color="#1890FF" />}
				{'  '}
				{title}
			</Text>
			<Card containerStyle={styles.card}>{children}</Card>
		</View>
	)
}

dashboardGroup.propTypes = {
	style: ViewPropTypes.style,
	icon: PropTypes.string,
	title: PropTypes.string.isRequired
}

export default dashboardGroup
