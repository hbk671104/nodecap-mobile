import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'
import styles from './style'

export default class App extends Component {
	handleOnLogout = () => {
		this.props.navigation.navigate('Auth')
	}

	render() {
		return (
			<View style={styles.container}>
				<Button title="登出" onPress={this.handleOnLogout} />
			</View>
		)
	}
}
