import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { connect } from 'react-redux';
import { compose, withState, withProps } from 'recompose';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar, { realBarHeight } from 'component/navBar';
import NewsItem from 'component/news';
import DropdownAlert, { alertHeight } from 'component/dropdown_alert';
import { handleBadgeAction } from 'utils/badge_handler';

import List from './components/list';
import Refresh from './components/refresh';
import Header from './header';
import styles from './style';

@global.bindTrack({
  page: '项目公海',
  name: 'App_PublicProjectOperation',
})
@connect(({ public_project, news, loading, notification, institution }) => ({
  news: R.pathOr([], ['news'])(news),
  lastNewsID: R.pathOr(null, ['payload'])(news),
  data: R.pathOr([], ['list', 0, 'index', 'data'])(public_project),
  loading: loading.effects['news/index'],
  insite_news: R.pathOr([], ['insite_list', 'data'])(notification),
  reports: R.pathOr([], ['report', 'data'])(institution),
  updateCount: R.path(['updated_count'])(news),
  notification_badge_visible: R.pathOr(false, ['badgeVisible'])(notification),
}))
@compose(
  withState('animateY', 'setAnimatedY', new Animated.Value(0)),
  withProps(({ animateY }) => ({
    navBarOpacityRange: animateY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  })),
)
export default class PublicProject extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.updateCount > this.props.updateCount) {
      const count = nextProps.updateCount - this.props.updateCount;
      if (this.scroll) {
        this.scroll.getNode().scrollToIndex({
          index: 0,
          // animated: true,
          viewOffset: -realBarHeight,
        });
        this.alert.show(`新增 ${count} 条更新`);
      }
    }
  }

  requestData = isRefresh => {
    this.props.dispatch({
      type: 'news/index',
      payload: isRefresh ? null : this.props.lastNewsID,
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

  renderItem = ({ item }) => (
    <NewsItem
      {...this.props}
      data={item}
      onInstitutionReportPress={this.handleInstitutionReportPress}
      onInstitutionItemPress={this.handleReportItemPress}
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
      <NavBar
        gradient
        title="首页"
        renderRight={() => (
          <Refresh {...this.props} onPress={() => this.requestData(true)} />
        )}
      />
    </Animated.View>
  );

  render() {
    const { news, loading } = this.props;
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
      </View>
    );
  }
}
