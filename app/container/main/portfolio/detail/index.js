import React, { Component } from 'react';
import { View, Text, Animated, TouchableHighlight } from 'react-native';
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
import Selector from './selector';
import styles, { deviceWidth, switchHeight } from './style';

const selectionList = [
  {
    component: Trend,
    name: '动态',
  },
  {
    component: Pairs,
    name: '交易所',
  },
  {
    component: Description,
    name: '详情',
  },
  {
    component: Return,
    name: '回报',
  },
];

@global.bindTrack({
  page: '项目详情',
  name: 'App_ProjectDetailOperation',
})
@compose(
  withState('scrollY', 'setScrollY', new Animated.Value(0)),
  withState('offsetY', 'setOffsetY', 0),
  withState('currentPage', 'setCurrentPage', {
    component: Trend,
    name: '动态',
  }),
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

  handlePageSwitch = page => () => {
    this.props.setCurrentPage(page);
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

  render() {
    const item = this.props.navigation.getParam('item');
    const displayTab =
      item && item.can_calculate && hasPermission('project-statistic');
    const { currentPage: Current } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <Animated.ScrollView
          contentContainerStyle={styles.scroll.contentContainer}
          // bounces={false}
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
          <Selector
            list={selectionList}
            page={Current}
            onPress={this.handlePageSwitch}
          />
          <Current.component {...this.props} />
        </Animated.ScrollView>
        <View style={styles.switch.wrapper}>{this.renderSwitchButton()}</View>
      </View>
    );
  }
}
