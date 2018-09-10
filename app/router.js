import React, { Component } from 'react';
import { BackHandler, Alert, Platform, Vibration } from 'react-native';
import { connect } from 'react-redux';
import RNExitApp from 'react-native-exit-app';
import * as WeChat from 'react-native-wechat';
import {
  NavigationActions,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import JPush from 'jpush-react-native';

import Loading from 'component/uikit/loading';
import BadgeTabIcon from 'component/badgeTabIcon';
import { handleOpen, handleReceive } from './utils/jpush_handler';
import { handleTabBarPress } from './utils/tabbar_handler';

// Screen
import Loader from 'container/loader';
import Landing from 'container/auth/landing';
import CreateCompany from 'container/auth/createCompany';
import Login from 'container/auth/login';
import SetPassword from 'container/auth/setPassword';
import ResetPwd from 'container/auth/resetPwd';
import Recommendation from 'container/auth/recommendation';
import Dashboard from 'container/main/dashboard';
import PublicProject from 'container/main/public_project';
import InstitutionReport from 'container/main/public_project/institution_report';
import Fund from 'container/main/fund';
import FundProject from 'container/main/fund/project';
import Portfolio from 'container/main/portfolio';
import NotificationCenter from 'container/main/notification_center';
import NotificationDetail from 'container/main/notification_center/detail';
import NotificationDetailRaw from 'container/main/notification_center/raw';
import Management from 'container/main/management';
import Self from 'container/main/self';
import CodePushPage from 'container/codepush';
import PortfolioDetail from 'container/main/portfolio/detail';
import PortfolioRecord from 'container/main/portfolio/detail/record';
import PortfolioInvestmentCreate from 'container/main/portfolio/detail/record/create';
import PortfolioDetailMatchCoinUpdate from 'container/main/portfolio/detail/coin_update';
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
import ResourceDetail from 'container/main/self/resources/detail';
import ResourceAdd from 'container/main/self/resources/add';
import Colleague from 'container/main/self/colleague';
import ColleagueSearch from 'container/main/self/colleague/search';
import ColleagueDetail from 'container/main/self/colleague/detail';
import ColleagueAdd from 'container/main/self/colleague/add';
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
    Recommendation,
  },
  {
    headerMode: 'none',
  },
);

const Tab = createBottomTabNavigator(
  {
    // Dashboard,
    PublicProject: {
      screen: PublicProject,
      navigationOptions: {
        title: '项目公海',
      },
    },
    Portfolio: {
      screen: Portfolio,
      navigationOptions: {
        title: '投资库',
      },
    },
    Fund: {
      screen: Fund,
      navigationOptions: {
        title: '基金管理',
      },
    },
    // Management: {
    //   screen: Management,
    //   navigationOptions: {
    //     title: '资产管理',
    //   },
    // },
    NotificationCenter: {
      screen: NotificationCenter,
      navigationOptions: {
        title: '项目动态',
        tabBarOnPress: ({ defaultHandler }) => {
          defaultHandler();

          // some other things
          handleTabBarPress('NotificationCenter');
        },
      },
    },
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
        return <BadgeTabIcon route={routeName} focused={focused} />;
      },
    }),
  },
);

const MainStack = createStackNavigator(
  {
    Tab,
    InstitutionReport,
    FundProject,
    PortfolioDetail,
    PortfolioRecord,
    PortfolioInvestmentCreate,
    PortfolioDetailMatchCoinUpdate,
    Search,
    CreateProject,
    ExpressCreate,
    ManualCreate,
    InvestmentCreate,
    CreateDone,
    NotificationDetail,
    NotificationDetailRaw,
    KeyManagement,
    AddHolding,
    AddWallet,
    AddExchange,
    ExchangeList,
    Scanner,
    Resources,
    ResourceSearch,
    ResourceDetail,
    ResourceAdd,
    Colleague,
    ColleagueSearch,
    ColleagueDetail,
    ColleagueAdd,
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
    Landing: Loader,
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
class Router extends Component {
  state = {
    isIOS: Platform.OS === 'ios',
  };

  componentWillMount() {
    WeChat.registerApp('wx9e13272f60a68c63');
    if (!this.state.isIOS) {
      JPush.notifyJSDidLoad(() => null);
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle);
    JPush.addReceiveOpenNotificationListener(this.handleOpenNotification);
    JPush.addReceiveNotificationListener(this.handleReceiveNotification);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle);
    JPush.removeReceiveOpenNotificationListener(this.handleOpenNotification);
    JPush.removeReceiveNotificationListener(this.handleReceiveNotification);
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

  handleOpenNotification = ({ extras }) => {
    handleOpen(extras);
  };

  handleReceiveNotification = ({ appState, extras }) => {
    if (appState === 'active') {
      Vibration.vibrate(500);
    }
    handleReceive(extras);
  };

  render() {
    const { dispatch, app, router } = this.props;
    if (app.loading) return <Loading />;

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
