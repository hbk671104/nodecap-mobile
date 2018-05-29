import {
	createSwitchNavigator,
	createStackNavigator,
	createBottomTabNavigator
} from 'react-navigation'

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

export default createSwitchNavigator(
	{
		Auth: AuthStack,
		Main: MainStack
	},
	{
		initialRouteName: 'Auth'
	}
)
