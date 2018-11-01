import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { connect } from 'react-redux';
import { compose, withState, withProps } from 'recompose';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import { RouterEmitter } from '../../../router';

import NavBar, { realBarHeight } from 'component/navBar';
import NewsItem from 'component/news';
import DropdownAlert, { alertHeight } from 'component/dropdown_alert';
import { handleBadgeAction } from 'utils/badge_handler';

import List from './components/list';
import Header from './header';
import ShareNews from './shareNews';
import styles from './style';

@global.bindTrack({
  page: '项目公海',
  name: 'App_PublicProjectOperation',
})
@connect(
  ({ public_project, news, loading, notification, institution, banners }) => ({
    news: R.pathOr([], ['news'])(news),
    lastNewsID: R.pathOr(null, ['payload'])(news),
    data: R.pathOr([], ['selected', 'index'])(public_project),
    pagination: R.pathOr(null, ['selected', 'index', 'pagination'])(
      public_project,
    ),
    loading: loading.effects['news/index'],
    selectedLoading: loading.effects['public_project/fetchSelected'],
    insite_news: R.pathOr([], ['insite_list', 'data'])(notification),
    announcement: R.pathOr([], ['list', 'data'])(notification),
    reports: R.pathOr([], ['report', 'data'])(institution),
    updateCount: R.path(['updated_count'])(news),
    notification_badge_visible: R.pathOr(false, ['badgeVisible'])(notification),
    banners: R.pathOr([], ['list', 'data'])(banners),
  }),
)
@compose(
  withState('showShareModal', 'toggleShareModal', false),
  withState('currentShareNews', 'setShareNews', ''),
  withState('animateY', 'setAnimatedY', new Animated.Value(0)),
  withProps(({ animateY }) => ({
    navBarOpacityRange: animateY.interpolate({
      inputRange: [0, 192],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    refreshButtonOpacityRange: animateY.interpolate({
      inputRange: [672, 768],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  })),
)
export default class PublicProject extends Component {
  componentWillMount() {
    RouterEmitter.addListener('resume', () => {
      this.props.dispatch({
        type: 'news/index',
      });
    });
  }

  handleDataAlert = (newUpdateCount, oldUpdateCount) => {
    if (newUpdateCount > oldUpdateCount) {
      const count = newUpdateCount - oldUpdateCount;
      if (this.scroll) {
        this.alert.show(`新增 ${count} 条更新`);
      }
    } else {
      this.alert.show('暂无新快讯');
    }
  };

  requestData = (isRefresh, callback) => {
    this.shouldAnimate = this.shouldAnimate && isRefresh;
    this.props.dispatch({
      type: 'news/index',
      payload: isRefresh ? null : this.props.lastNewsID,
      callback,
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
          item,
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
    handleBadgeAction();
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
    this.props.track('点击找机构');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Institution',
      }),
    );
  };

  handleServicePress = () => {
    this.props.track('点击找服务');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Service',
      }),
    );
  };

  handleReportItemPress = item => {
    this.props.track('点击进入研报详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'InstitutionReportDetail',
        params: {
          pdf_url: item.pdf_url,
          title: item.title,
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

  renderItem = ({ item }) => (
    <NewsItem
      {...this.props}
      data={item}
      onInstitutionReportPress={this.handleInstitutionReportPress}
      onInstitutionItemPress={this.handleReportItemPress}
      onAnnouncementPress={this.handleAnnouncementPress}
      onAnnouncementItemPress={this.handleAnnouncementItemPress}
      onPressShare={this.handleNewsSharePress}
    />
  );

  renderHeader = () => (
    <Header
      {...this.props}
      onMeetingPress={this.handleMeetingPress}
      onAnnouncementPress={this.handleAnnouncementPress}
      onProjectRepoPress={this.handleProjectRepoPress}
      onInstitutionReportPress={this.handleInstitutionReportPress}
      onInstitutionPress={this.handleInstitutionPress}
      onServicePress={this.handleServicePress}
      onRefreshPress={() => {
        this.shouldAnimate = true;
        this.requestData(true, this.handleDataAlert);
      }}
      onRefreshProject={() => {
        this.refreshProject();
      }}
      newsLoading={this.props.loading && this.shouldAnimate}
    />
  );

  renderSeparator = () => <View style={styles.separator} />;

  renderNavBar = () => (
    <Animated.View
      style={[styles.navBar, { opacity: this.props.navBarOpacityRange }]}
    >
      <DropdownAlert
        ref={ref => {
          this.alert = ref;
        }}
        style={[
          styles.dropdown,
          {
            top: realBarHeight - alertHeight,
          },
        ]}
      />
      <NavBar gradient title="首页" />
    </Animated.View>
  );

  render() {
    const { news, loading, refreshButtonOpacityRange } = this.props;
    return (
      <View style={styles.container}>
        <List
          disableRefresh
          listRef={ref => {
            this.scroll = ref;
          }}
          contentContainerStyle={styles.listContent}
          action={this.requestData}
          loading={loading}
          data={news}
          renderItem={this.renderItem}
          renderHeader={this.renderHeader}
          renderSeparator={this.renderSeparator}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: this.props.animateY },
                },
              },
            ],
            {
              useNativeDriver: true,
            },
          )}
        />
        {this.renderNavBar()}
        <ShareNews
          visible={this.props.showShareModal}
          news={this.props.currentShareNews}
          onClose={() => {
            this.props.toggleShareModal(false);
            this.props.setShareNews('');
          }}
        />
      </View>
    );
  }
}
