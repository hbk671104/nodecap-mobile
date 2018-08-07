import React, { Component } from 'react';
import {
  Animated,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ModalDropdown from 'react-native-modal-dropdown';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { compose, withState, withProps } from 'recompose';
import Communications from 'react-native-communications';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import NodeCapIcon from 'component/icon/nodecap';
import { setStatusBar } from 'component/uikit/statusBar';
import Modal from 'component/modal';
import AuthButton from 'component/auth/button';
import { hasPermission } from 'component/auth/permission/lock';

import { getCurrentScreen } from '../../../router';
import Header from './partials/header';
import ProfitSwiper from './partials/profitSwiper';
import ReturnRateChart from './partials/returnRateChart';
import DashboardGroup from './partials/group';
import InvestNumber from './partials/investNumber';
import ProjectItem from './partials/projectItem';
import Investment from './partials/investment';
import ShareModal from './share';
import Empty from './empty';
import styles, { PARALLAX_HEADER_HEIGHT } from './style';

const AnimatedIcon = Animated.createAnimatedComponent(NodeCapIcon);

@global.bindTrack({
  page: '项目详情',
  name: 'App_DashboardOperation',
})
@compose(
  withState('showShareModal', 'setShareModal', false),
  withState('scrollY', 'setScrollY', new Animated.Value(0)),
  withState('offsetY', 'setOffsetY', 0),
  withProps(({ scrollY }) => ({
    titleColorRange: scrollY.interpolate({
      inputRange: [0, PARALLAX_HEADER_HEIGHT / 2],
      outputRange: ['white', '#333333'],
      extrapolate: 'clamp',
    }),
    colorRange: scrollY.interpolate({
      inputRange: [0, PARALLAX_HEADER_HEIGHT / 2],
      outputRange: ['rgba(255, 255, 255, 0)', 'white'],
      extrapolate: 'clamp',
    }),
  })),
)
@connect(({ dashboard, fund, loading, router, user }) => ({
  dashboard: dashboard.data,
  funds: R.pathOr([], ['funds', 'data'])(fund),
  fundsError: fund.error,
  loading: loading.effects['dashboard/fetch'],
  isCurrent: getCurrentScreen(router) === 'Dashboard',
  company: R.pathOr({}, ['currentUser', 'companies', 0])(user),
}))
export default class Dashboard extends Component {
  state = {
    currentFund: R.pathOr({}, ['funds', 0])(this.props),
  };

  componentWillMount() {
    const { currentFund } = this.state;
    this.getDashboardData(currentFund.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isCurrent) {
      setStatusBar(
        nextProps.offsetY > PARALLAX_HEADER_HEIGHT / 2
          ? 'dark-content'
          : 'light-content',
      );
    }
  }

  getDashboardData = id => {
    this.props.dispatch({
      type: 'dashboard/fetch',
      payload: id,
      callback: () => {
        this.setState({
          currentFund: R.find(R.propEq('id', id))(this.props.funds),
        });
      },
    });
  };

  handleOnScroll = ({ nativeEvent: { contentOffset } }) => {
    const { setOffsetY } = this.props;
    setOffsetY(contentOffset.y);
  };

  handleSwiperChange = () => {
    this.props.track('价格走势时间跨度');
  };

  handleProjectItemPress = item => () => {
    this.props.track('回报率卡片');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PortfolioDetail',
        params: {
          item: {
            ...item,
            can_calculate: true,
          },
        },
      }),
    );
  };

  handleFundSwitch = (i, value) => {
    this.getDashboardData(value.id);
  };

  handleCreateProjectPress = () => {
    this.props.track('添加项目');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'CreateProject',
      }),
    );
  };

  handleItemPress = item => () => {
    this.props.track('上所项目');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PortfolioDetail',
        params: {
          item: {
            ...item,
            can_calculate: true,
          },
        },
      }),
    );
  };

  renderBackground = () => (
    <Image
      style={styles.background}
      source={require('asset/dashboard_bg.png')}
    />
  );

  renderForeground = () => <Header {...this.props} style={styles.foreground} />;

  renderNavBarTitle = (style = {}) => {
    const { titleColorRange, funds } = this.props;
    const { currentFund } = this.state;
    return (
      <ModalDropdown
        style={[styles.dropdown.container, style]}
        dropdownStyle={[styles.dropdown.wrapper, { height: funds.length * 45 }]}
        showsVerticalScrollIndicator={false}
        options={funds}
        animated={false}
        defaultIndex={0}
        renderRow={(rowData, index, isSelected) => (
          <TouchableOpacity style={styles.dropdown.item.container}>
            <Text
              style={[
                styles.dropdown.item.title,
                isSelected && { fontWeight: 'bold', color: '#1890FF' },
              ]}
            >
              {rowData.name}
            </Text>
          </TouchableOpacity>
        )}
        renderSeparator={() => <View style={styles.dropdown.separator} />}
        onSelect={this.handleFundSwitch}
      >
        <Animated.Text
          style={[styles.navbar.title, { color: titleColorRange }]}
        >
          {currentFund.name}
          <AnimatedIcon style={{ color: titleColorRange }} name="xiala" />
        </Animated.Text>
      </ModalDropdown>
    );
  };

  renderFixedHeader = gradient => {
    const { colorRange, dashboard, offsetY } = this.props;
    return (
      <View
        style={{ position: 'absolute', left: 0, right: 0, top: 0, zIndex: 10 }}
      >
        <NavBar
          gradient={!!gradient}
          wrapperStyle={{ backgroundColor: colorRange }}
          barStyle={
            offsetY > PARALLAX_HEADER_HEIGHT / 2
              ? 'dark-content'
              : 'light-content'
          }
          renderTitle={this.renderNavBarTitle}
          renderRight={() => {
            const invalid = !dashboard || !this.state.currentFund;
            if (invalid) return null;
            return (
              <TouchableOpacity
                onPress={() => {
                  this.props.track('分享');
                  this.props.setShareModal(true);
                }}
              >
                <Image
                  source={require('asset/share.png')}
                  style={styles.shareButton}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  render() {
    const { scrollY, dashboard, loading } = this.props;
    const roiRank = R.pathOr([], ['ROIRank'])(dashboard);

    let empty = null;
    const invalid = !dashboard || !this.state.currentFund;
    if (invalid && loading) {
      empty = (
        <Empty>
          <ActivityIndicator size="large" />
        </Empty>
      );
    }

    if (R.path(['fundsError', 'status'])(this.props) === 403) {
      empty = (
        <Empty>
          <Text>您尚未拥有查看 Dashboard 的权限</Text>
        </Empty>
      );
    }

    if (invalid) {
      empty = (
        <Empty style={{ zIndex: 5 }}>
          <View style={styles.empty.group.container}>
            <Text style={styles.empty.group.title}>
              {'完善项目和投资记录，\n即可在此查看基金收益统计'}
            </Text>
            <Text style={styles.empty.group.subtitle}>
              <NodeCapIcon name="diannao" color="#4A4A4A" size={14} />
              {'  '}使用电脑端打开
              <Text
                style={{ color: '#1890FF' }}
                onPress={() => Communications.web('https://hotnode.io')}
              >
                {' hotnode.io '}
              </Text>，录入更快捷、高效
            </Text>
            {hasPermission('project-create') && (
              <AuthButton
                title="导 入"
                disabled={false}
                style={styles.empty.group.button}
                onPress={this.handleCreateProjectPress}
              />
            )}
          </View>
          <View style={styles.empty.bottom.container}>
            <Text style={styles.empty.bottom.title}>
              <NodeCapIcon name="kefu" color="black" size={14} />
              {'  '}7x24小时服务热线
            </Text>
            <Text
              style={styles.empty.bottom.subtitle}
              onPress={() => Communications.phonecall('159-3715-9166', false)}
            >
              159-3715-9166
            </Text>
          </View>
        </Empty>
      );
    }

    return (
      <View style={styles.container}>
        {this.renderFixedHeader(empty)}
        {!!dashboard && (
          <ParallaxScrollView
            contentContainerStyle={styles.scrollView.container}
            outputScaleValue={10}
            showsVerticalScrollIndicator={false}
            parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
            renderForeground={this.renderForeground}
            renderBackground={this.renderBackground}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: scrollY,
                    },
                  },
                },
              ],
              {
                listener: this.handleOnScroll,
              },
            )}
          >
            <ProfitSwiper
              style={styles.swiper}
              total={R.path(['totalProfits', 'count'])(dashboard)}
              daily={R.path(['dailyProfits', 'count'])(dashboard)}
              weekly={R.path(['weeklyProfits', 'count'])(dashboard)}
              onChange={this.handleSwiperChange}
            />
            <ReturnRateChart style={styles.roiChart} {...this.props} />
            <DashboardGroup title="投资概况" icon="yitouxiangmu">
              <InvestNumber
                data={dashboard.portfolio}
                roiRank={roiRank}
                onItemPress={this.handleItemPress}
              />
            </DashboardGroup>
            <DashboardGroup
              style={styles.dashboardGroup}
              title="投资金额"
              icon="touzijine"
            >
              <Investment data={dashboard.investment} />
            </DashboardGroup>
            <DashboardGroup
              style={styles.dashboardGroup}
              title="投资回报率榜"
              icon="TOP"
            >
              {R.slice(0, 5, roiRank).map((r, i) => (
                <ProjectItem
                  key={i}
                  index={i}
                  data={r}
                  onPress={this.handleProjectItemPress(r)}
                />
              ))}
            </DashboardGroup>
          </ParallaxScrollView>
        )}
        {empty}
        {!!dashboard && (
          <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            isVisible={this.props.showShareModal}
            style={styles.modal}
            useNativeDriver
            hideModalContentWhileAnimating
          >
            <ShareModal
              fund={this.state.currentFund}
              company={this.props.company}
              dashboard={dashboard}
              onClose={() => this.props.setShareModal(false)}
            />
          </Modal>
        )}
      </View>
    );
  }
}
