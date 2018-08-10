import React, { PureComponent } from 'react';
import { BackHandler, Linking, Alert, Image } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import RehydrateLoader from './component/RehydrateLoader';
import { connect } from './utils/dva';
import { NavigationActions } from './utils';

// Screen
import Landing from 'container/auth/landing';
import CreateCompany from 'container/auth/createCompany';
import Login from 'container/auth/login';
import SetPassword from 'container/auth/setPassword';
import ResetPwd from 'container/auth/resetPwd';
import Dashboard from 'container/main/dashboard';
import Portfolio from 'container/main/portfolio';
import Management from 'container/main/management';
import Self from 'container/main/self';
import CodePushPage from 'container/codepush';
import PortfolioDetail from 'container/main/portfolio/detail';
import Search from 'container/main/portfolio/search';
import CreateProject from 'container/main/portfolio/create';
import ExpressCreate from 'container/main/portfolio/create/express';
import ManualCreate from 'container/main/portfolio/create/manual';
import InvestmentCreate from 'container/main/portfolio/create/investment';
import CreateDone from 'container/main/portfolio/create/done';
import KeyManagement from 'container/main/management/key';
import AddHolding from 'container/main/management/add';
import AddWallet from 'container/main/management/add/wallet';
import AddExchange from 'container/main/management/add/exchange';
import ExchangeList from 'container/main/management/add/exchangeList';
import Scanner from 'container/main/management/add/scanner';
import Resources from 'container/main/self/resources';
import ResourceSearch from 'container/main/self/resources/search';
import Settings from 'container/main/self/settings';
import ChangeLog from 'container/main/self/settings/changelog';
import MyProfile from 'container/main/self/profile/mine';
import MyCompany from 'container/main/self/profile/company';
import EditProfile from 'container/main/self/profile/edit';

const AuthStack = createStackNavigator(
  {
    Landing,
    CreateCompany,
    Login,
    SetPassword,
    ResetPwd,
  },
  {
    headerMode: 'none',
  },
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
    // Management: {
    //   screen: Management,
    //   navigationOptions: {
    //     title: '资产管理',
    //   },
    // },
    Self: {
      screen: Self,
      navigationOptions: {
        title: '我的',
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
  },
);
const MainStack = createStackNavigator(
  {
    Tab,
    PortfolioDetail,
    Search,
    CreateProject,
    ExpressCreate,
    ManualCreate,
    InvestmentCreate,
    CreateDone,
    KeyManagement,
    AddHolding,
    AddWallet,
    AddExchange,
    ExchangeList,
    Scanner,
    Resources,
    ResourceSearch,
    Settings,
    ChangeLog,
    MyProfile,
    MyCompany,
    EditProfile,
  },
  {
    headerMode: 'none',
  },
);

const AppRouter = createSwitchNavigator(
  {
    Auth: AuthStack,
    Main: MainStack,
    CodePush: CodePushPage,
    Landing: RehydrateLoader,
  },
  {
    initialRouteName: 'Landing',
  },
);

export function getCurrentScreen(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentScreen(route);
  }
  return route.routeName;
}

export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router,
);
const addListener = createReduxBoundAddListener('root');

@connect(({ app, router }) => ({ app, router }))
class Router extends PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle);
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle);
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = ({ url }) => {
    console.log(url);
  };

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
    return (
      <ActionSheetProvider>
        <AppRouter navigation={navigation} />
      </ActionSheetProvider>
    );
  }
}

export function routerReducer(state, action = {}) {
  return AppRouter.router.getStateForAction(action, state);
}

export default Router;
