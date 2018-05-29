import {
	createSwitchNavigator,
	createStackNavigator,
	createBottomTabNavigator
} from 'react-navigation'

// Screen
import Login from 'container/auth/login'
import Dashboard from 'container/main/dashboard'

const AuthStack = createStackNavigator({
	Login: {
		screen: Login,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	}
})

const Tab = createBottomTabNavigator({ Dashboard })
const MainStack = createStackNavigator({
	Tab: {
		screen: Tab,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	}
})

export default createSwitchNavigator(
	{
		Auth: AuthStack,
		Main: MainStack
	},
	{
		initialRouteName: 'Auth'
	}
)
