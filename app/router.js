import React, { Component } from 'react';
import {
  BackHandler,
  Alert,
  View,
  Platform,
  AppState,
  Linking,
  Clipboard,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import * as WeChat from 'react-native-wechat';
import R from 'ramda';
import {
  NavigationActions,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import {
  reduxifyNavigator,
  createNavigationReducer,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import JPush from 'jpush-react-native';
import { withNetworkConnectivity } from 'react-native-offline';
import queryString from 'query-string';
import { NavigationActions as routerRedux } from './utils';
import DeviceInfo from 'react-native-device-info';
import Base64 from 'utils/base64';
import store from '../index';

import { setStatusBar } from 'component/uikit/statusBar';
import BadgeTabIcon from 'component/badgeTabIcon';
import { shadow } from './utils/style';
import { EventEmitter } from 'fbemitter';
import { getCoinInfo, getIndustryDetail } from 'services/api';

import InviteItem from 'component/public_project/inviteItem';
import InviteOrgItem from 'component/public_project/inviteOrgItem';
// Screen
import Loader from 'container/loader';
import Login from 'container/auth/login';
import Recommendation from 'container/auth/recommendation';
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
import SingleService from 'container/main/service/singleWrapper';
import WhitePaper from 'container/main/public_project/whitepaper';
import InviteComment from 'container/main/public_project/inviteComment';
import UserProfile from 'container/main/user/profile';
import WebPage from 'container/webview';
import ReportPage from 'container/webview/report';
import GlobalSearch from 'container/main/public_project/globalSearch';

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
import MyProjectReportList from 'container/individual/self/my_project/reports/list';
import CreateWeeklyReport from 'container/individual/self/my_project/reports/create';
import EditWeeklyReport from 'container/individual/self/my_project/reports/edit';
import CreateMyProject from 'container/individual/self/my_project/create';
import CreateMyProjectSearch from 'container/individual/self/my_project/create/search';
import CreateMyProjectNormal from 'container/individual/self/my_project/create/normal';
import CreateMyProjectBasicInfo from 'container/individual/self/my_project/create/normal/steps/basic';
import CreateMyProjectDescription from 'container/individual/self/my_project/create/normal/steps/description';
import CreateMyProjectTeam from 'container/individual/self/my_project/create/normal/steps/team';
import CreateMyProjectSingleMember from 'container/individual/self/my_project/create/normal/steps/single_member';
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
import CreateMyInstitutionSingleMember from 'container/individual/self/my_institution/create/single_member';
import CreateMyInstitutionServedProject from 'container/individual/self/my_institution/create/served_project';
import CreateMyInstitutionSearch from 'container/individual/self/my_institution/search';
import ClaimMyInstitution from 'container/individual/self/my_institution/claim';
import CreateMyInstitutionDone from 'container/individual/self/my_institution/done';
import ClaimMyInstitutionSearch from 'container/individual/self/my_institution/create/search';
import CreateMyInstitutionDetail from 'container/individual/self/my_institution/display';
import CreateMyProjectDetail from 'container/individual/self/my_project/display';
import HotnodeIndex from 'container/individual/hotnode_index';
import HotnodeCoinIndex from 'container/individual/hotnode_index/coin';

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
    // backBehavior: 'none',
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
    SingleService,
    CommentCoin,
    InviteComment,
    UserProfile,
    GlobalSearch,
    ReportPage,
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
        tabBarOnPress: ({ defaultHandler }) => {
          defaultHandler();
          setStatusBar('dark-content');
        },
      },
    },
    HotnodeIndex: {
      screen: HotnodeIndex,
      navigationOptions: {
        title: '指数',
        tabBarOnPress: ({ defaultHandler }) => {
          defaultHandler();
          setStatusBar('light-content');
        },
      },
    },
    ProjectRepo: {
      screen: ProjectRepo,
      navigationOptions: ({ navigation }) => {
        const tabBarVisible = navigation.getParam('tabBarVisible', true);
        return {
          title: '项目大全',
          tabBarVisible,
          tabBarOnPress: ({ defaultHandler }) => {
            defaultHandler();
            setStatusBar('light-content');
          },
        };
      },
    },
    Self: {
      screen: IndividualSelf,
      navigationOptions: {
        title: '我的',
        tabBarOnPress: ({ defaultHandler }) => {
          defaultHandler();
          setStatusBar('dark-content');
        },
      },
    },
  },
  {
    // backBehavior: 'none',
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
    SingleService,
    MyProject,
    CreateMyProject,
    CreateMyProjectDetail,
    CreateMyProjectSearch,
    CreateMyProjectNormal,
    CreateMyProjectBasicInfo,
    CreateMyProjectDescription,
    CreateMyProjectTeam,
    CreateMyProjectSingleMember,
    CreateMyProjectSocial,
    CreateMyProjectRoadMap,
    CreateMyProjectFunding,
    ClaimMyProject,
    CreateMyProjectDone,
    CreateMyProjectTagSelect,
    CommentCoin,
    MyInstitution,
    CreateMyInstitution,
    CreateMyInstitutionDetail,
    CreateMyInstitutionSearch,
    CreateMyInstitutionBasicInfo,
    CreateMyInstitutionDescription,
    CreateMyInstitutionTeam,
    CreateMyInstitutionSingleMember,
    CreateMyInstitutionServedProject,
    ClaimMyInstitutionSearch,
    ClaimMyInstitution,
    CreateMyInstitutionDone,
    InviteComment,
    Favored,
    HotnodeCoinIndex,
    MyProjectReportList,
    CreateWeeklyReport,
    EditWeeklyReport,
    UserProfile,
    GlobalSearch,
    ReportPage,
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
    Recommendation,
  },
  {
    initialRouteName: 'Landing',
  },
);

