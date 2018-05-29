import React, { PureComponent } from 'react'
import { BackHandler, View } from 'react-native'
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'
import RehydrateLoader from './component/RehydrateLoader'
import { MenuContext } from 'react-native-menu';

import {connect} from './utils/dva'
// Screen
import Login from 'container/auth/login'
import Dashboard from 'container/main/dashboard'

const AuthStack = createStackNavigator(
  {
    Login
  },
  {
    headerMode: 'none'
  }
)

const Tab = createBottomTabNavigator({ Dashboard })
const MainStack = createStackNavigator(
  {
    Tab
  },
  {
    headerMode: 'none'
  }
)

const AppRouter = createSwitchNavigator(
  {
    Auth: AuthStack,
    Main: MainStack,
    Landing: RehydrateLoader
  },
  {
    initialRouteName: 'Landing'
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
      <MenuContext style={{ flex: 1 }}>
        <AppRouter navigation={navigation} />
      </MenuContext>
    )
  }
}

export function routerReducer(state, action = {}) {
  return AppRouter.router.getStateForAction(action, state)
}

export default Router
