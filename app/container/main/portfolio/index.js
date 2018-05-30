import React, { Component } from 'react'
import { Text, View, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import styles from './style'

@connect()
export default class Portfolio extends Component {
	render() {
		return (
			<ScrollView style={styles.container}>
				<Text>敬请期待</Text>
			</ScrollView>
		)
	}
}
