import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import { persistStore } from 'redux-persist'
import { connect } from '../../utils/dva'
import { NavigationActions } from '../../utils'
import store from '../../../index'
import { initializeListeners } from 'react-navigation-redux-helpers'

@connect(({ global, login }) => ({
	constants: global.constants,
	isLogin: !!login.token
}))
class RehydrateLoader extends Component {
	constructor() {
		super()
		this.state = { rehydrated: false }
	}

	componentWillMount() {
		this.props.dispatch({
			type: 'global/startup'
		})

		persistStore(
			store,
			{
				storage: AsyncStorage,
				blacklist: ['loading', 'router', 'project']
			},
			async () => {
				if (this.props.isLogin) {
					await this.props.dispatch({
						type: 'global/initial'
					})
					this.props.dispatch(
						NavigationActions.navigate({
							routeName: 'Main'
						})
					)
				} else {
					this.props.dispatch(
						NavigationActions.navigate({
							routeName: 'Auth'
						})
					)
				}
				initializeListeners('root', this.props.router)

				// Splash Screen came off
			}
		)
	}

	render() {
		if (!this.state.rehydrated || !this.props.constants) {
			return <View />
		}
		return <View />
	}
}

export default RehydrateLoader
