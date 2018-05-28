import React, { Component } from 'react'
import { Text, View, Button, Image } from 'react-native'

import AuthButton from 'component/authButton'
import styles from './style'

export default class App extends Component {
	handleOnLogin = () => {
		this.props.navigation.navigate('Main')
	}

	render() {
		return (
			<View style={styles.container}>
				<Image style={styles.logo} source={require('asset/big_logo.png')} />
				<AuthButton style={styles.button} />
			</View>
		)
	}
}
