import React, { PureComponent } from 'react';
import { BackHandler, Image } from 'react-native';
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
import Management from 'container/main/management';
import Self from 'container/main/self';
import Codepush from 'container/codepush';
import PortfolioDetail from 'container/main/portfolio/detail';

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
    Management: {
      screen: Management,
      navigationOptions: {
        title: '资产管理',
      },
    },
    Self: {
      screen: Self,
      navigationOptions: {
        title: '我的机构',
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
      tabBarIcon: ({ focused }) => {
        const { routeName } = state;
        switch (routeName) {
          case 'Dashboard':
            return (
              <Image
                source={
                  focused
                    ? require('asset/tabIcon/dashboard_highlight.png')
                    : require('asset/tabIcon/dashboard.png')
                }
              />
            );
          case 'Portfolio':
            return (
              <Image
                source={
                  focused
                    ? require('asset/tabIcon/portfolio_highlight.png')
                    : require('asset/tabIcon/portfolio.png')
                }
              />
            );
          case 'Management':
            return (
              <Image
                source={
                  focused
                    ? require('asset/tabIcon/asset_highlight.png')
                    : require('asset/tabIcon/asset.png')
                }
              />
            );
          case 'Self':
            return (
              <Image
                source={
                  focused
                    ? require('asset/tabIcon/me_highlight.png')
                    : require('asset/tabIcon/me.png')
                }
              />
            );
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
    const currentScreen = getCurrentScreen(this.props.router);
    if (currentScreen === 'Login') {
      return true;
    }
    if (currentScreen !== 'Tab') {
      this.props.dispatch(NavigationActions.back());
      return true;
    }
    return false;
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
