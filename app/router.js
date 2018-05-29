import React, { PureComponent } from 'react'
import { BackHandler } from 'react-native'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'
import RehydrateLoader from './component/RehydrateLoader'

import {connect} from './utils/dva'
// Screen
import Login from 'container/auth/login'
import Main from 'container/main'

const AuthStack = createStackNavigator({
	Login: {
		screen: Login,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	}
})

const MainStack = createStackNavigator({ Main })

const MainRouter = createSwitchNavigator(
	{
		Auth: AuthStack,
		Main: MainStack
	},
	{
		initialRouteName: 'Auth'
	}
)


function getCurrentScreen(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentScreen(route)
  }
  return route.routeName
}

export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router
)
const addListener = createReduxBoundAddListener('root')

@connect(({ app, router }) => ({ app, router }))
class Router extends PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle = () => {
    const currentScreen = getCurrentScreen(this.props.router)
    if (currentScreen === 'Login') {
      return true
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  render() {
    const { dispatch, app, router } = this.props
    if (app.loading) return null

    const navigation = {
      dispatch,
      state: router,
      addListener,
    }
    return (
      <RehydrateLoader store={this.props.store} router={this.props.router}>
        <MainRouter navigation={navigation} />
      </RehydrateLoader>
    )
  }
}

export function routerReducer(state, action = {}) {
  return MainRouter.router.getStateForAction(action, state)
}

export default Router