export const routerReducer = createNavigationReducer(AppRouter);

export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router,
);

const App = reduxifyNavigator(AppRouter, 'root');

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

import { compose, withState } from 'recompose';
import UpdateAlert from 'component/update';
import Modal from 'component/modal';
import ActionAlert from 'component/action_alert';
import { hasAppStoreUpdate } from 'utils/utils';
import { handleBadgeAction } from 'utils/badge_handler';

@withNetworkConnectivity({
  pingServerUrl: 'https://www.baidu.com/',
})
@connect(({ app, router, update }) => ({
  app,
  router,
  showAlert: R.pathOr(false, ['modal_visible'])(update),
  release_notes: R.pathOr('', ['release_notes'])(update),
}))
@compose(
  withState('showNotificationModal', 'setShowNotificationModal', false),
  withState('showInviteEnter', 'setShowInviteEnterModal', false),
  withState('showInviteOrgEnter', 'setShowInviteOrgEnterModal', false),
  withState('inviteCoin', 'setInviteCoin', null),
  withState('inviteOrg', 'setInviteOrg', null),
  withState('appState', 'setAppState', AppState.currentState),
)
class Router extends Component {
  state = {
    isIOS: Platform.OS === 'ios',
  };

  async componentWillMount() {
    WeChat.registerApp('wx9e13272f60a68c63');
    if (!this.state.isIOS) {
      JPush.notifyJSDidLoad(() => null);
    }

    // check app store
    const { hasUpdate, releaseNotes } = await hasAppStoreUpdate();
    if (hasUpdate) {
      this.toggleAlert({ releaseNotes });
    }

    // check codepush
    this.props.dispatch({
      type: 'app/checkCodePush',
    });

    // check notif permission
    this.checkPushPermission();
    handleBadgeAction();

    this.parseInviteKey();
    this.parseOrgInviteKey();
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
    RouterEmitter.addListener('android_url', this.handleOpenURL);
    BackHandler.addEventListener('hardwareBackPress', this.backHandle);
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.isConnected && !nextProps.isConnected) {
  //     Toast.fail('失去网络连接');
  //   }
  // }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle);
    AppState.removeEventListener('change', this._handleAppStateChange);
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  parseInviteKey = async () => {
    try {
      const clipString = await Clipboard.getString();
      const matchResult = clipString.match(/&\*(.*)?\$(.*)?\*&/);
      const viewedInviteKey = await AsyncStorage.getItem('viewInviteKey');
      const hasViewed = viewedInviteKey === matchResult[0];
      if (matchResult) {
        const uniqueID = DeviceInfo.getUniqueID().slice(0, 5);
        const device = matchResult[1];
        const coinID = matchResult[2];

        if (device !== uniqueID && !hasViewed) {
          const { data } = await getCoinInfo(Base64.atob(coinID));
          this.props.setInviteCoin(data);
          this.props.setShowInviteEnterModal(true);
          AsyncStorage.setItem('viewInviteKey', matchResult[0]);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  parseOrgInviteKey = async () => {
    try {
      const clipString = await Clipboard.getString();
      const matchResult = clipString.match(/\^\*(.*)?\$(.*)?\*\^/);
      const viewedInviteKey = await AsyncStorage.getItem('viewOrgInviteKey');
      const hasViewed = viewedInviteKey === matchResult[0];
      if (matchResult) {
        const uniqueID = DeviceInfo.getUniqueID().slice(0, 5);
        const device = matchResult[1];
        const coinID = matchResult[2];

        if (device !== uniqueID && !hasViewed) {
          const { data } = await getIndustryDetail(Base64.atob(coinID));
          this.props.setInviteOrg(data);
          this.props.setShowInviteOrgEnterModal(true);
          AsyncStorage.setItem('viewOrgInviteKey', matchResult[0]);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleOpenURL = event => {
    const url = R.pipe(
      R.pathOr('', ['url']),
      R.trim,
    )(event);

    if (R.isNil(url) || R.isEmpty(url)) {
      return;
    }

    if (!R.test(/hotnode:\/\//, url)) {
      Linking.openURL(url);
      return;
    }

    const reg = R.pipe(
      R.replace('hotnode://', ''),
      R.match(/(.*?)\/(.*)/),
    )(url);

    if (R.isNil(reg) || R.isEmpty(reg)) {
      return;
    }

    const route = R.pathOr('', [1])(reg);
    const params = R.pathOr('', [2])(reg);
    const query = queryString.parse(params) || {};

    if (R.isEmpty(route)) {
      return;
    }

    this.props.dispatch(
      routerRedux.navigate({
        routeName: route,
        params: {
          ...R.filter(i => !!i)(query),
        },
      }),
    );
  };

  _handleAppStateChange = nextAppState => {
    if (
      this.props.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      RouterEmitter.emit('resume');
      this.parseInviteKey();
      this.parseOrgInviteKey();
      // check codepush
      this.props.dispatch({
        type: 'app/checkCodePush',
      });
      // check notification permissions
      this.checkPushPermission();
      handleBadgeAction();
    }
    this.props.setAppState(nextAppState);
  };

  checkPushPermission = () => {
    if (this.state.isIOS) {
      setTimeout(() => {
        JPush.hasPermission(res => {
          if (!res && !global.__DEV__) {
            this.props.setShowNotificationModal(true);
          }
        });
      }, 1000);
    }
  };

  backHandle = () => {
    const { dispatch, router } = this.props;
    const subRouter = router.routes[router.index];
    const secondSubRouter = subRouter.routes[subRouter.index];
    if (secondSubRouter.index === 0) {
      Alert.alert('提示', '确认退出 Hotnode ？', [
        { text: '确认', onPress: () => BackHandler.exitApp() },
        { text: '取消', style: 'cancel' },
      ]);
    }

    dispatch(NavigationActions.back());
    return true;
  };

  toggleAlert = payload => {
    this.props.dispatch({
      type: 'update/toggle',
      payload,
    });
  };

  renderInviteEnter = () => {
    const { inviteCoin } = this.props;
    return (
      <View>
        <InviteItem
          data={inviteCoin}
          onClose={() => this.props.setShowInviteEnterModal(false)}
        />
      </View>
    );
  };

  renderInviteOrgEnter = () => {
    const { inviteOrg } = this.props;
    return (
      <View>
        <InviteOrgItem
          data={inviteOrg}
          onClose={() => this.props.setShowInviteOrgEnterModal(false)}
        />
      </View>
    );
  };

  render() {
    const {
      dispatch,
      router,
      showAlert,
      release_notes,
      inviteCoin,
      inviteOrg,
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ActionSheetProvider>
          <App dispatch={dispatch} state={router} />
        </ActionSheetProvider>
        <Modal
          style={{ alignSelf: 'center' }}
          isVisible={showAlert}
          useNativeDriver
          hideModalContentWhileAnimating
          onBackdropPress={this.toggleAlert}
        >
          <UpdateAlert note={release_notes} />
        </Modal>
        <ActionAlert
          visible={this.props.showInviteEnter}
          renderContent={this.renderInviteEnter}
          onBackdropPress={() => ({})}
          action={() => {
            dispatch(
              NavigationActions.navigate({
                routeName: 'PublicProjectDetail',
                params: {
                  id: inviteCoin.id,
                },
                key: `PublicProjectDetail_${inviteCoin.id}`,
              }),
            );
            this.props.setShowInviteEnterModal(false);
            this.props.setInviteCoin({});
          }}
          actionTitle="去认领入驻"
        />
        <ActionAlert
          visible={this.props.showInviteOrgEnter}
          renderContent={this.renderInviteOrgEnter}
          onBackdropPress={() => ({})}
          action={() => {
            store.dispatch(
              NavigationActions.navigate({
                routeName: 'InstitutionDetail',
                params: {
                  id: inviteOrg.id,
                },
                key: `InstitutionDetail_${inviteOrg.id}`,
              }),
            );
            this.props.setShowInviteOrgEnterModal(false);
            this.props.setInviteOrg({});
          }}
          actionTitle="去认领入驻"
        />
      </View>
    );
  }
}

export default Router;

const RouterEmitter = new EventEmitter();
export { RouterEmitter };
