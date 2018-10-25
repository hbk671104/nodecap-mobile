import React, { Component } from 'react';
import { BackHandler, Alert, View, Platform, Vibration } from 'react-native';
import { connect } from 'react-redux';
import RNExitApp from 'react-native-exit-app';
import * as WeChat from 'react-native-wechat';
import R from 'ramda';
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
import { withNetworkConnectivity } from 'react-native-offline';
import { Toast } from 'antd-mobile';

import Loading from 'component/uikit/loading';
import BadgeTabIcon from 'component/badgeTabIcon';
import { handleOpen, handleReceive } from './utils/jpush_handler';
import { shadow } from './utils/style';
import { EventEmitter } from 'fbemitter';
// Screen
import Loader from 'container/loader';
// import Landing from 'container/auth/landing';
// import CreateCompany from 'container/auth/createCompany';
import Login from 'container/auth/login';
// import LoginModal from 'container/auth/login/modal';
// import SetPassword from 'container/auth/setPassword';
// import ResetPwd from 'container/auth/resetPwd';
// import Recommendation from 'container/auth/recommendation';
// import Dashboard from 'container/main/dashboard';
import PublicProject from 'container/main/public_project';
import PublicProjectSearch from 'container/main/public_project/search';
import PublicProjectDetail from 'container/main/public_project/detail';
import CommentCoin from 'container/main/public_project/comment';
import InstitutionReport from 'container/main/public_project/institution_report';
import InstitutionReportSet from 'container/main/public_project/institution_report/report_set';
import InstitutionReportDetail from 'container/main/public_project/institution_report/detail';
import Fund from 'container/main/fund';
import FundProject from 'container/main/fund/project';
import Portfolio from 'container/main/portfolio';
import NotificationCenter from 'container/main/notification_center';
import NotificationDetail from 'container/main/notification_center/detail';
import NotificationDetailRaw from 'container/main/notification_center/raw';
// import Management from 'container/main/management';
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
import MyProfile from 'container/main/self/profile/mine';
import MyCompany from 'container/main/self/profile/company';
import EditProfile from 'container/main/self/profile/edit';
import Feedback from 'container/main/self/feedback';
import MeetingList from 'container/main/activity';
import MeetingListRaw from 'container/main/activity/raw';
import Announcement from 'container/main/announcement/index';
import ProjectRepo from 'container/main/project_repo';
import Institution from 'container/main/institution';
import InstitutionDetail from 'container/main/institution/detail';
import Service from 'container/main/service/wrapper';
import WhitePaper from 'container/main/public_project/whitepaper';
import WebPage from 'container/webview';

// Individual exclusive
import Favored from 'container/individual/favored';
import CoinRecord from 'container/individual/public_project/detail/record';
import CoinRecordCreate from 'container/individual/public_project/detail/record/create';
import IndividualPublicProjectDetail from 'container/individual/public_project/detail';
import IndividualSelf from 'container/individual/self';
import IndividualProfile from 'container/individual/self/profile/mine';
import IndividualEditProfile from 'container/individual/self/profile/edit';
import Settings from 'container/individual/self/settings';
import ChangeLog from 'container/individual/self/settings/changelog';
import MyProject from 'container/individual/self/my_project';
import CreateMyProject from 'container/individual/self/my_project/create';
import CreateMyProjectSearch from 'container/individual/self/my_project/create/search';
import CreateMyProjectNormal from 'container/individual/self/my_project/create/normal';
import CreateMyProjectBasicInfo from 'container/individual/self/my_project/create/normal/steps/basic';
import CreateMyProjectDescription from 'container/individual/self/my_project/create/normal/steps/description';
import CreateMyProjectTeam from 'container/individual/self/my_project/create/normal/steps/team';
import CreateMyProjectSocial from 'container/individual/self/my_project/create/normal/steps/social';
import CreateMyProjectRoadMap from 'container/individual/self/my_project/create/normal/steps/roadmap';
import CreateMyProjectFunding from 'container/individual/self/my_project/create/normal/steps/funding';
import ClaimMyProject from 'container/individual/self/my_project/create/claim';
import CreateMyProjectDone from 'container/individual/self/my_project/create/done';
import CreateMyProjectTagSelect from 'container/individual/self/my_project/create/tag_select';
import MyInstitution from 'container/individual/self/my_institution';
import CreateMyInstitution from 'container/individual/self/my_institution/create';
import CreateMyInstitutionBasicInfo from 'container/individual/self/my_institution/create/basic';
import CreateMyInstitutionDescription from 'container/individual/self/my_institution/create/description';
import CreateMyInstitutionTeam from 'container/individual/self/my_institution/create/team';
import CreateMyInstitutionServedProject from 'container/individual/self/my_institution/create/served_project';
import CreateMyInstitutionSearch from 'container/individual/self/my_institution/search';
import ClaimMyInstitution from 'container/individual/self/my_institution/claim';
import CreateMyInstitutionDone from 'container/individual/self/my_institution/done';

