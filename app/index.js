import { createSwitchNavigator, createStackNavigator } from 'react-navigation'

// Screen
import Login from 'container/auth/login'
import Main from 'container/main'

const AuthStack = createStackNavigator({ Login })
const MainStack = createStackNavigator({ Main })

export default createSwitchNavigator(
	{
		Auth: AuthStack,
		Main: MainStack
	},
	{
		initialRouteName: 'Auth'
	}
)
