import React, { Component } from 'react';
import { View, Platform, Text, Image, Vibration } from 'react-native';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import JPush from 'jpush-react-native';
import { Flex } from 'antd-mobile';

import { RouterEmitter } from '../../../router';

import NavBar from 'component/navBar';
import Explanation from 'component/explanation';
import NewsItem from 'component/news';
import InvestNewsItem from 'component/news/investNewsItem';
import Touchable from 'component/uikit/touchable';
import Format from 'component/format';
import { setStatusBar } from 'component/uikit/statusBar';
import { handleOpen, handleReceive } from 'utils/jpush_handler';

import List from 'component/uikit/list';
import Header from './header';
import ShareNews from './shareNews';
import styles from './style';

@global.bindTrack({
  page: '项目公海',
  name: 'App_PublicProjectOperation',
})
@connect(
  ({
    public_project,
    news,
    loading,
    notification,
    institution,
    banners,
    hotnode_index,
    investNews,
  }) => ({
    data: R.pathOr([{}, {}, {}, {}, {}], ['selected', 'index', 'data'])(
      public_project,
    ),
    pagination: R.pathOr(null, ['selected', 'index', 'pagination'])(
      public_project,
    ),
    selectedLoading: loading.effects['public_project/fetchSelected'],
    insite_news: R.pathOr([], ['insite_list', 'data'])(notification),
    investNews: R.pathOr([], ['list', 'data'])(investNews),
    investNewPagination: R.pathOr(null, ['list', 'pagination'])(investNews),
    loading: loading.effects['investNews/fetch'],
    announcement: R.pathOr([], ['list', 'data'])(notification),
    reports: R.pathOr([], ['report', 'data'])(institution),
    updateCount: R.path(['updated_count'])(news),
    notification_badge_number: R.isNil(R.path(['lastRead'])(notification))
      ? 0
      : R.pathOr(0, ['list', 'pagination', 'total'])(notification) -
        R.pathOr(0, ['lastRead'])(notification),
    reports_badge_number: R.isNil(R.path(['lastReportCount'])(institution))
      ? 0
      : R.pathOr(0, ['report', 'pagination', 'total'])(institution) -
        R.pathOr(0, ['lastReportCount'])(institution),
    banners: R.pathOr([], ['list', 'data'])(banners),
    market_sentiment: R.pathOr({}, ['market_sentiment'])(hotnode_index),
    global_index: R.pathOr({}, ['overall', 'global'])(hotnode_index),
  }),
)
@compose(
  withState('showExplanation', 'setShowExplanation', false),
  withState('showShareModal', 'toggleShareModal', false),
  withState('currentShareNews', 'setShareNews', ''),
)
export default class PublicProject extends Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'news/index',
    });

    RouterEmitter.addListener('resume', () => {
      this.props.dispatch({
        type: 'news/index',
      });
      this.props.dispatch({
        type: 'investNews/fetch',
      });
    });
  }

  componentDidMount() {
    JPush.addReceiveOpenNotificationListener(this.handleOpenNotification);
    JPush.addReceiveNotificationListener(this.handleReceiveNotification);
    if (Platform.OS === 'ios') {
      JPush.getLaunchAppNotification(this.handleOpenLaunchNotification);
    }
  }

  componentWillUnmount() {
    JPush.removeReceiveOpenNotificationListener(this.handleOpenNotification);
    JPush.removeReceiveNotificationListener(this.handleReceiveNotification);
  }

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

  requestData = (page, size) => {
    this.props.dispatch({
      type: 'investNews/fetch',
      payload: {
        currentPage: page,
        pageSize: size,
      },
    });
  };

  refreshProject = () => {
    this.props.dispatch({
      type: 'public_project/fetchSelected',
    });
  };

  handleItemPress = item => () => {
    this.props.track('点击进入详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PublicProjectDetail',
        params: {
          id: item.id,
        },
        key: `PublicProjectDetail_${this.props.data.id}`,
      }),
    );
  };

  handleMeetingPress = () => {
    this.props.track('点击找会议');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'MeetingList',
      }),
    );
  };

  handleAnnouncementPress = () => {
    this.props.track('点击上所公告');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Announcement',
      }),
    );
  };

  handleProjectRepoPress = () => {
    this.props.track('点击找项目');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ProjectRepo',
      }),
    );
  };

  handleInstitutionReportPress = () => {
    this.props.track('点击进入研报列表');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'InstitutionReport',
      }),
    );
  };

  handleInstitutionPress = () => {
    this.props.track('点击找投资');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Institution',
      }),
    );
  };

  handleServicePress = type => () => {
    this.props.track('点击找服务');
    if (type === 'more') {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'Service',
        }),
      );
    } else {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'SingleService',
          params: {
            type,
          },
        }),
      );
    }
  };

  handleReportItemPress = item => {
    this.props.track('点击进入研报详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'InstitutionReportDetail',
        params: {
          id: item.id,
        },
      }),
    );
  };

  handleAnnouncementItemPress = item => {
    this.props.track('点击进入上所公告详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'NotificationDetail',
        params: {
          id: item.id,
        },
      }),
    );
  };

  handleNewsSharePress = data => {
    this.props.setShareNews(data);
    this.props.toggleShareModal(true);
  };

  handleMoreIndexPress = () => {
    setStatusBar('light-content');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'HotnodeIndex',
      }),
    );
  };

  handleSearchBarPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'GlobalSearch',
      }),
    );
  };

  handleChartPress = () => {
    this.props.track('点击榜单');
    // navigate
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Rank',
      }),
    );
  };

  renderItem = ({ item }) => (
    <InvestNewsItem
      {...this.props}
      data={item}
    />
  );

  renderHeader = () => (
    <Header
      {...this.props}
      onChartPress={this.handleChartPress}
      onSearchBarPress={this.handleSearchBarPress}
      onMeetingPress={this.handleMeetingPress}
      onAnnouncementPress={this.handleAnnouncementPress}
      onProjectRepoPress={this.handleProjectRepoPress}
      onInstitutionReportPress={this.handleInstitutionReportPress}
      onServicePress={this.handleServicePress}
      onRefreshPress={() => {
        this.requestData(true);
      }}
      onRefreshProject={() => {
        this.refreshProject();
      }}
      onMoreIndexPress={this.handleMoreIndexPress}
      onTitlePress={() => this.props.setShowExplanation(true)}
      newsLoading={this.props.loading}
    />
  );

  renderNavBar = () => {
    const { global_index } = this.props;
    return (
      <NavBar
        barStyle="dark-content"
        renderContent={() => (
          <Flex
            style={styles.navBar.container}
            align="center"
            justify="space-between"
          >
            <Image
              source={require('asset/public_project/hotnode_banner.png')}
            />
            <Touchable borderless onPress={this.handleMoreIndexPress}>
              <Flex direction="column" align="flex-end">
                <Text style={styles.navBar.index.title}>全网指数</Text>
                <Text style={styles.navBar.index.text}>
                  <Format digit={1}>{R.path(['heat'])(global_index)}</Format>
                </Text>
              </Flex>
            </Touchable>
          </Flex>
        )}
      />
    );
  };

  render() {
    const { investNews, investNewPagination, loading, showExplanation } = this.props;
    let lastY = 0;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <List
          disableRefresh
          listRef={ref => {
            this.scroll = ref;
          }}
          onScroll={e => {
            const currentY = R.path(['nativeEvent', 'contentOffset', 'y'])(e);
            if (currentY > lastY && currentY > 0) {
              this.props.track('列表下滑');
            }
            lastY = currentY;
          }}
          contentContainerStyle={styles.listContent}
          action={this.requestData}
          loading={loading}
          data={investNews}
          pagination={investNewPagination}
          renderItem={this.renderItem}
          renderHeader={this.renderHeader}
        />
        <ShareNews
          visible={this.props.showShareModal}
          news={this.props.currentShareNews}
          onClose={() => {
            this.props.toggleShareModal(false);
            this.props.setShareNews('');
          }}
        />
        <Explanation
          visible={showExplanation}
          onBackdropPress={() => this.props.setShowExplanation(false)}
          title="市场情绪"
          content="市场情绪是 Hotnode 综合最近8小时全网媒体及自媒体数据 ，进行大数据建模及分析，科学评估市场情绪看多看空动向"
        />
      </View>
    );
  }
}
