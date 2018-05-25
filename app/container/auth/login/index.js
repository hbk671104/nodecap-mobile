import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import styles from './style'

export default class App extends Component {
	handleOnLogin = () => {
		this.props.navigation.navigate('Main')
	}

	render() {
		return (
			<View style={styles.container}>
				<Button title="登录" onPress={this.handleOnLogin} />
			</View>
		)
	}
}