const tabBarOnPress = ({ navigation, defaultHandler }) => {
  RouterEmitter.emit('changeTab', navigation.state);
  defaultHandler();
};

const Tab = createBottomTabNavigator(
  {
    // Dashboard,
    PublicProject: {
      screen: PublicProject,
      navigationOptions: {
        title: '首页',
      },
    },
    ProjectRepo: {
      screen: ProjectRepo,
      navigationOptions: ({ navigation }) => {
        const tabBarVisible = navigation.getParam('tabBarVisible', true);
        return {
          title: '项目大全',
          tabBarVisible,
        };
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
    // NotificationCenter: {
    //   screen: NotificationCenter,
    //   navigationOptions: {
    //     title: '项目动态',
    //     tabBarOnPress: ({ defaultHandler }) => {
    //       defaultHandler();

    //       // some other things
    //       handleTabBarPress('NotificationCenter');
    //     },
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
        borderTopWidth: 0,
        ...shadow,
      },
      activeTintColor: '#1890FF',
      inactiveTintColor: '#999999',
    },
    navigationOptions: ({ navigation: { state } }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = state;
        return <BadgeTabIcon route={routeName} focused={focused} />;
      },
      tabBarOnPress,
    }),
  },
);

const MainStack = createStackNavigator(
  {
    Tab,
    PublicProjectSearch,
    PublicProjectDetail,
    InstitutionReport,
    InstitutionReportSet,
    InstitutionReportDetail,
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
    MyProfile,
    MyCompany,
    EditProfile,
    MeetingList,
    MeetingListRaw,
    Announcement,
    Institution,
    InstitutionDetail,
    WhitePaper,
    WebPage,
    Settings,
    Service,
    CommentCoin,
  },
  {
    headerMode: 'none',
  },
);

const IndividualTab = createBottomTabNavigator(
  {
    Onboard: {
      screen: PublicProject,
      navigationOptions: {
        title: '首页',
      },
    },
    // Trending: {
    //   screen: NotificationCenter,
    //   navigationOptions: {
    //     title: '动态',
    //   },
    // },
    ProjectRepo: {
      screen: ProjectRepo,
      navigationOptions: ({ navigation }) => {
        const tabBarVisible = navigation.getParam('tabBarVisible', true);
        return {
          title: '项目大全',
          tabBarVisible,
        };
      },
    },
    Favored: {
      screen: Favored,
      navigationOptions: {
        title: '关注',
      },
    },
    Self: {
      screen: IndividualSelf,
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
        borderTopWidth: 0,
        ...shadow,
      },
      activeTintColor: '#1890FF',
      inactiveTintColor: '#999999',
    },
    navigationOptions: ({ navigation: { state } }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = state;
        return <BadgeTabIcon route={routeName} focused={focused} />;
      },
      tabBarOnPress,
    }),
  },
);

const ProjectCreate = createStackNavigator(
  {
    CreateMyProjectBasicInfo,
    CreateMyProjectDescription,
    CreateMyProjectTeam,
    CreateMyProjectSocial,
    CreateMyProjectRoadMap,
    CreateMyProjectFunding,
  },
  {
    headerMode: 'none',
  },
);

