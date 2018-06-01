import React, { Component } from 'react'
import { Text, View, ScrollView, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view'

import NavBar from 'component/navBar'
import styles from './style'

const initialLayout = {
	height: 0,
	width: Dimensions.get('window').width
}

const FirstRoute = () => (
	<View style={[styles.container, { backgroundColor: '#ff4081' }]} />
)
const SecondRoute = () => (
	<View style={[styles.container, { backgroundColor: '#673ab7' }]} />
)

@connect()
export default class Portfolio extends Component {
	state = {
		index: 0,
		routes: [
			{ key: 'first', title: 'First' },
			{ key: 'second', title: 'Second' }
		]
	}

	handleIndexChange = index => this.setState({ index })

	renderHeader = props => (
		<View>
			<NavBar />
			<TabBar {...props} />
		</View>
	)

	renderScene = SceneMap({
		first: FirstRoute,
		second: SecondRoute
	})

	render() {
		return (
			<View style={styles.container}>
				<TabViewAnimated
					navigationState={this.state}
					renderScene={this.renderScene}
					renderHeader={this.renderHeader}
					onIndexChange={this.handleIndexChange}
					initialLayout={initialLayout}
				/>
			</View>
		)
	}
}
