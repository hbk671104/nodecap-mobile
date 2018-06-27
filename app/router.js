import React, { PureComponent } from 'react';
import { BackHandler, Alert } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import { NavigationActions } from './utils';
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import RehydrateLoader from './component/RehydrateLoader';
import { connect } from './utils/dva';

// Screen
import Login from 'container/auth/login';
import SetPassword from 'container/auth/setPassword';
import Dashboard from 'container/main/dashboard';
import Portfolio from 'container/main/portfolio';
import Codepush from 'container/codepush';
import PortfolioDetail from 'container/main/portfolio/detail';

import NodeCapIcon from 'component/icon/nodecap';

const CodePushStack = createStackNavigator(
  {
    Loading: Codepush,
  },
  {
    headerMode: 'none',
  }
);

const AuthStack = createStackNavigator(
  {
    Login,
    SetPassword,
  },
  {
    headerMode: 'none',
  }
);

const Tab = createBottomTabNavigator(
  {
    Dashboard,
    Portfolio: {
      screen: Portfolio,
      navigationOptions: {
        title: '投资库',
      },
    },
  },
  {
    backBehavior: 'none',
    tabBarOptions: {
      style: {
        backgroundColor: 'white',
      },
      activeTintColor: '#1890FF',
      inactiveTintColor: '#999999',
    },
    navigationOptions: ({ navigation: { state } }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = state;
        switch (routeName) {
          case 'Dashboard':
            return <NodeCapIcon name="dashboard" size={25} color={tintColor} />;
          case 'Portfolio':
            return <NodeCapIcon name="investment" size={20} color={tintColor} />;
          default:
            return null;
        }
      },
    }),
  }
);
const MainStack = createStackNavigator(
  {
    Tab,
    PortfolioDetail,
  },
  {
    headerMode: 'none',
  }
);

const AppRouter = createSwitchNavigator(
  {
    Auth: AuthStack,
    Main: MainStack,
    CodePush: CodePushStack,
    Landing: RehydrateLoader,
  },
  {
    initialRouteName: 'Landing',
  }
);

function getCurrentScreen(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentScreen(route);
  }
  return route.routeName;
}

export const routerMiddleware = createReactNavigationReduxMiddleware('root', state => state.router);
const addListener = createReduxBoundAddListener('root');

@connect(({ app, router }) => ({ app, router }))
class Router extends PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle);
  }

  backHandle = () => {
    const { dispatch, router } = this.props;
    const subRouter = router.routes[router.index];
    if (subRouter.index === 0) {
      Alert.alert('提示', '确认退出 Hotnode ？', [
        { text: '确认', onPress: () => RNExitApp.exitApp() },
        { text: '取消', style: 'cancel' },
      ]);
    }

    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { dispatch, app, router } = this.props;
    if (app.loading) return null;

    const navigation = {
      dispatch,
      state: router,
      addListener,
    };
    return <AppRouter navigation={navigation} />;
  }
}

export function routerReducer(state, action = {}) {
  return AppRouter.router.getStateForAction(action, state);
}

export default Router;
