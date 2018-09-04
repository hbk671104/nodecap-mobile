import React, { Component } from 'react';
import { View, Text, ScrollView, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { compose, withState, withProps } from 'recompose';

import NavBar from 'component/navBar';
import { hasPermission } from 'component/auth/permission/lock';

import Header, { headerHeight } from './header';
import styles from './style';

@global.bindTrack({
  page: '项目详情',
  name: 'App_ProjectDetailOperation',
})
@compose(
  withState('scrollY', 'setScrollY', new Animated.Value(0)),
  withProps(({ scrollY }) => ({
    headerHeightRange: scrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [headerHeight, 0],
      extrapolate: 'clamp',
    }),
    headerOpacityRange: scrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [1, 0],
      extrapolate: 'clamp',
      easing: Easing.out(Easing.quad),
    }),
    titleOpacityRange: scrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [0, 1],
      extrapolate: 'clamp',
      easing: Easing.in(Easing.quad),
    }),
  })),
)
@connect(({ global, portfolio, loading }) => ({
  constants: global.constants,
  portfolio: portfolio.current,
  loading: loading.effects['portfolio/get'],
}))
export default class PortfolioDetail extends Component {
  state = {
    // index: this.props.navigation.getParam('landing_index', 0),
  };

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
    const item = this.props.navigation.getParam('item');
    if (item && item.id) {
      this.props.dispatch({
        type: 'portfolio/get',
        payload: item.id,
      });
    }
  };

  renderNavBar = () => {
    const item = this.props.navigation.getParam('item');
    const {
      portfolio,
      loading,
      headerHeightRange,
      headerOpacityRange,
      titleOpacityRange,
    } = this.props;
    return (
      <NavBar
        back
        gradient
        title={item.name}
        titleContainerStyle={{ opacity: titleOpacityRange }}
        renderBottom={() => (
          <Header
            style={{ height: headerHeightRange, opacity: headerOpacityRange }}
            loading={loading}
            data={portfolio}
          />
        )}
      />
    );
  };

  render() {
    const item = this.props.navigation.getParam('item');
    const displayTab =
      item && item.can_calculate && hasPermission('project-statistic');
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView
          stickyHeaderIndices={[0]}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this.props.scrollY,
                },
              },
            },
          ])}
        >
          <Text>哈哈</Text>
          <Text>哈哈</Text>
        </ScrollView>
      </View>
    );
  }
}
