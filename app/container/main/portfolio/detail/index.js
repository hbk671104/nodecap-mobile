import React, { Component } from 'react';
import { View, Text, Animated, TouchableHighlight } from 'react-native';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { compose, withState, withProps } from 'recompose';
import R from 'ramda';

import NavBar from 'component/navBar';
import StatusDisplay from 'component/project/statusDisplay';

import { hasPermission } from 'component/auth/permission/lock';

import Description from './page/description';
import Pairs from './page/pairs';
import Return from './page/return';
import Trend from './page/trend';
import Header from './header';
import styles, { deviceWidth, switchHeight } from './style';

@global.bindTrack({
  page: '项目详情',
  name: 'App_ProjectDetailOperation',
})
@compose(
  withState('scrollY', 'setScrollY', new Animated.Value(0)),
  withState('offsetY', 'setOffsetY', 0),
  withProps(({ offsetY, scrollY }) => ({
    statusSwitchTranslateRange: scrollY.interpolate({
      inputRange: [0, switchHeight],
      outputRange: [0, -deviceWidth / 2],
      extrapolate: 'clamp',
    }),
    matchSwitchTranslateRange: scrollY.interpolate({
      inputRange: [0, switchHeight],
      outputRange: [0, deviceWidth / 2],
      extrapolate: 'clamp',
    }),
    bottomHidden: offsetY > 0,
  })),
)
@connect(({ portfolio, loading }, props) => {
  const item = props.navigation.getParam('item');
  return {
    portfolio: R.pathOr({}, ['current'])(portfolio),
    project_id: R.pathOr(0, ['id'])(item),
    loading: loading.effects['portfolio/get'],
  };
})
export default class PortfolioDetail extends Component {
  componentWillMount() {
    this.loadDetail();
  }

  componentDidMount() {
    this.props.track('进入');
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'portfolio/clearDetail',
    });
  }

  loadDetail = () => {
    this.props.dispatch({
      type: 'portfolio/get',
      payload: this.props.project_id,
    });
  };

  handleStatusPress = () => {};

  handleCoinMatchPress = () => {};

  handleOnScroll = ({ nativeEvent: { contentOffset } }) => {
    const { setOffsetY } = this.props;
    setOffsetY(contentOffset.y);
  };

  renderNavBar = () => {
    const { bottomHidden, portfolio, loading } = this.props;
    return (
      <NavBar
        back
        gradient
        bottomHidden={bottomHidden}
        title={bottomHidden ? portfolio.name : ''}
        renderBottom={() => <Header loading={loading} data={portfolio} />}
      />
    );
  };

  renderSwitchButton = () => {
    const {
      portfolio,
      statusSwitchTranslateRange,
      matchSwitchTranslateRange,
    } = this.props;
    const can_calculate = R.pathOr(false, ['can_calculate'])(portfolio);
    return (
      <View style={styles.switch.container}>
        <Animated.View
          style={[
            styles.switch.content.wrapper,
            {
              transform: [
                {
                  translateX: statusSwitchTranslateRange,
                },
              ],
            },
          ]}
        >
          <TouchableHighlight
            underlayColor="white"
            onPress={this.handleStatusPress}
          >
            <View style={styles.switch.content.container}>
              <StatusDisplay
                status={portfolio.status}
                titleStyle={styles.switch.status.text}
              />
              <Text style={styles.switch.content.text}>切换</Text>
            </View>
          </TouchableHighlight>
        </Animated.View>
        <Animated.View
          style={[
            styles.switch.content.wrapper,
            {
              transform: [
                {
                  translateX: matchSwitchTranslateRange,
                },
              ],
            },
          ]}
        >
          <TouchableHighlight
            underlayColor="white"
            onPress={this.handleCoinMatchPress}
          >
            <View style={styles.switch.content.container}>
              <Text
                style={[
                  styles.switch.status.text,
                  can_calculate && styles.switch.matched.highlight,
                ]}
              >
                {can_calculate ? '项目已匹配' : '项目未匹配'}
              </Text>
              <Text style={styles.switch.content.text}>切换</Text>
            </View>
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  };

  renderTabBar = () => (
    <DefaultTabBar
      style={styles.tabBar.container}
      tabStyle={styles.tabBar.tab}
      textStyle={styles.tabBar.text}
      activeTextColor="rgba(0, 0, 0, 0.85)"
      inactiveTextColor="rgba(0, 0, 0, 0.65)"
      underlineStyle={styles.tabBar.underline}
    />
  );

  render() {
    const item = this.props.navigation.getParam('item');
    const displayTab =
      item && item.can_calculate && hasPermission('project-statistic');
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <Animated.ScrollView
          contentContainerStyle={styles.scroll.contentContainer}
          bounces={false}
          scrollEventThrottle={16}
          stickyHeaderIndices={[1]}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: this.props.scrollY,
                  },
                },
              },
            ],
            {
              listener: this.handleOnScroll,
              useNativeDriver: true,
            },
          )}
        >
          {/* <View style={{ height: 250 }} /> */}
          <ScrollableTabView
            style={styles.tabView}
            locked
            scrollWithoutAnimation
            prerenderingSiblingsNumber={Infinity}
            renderTabBar={this.renderTabBar}
          >
            <Trend {...this.props} tabLabel="动态" />
            <Pairs {...this.props} tabLabel="交易所" />
            <Description {...this.props} tabLabel="详情" />
            <Return {...this.props} tabLabel="回报" />
          </ScrollableTabView>
        </Animated.ScrollView>
        <View style={styles.switch.wrapper}>{this.renderSwitchButton()}</View>
      </View>
    );
  }
}
