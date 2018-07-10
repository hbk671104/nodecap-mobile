import React, { Component } from 'react';
import {
  Animated,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import ModalDropdown from 'react-native-modal-dropdown';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { compose, withState, withProps } from 'recompose';
import Communications from 'react-native-communications';

import NavBar from 'component/navBar';
import NodeCapIcon from 'component/icon/nodecap';
import { setStatusBar } from 'component/uikit/statusBar';
import Empty from 'component/empty';
import Loading from 'component/uikit/loading';

import { getCurrentScreen } from '../../../router';
import Header from './partials/header';
import ProfitSwiper from './partials/profitSwiper';
import ReturnRateChart from './partials/returnRateChart';
import DashboardGroup from './partials/group';
import InvestNumber from './partials/investNumber';
import ProjectItem from './partials/projectItem';
import Investment from './partials/investment';
import ShareModal from './share';
import styles, { PARALLAX_HEADER_HEIGHT } from './style';

const AnimatedIcon = Animated.createAnimatedComponent(NodeCapIcon);

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
      outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
      extrapolate: 'clamp',
    }),
  })),
)
@connect(({ dashboard, fund, loading, router }) => ({
  dashboard: dashboard.data,
  funds: R.pathOr([], ['funds', 'data'])(fund),
  fundsError: fund.error,
  loading: loading.effects['dashboard/fetch'],
  isCurrent: getCurrentScreen(router) === 'Dashboard',
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

  renderBackground = () => (
    <Animated.Image
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
        onSelect={(i, value) => this.getDashboardData(value.id)}
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

  renderFixedHeader = () => {
    const { colorRange, dashboard, offsetY } = this.props;
    return (
      <View
        style={{ position: 'absolute', left: 0, right: 0, top: 0, zIndex: 10 }}
      >
        <NavBar
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
              <TouchableOpacity onPress={() => this.props.setShareModal(true)}>
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
    const roiRankCount = R.length(R.path(['ROIRank'])(dashboard));

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
        {this.renderFixedHeader()}
        {!!dashboard && (
          <ScrollView
            contentContainerStyle={styles.scrollView.container}
            showsVerticalScrollIndicator={false}
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
            <View style={styles.parallax}>
              {this.renderBackground()}
              {this.renderForeground()}
            </View>
            <View
              style={{
                flex: 1,
                paddingTop: 50,
              }}
            >
              <ProfitSwiper
                style={styles.swiper}
                total={R.path(['totalProfits', 'count'])(dashboard)}
                daily={R.path(['dailyProfits', 'count'])(dashboard)}
                weekly={R.path(['weeklyProfits', 'count'])(dashboard)}
              />
              <ReturnRateChart style={styles.roiChart} {...this.props} />
              <DashboardGroup title="已投项目数量" icon="yitouxiangmu">
                <InvestNumber data={dashboard.portfolio} />
              </DashboardGroup>
              <DashboardGroup
                style={styles.dashboardGroup}
                title="投资金额"
                icon="touzijine"
              >
                <Investment data={dashboard.investment} />
              </DashboardGroup>
              {roiRankCount > 0 && (
                <DashboardGroup
                  style={styles.dashboardGroup}
                  title="投资回报率 TOP 5"
                  icon="TOP"
                >
                  {dashboard.ROIRank.map((r, i) => (
                    <ProjectItem key={i} index={i} data={r} />
                  ))}
                </DashboardGroup>
              )}
            </View>
          </ScrollView>
        )}
        {empty}
        <Modal
          isVisible={this.props.showShareModal}
          style={{
            margin: 0,
          }}
          useNativeDriver
          hideModalContentWhileAnimating
          onBackButtonPress={() => this.props.setShareModal(false)}
        >
          <ShareModal
            fund={this.state.currentFund}
            onClose={() => this.props.setShareModal(false)}
          />
        </Modal>
      </View>
    );
  }
}