const InstitutionCreate = createStackNavigator(
  {
    CreateMyInstitutionBasicInfo,
    CreateMyInstitutionDescription,
    CreateMyInstitutionTeam,
    CreateMyInstitutionServedProject,
  },
  {
    headerMode: 'none',
  },
);

const IndividualStack = createStackNavigator(
  {
    IndividualTab,
    InstitutionReport,
    InstitutionReportSet,
    InstitutionReportDetail,
    PublicProjectSearch,
    PublicProjectDetail: {
      screen: IndividualPublicProjectDetail,
    },
    PublicProjectRecord: CoinRecord,
    PublicProjectInvestmentCreate: CoinRecordCreate,
    NotificationDetail,
    NotificationDetailRaw,
    MyProfile: {
      screen: IndividualProfile,
    },
    EditProfile: {
      screen: IndividualEditProfile,
    },
    Settings,
    ChangeLog,
    Login,
    Feedback,
    MeetingList,
    MeetingListRaw,
    Announcement,
    Institution,
    InstitutionDetail,
    WhitePaper,
    WebPage,
    Service,
    MyProject,
    CreateMyProject,
    CreateMyProjectSearch,
    CreateMyProjectNormal,
    CreateMyProjectNormalWrapper: {
      screen: ProjectCreate,
    },
    ClaimMyProject,
    CreateMyProjectDone,
    CreateMyProjectTagSelect,
    CommentCoin,
    MyInstitution,
    CreateMyInstitution,
    CreateMyInstitutionSearch,
    CreateMyInstitutionWrapper: {
      screen: InstitutionCreate,
    },
    ClaimMyInstitution,
    CreateMyInstitutionDone,
  },
  {
    headerMode: 'none',
  },
);

const AppRouter = createSwitchNavigator(
  {
    Main: MainStack,
    Individual: IndividualStack,
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

import UpdateAlert from 'component/update';
import Modal from 'component/modal';

@withNetworkConnectivity({
  pingServerUrl: 'https://www.baidu.com/',
})
@connect(({ app, router, update }) => ({
  app,
  router,
  showAlert: R.pathOr(false, ['modal_visible'])(update),
}))
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
    if (this.state.isIOS) {
      JPush.getLaunchAppNotification(this.handleOpenLaunchNotification);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.isConnected && !nextProps.isConnected) {
  //     Toast.fail('失去网络连接');
  //   }
  // }

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

  handleOpenLaunchNotification = result => {
    if (R.isNil(result)) {
      return;
    }

    setTimeout(() => {
      const { extras } = result;
      handleOpen(extras);
    }, 1000);
  };

  handleOpenNotification = result => {
    if (R.isNil(result)) {
      return;
    }

    const { extras } = result;
    handleOpen(extras);
  };

  handleReceiveNotification = ({ appState, extras }) => {
    if (appState === 'active') {
      Vibration.vibrate(500);
    }
    handleReceive(extras);
  };

  toggleAlert = () => {
    this.props.dispatch({
      type: 'update/toggle',
    });
  };

  render() {
    const { dispatch, app, router, showAlert } = this.props;
    if (app.loading) return <Loading />;

    const navigation = {
      dispatch,
      state: router,
      addListener,
    };
    return (
      <View style={{ flex: 1 }}>
        <ActionSheetProvider>
          <AppRouter navigation={navigation} />
        </ActionSheetProvider>
        <Modal
          style={{ alignSelf: 'center' }}
          isVisible={showAlert}
          useNativeDriver
          hideModalContentWhileAnimating
          onBackdropPress={this.toggleAlert}
        >
          <UpdateAlert />
        </Modal>
      </View>
    );
  }
}

export function routerReducer(state, action = {}) {
  return AppRouter.router.getStateForAction(action, state);
}

export default Router;

const RouterEmitter = new EventEmitter();
export { RouterEmitter };
