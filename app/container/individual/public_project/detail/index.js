import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { connect } from 'react-redux';
import { compose, withState, withProps } from 'recompose';
import R from 'ramda';
import { Toast } from 'antd-mobile';

import SafeArea from 'component/uikit/safeArea';
import NavBar, { realBarHeight } from 'component/navBar';
import Empty from 'component/empty';
import Gradient from 'component/uikit/gradient';
import { NavigationActions } from 'react-navigation';

import Description from './page/description';
import Trend from './page/trend';
import Financing from './page/financing';
import Return from './page/return';
import Pairs from './page/pairs';
import Chart from './chart';
import Fund from './fund';
import Header, { headerHeight } from './header';
import Selector from './selector';
import Bottom from './bottom';
import styles from './style';
import StatusSelector from './statusSelector';

const selectionList = [
  {
    component: Description,
    name: '详情',
  },
  {
    component: Financing,
    name: '募集信息',
  },
  {
    component: Trend,
    name: '动态',
  },
  {
    component: Pairs,
    name: '交易所',
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
@connect(({ public_project, loading, global }, props) => {
  const item = props.navigation.getParam('item');
  return {
    id: R.pathOr(0, ['id'])(item),
    portfolio: R.pathOr({}, ['current'])(public_project),
    loading: loading.effects['public_project/get'],
    favor_loading: loading.effects['public_project/favor'],
    status: R.pathOr([], ['constants', 'project_status'])(global),
  };
})
@compose(
  withState('currentPage', 'setCurrentPage', R.path([0])(selectionList)),
  withState('animateY', 'setAnimatedY', new Animated.Value(0)),
  withState('selectorY', 'setSelectorY', 0),
  withState('showStatusSelector', 'toggleStatusSelector', false),
  withProps(({ animateY }) => ({
    headerWrapperYRange: animateY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [0, -headerHeight],
      extrapolate: 'clamp',
    }),
    headerOpacityRange: animateY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
    titleOpacityRange: animateY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  })),
)
export default class PublicProjectDetail extends Component {
  componentWillMount() {
    this.loadDetail();
  }

  componentDidMount() {
    this.props.track('进入');
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'public_project/clearCurrent',
    });
  }

  loadDetail = () => {
    this.props.dispatch({
      type: 'public_project/get',
      id: this.props.id,
    });
  };

  showToast = () => {
    Toast.info('可在投资库中管理该项目');
  };

  handleFavorPress = () => {
    const is_focused = R.pathOr(false, ['is_focused'])(this.props.portfolio);
    if (is_focused) {
      this.props.dispatch({
        type: 'public_project/unfavor',
        payload: [this.props.id],
      });
    } else {
      this.props.dispatch({
        type: 'public_project/favor',
        payload: [this.props.id],
      });
    }
  };

  handleInvestmentPress = () => {
    this.props.dispatch(NavigationActions.navigate({
      routeName: 'PublicProjectRecord',
      params: {
        id: this.props.id,
      },
    }));
  };

  handlePageSwitch = page => () => {
    this.props.setCurrentPage(page);
  };

  handleSelectorOnLayout = ({ nativeEvent: { layout } }) => {
    this.props.setSelectorY(layout.y);
  };

  handleSubmit = status => {
    this.props.dispatch({
      type: 'public_project/favor',
      payload: [this.props.id],
      status,
      callback: success => {
        if (success) {
          this.props.toggleStatusSelector();
          this.showToast();
        }
      },
    });
  };

  renderNavBarBackground = () => {
    const { portfolio, headerWrapperYRange, headerOpacityRange } = this.props;
    return (
      <Animated.View
        style={[
          styles.navBar.wrapper,
          { height: realBarHeight + headerHeight },
          {
            transform: [
              {
                translateY: headerWrapperYRange,
              },
            ],
          },
        ]}
      >
        <Gradient style={{ flex: 1 }}>
          <Header
            {...this.props}
            style={{ opacity: headerOpacityRange, paddingTop: realBarHeight }}
            data={portfolio}
          />
        </Gradient>
      </Animated.View>
    );
  };

  render() {
    const {
      currentPage: Current,
      portfolio,
      titleOpacityRange,
      favor_loading,
    } = this.props;
    return (
      <SafeArea style={styles.container}>
        {this.renderNavBarBackground()}
        <NavBar
          back
          iconStyle={styles.navBar.icon}
          style={styles.navBar.container}
          title={R.pathOr('', ['name'])(portfolio)}
          titleContainerStyle={{ opacity: titleOpacityRange }}
        />
        <Animated.ScrollView
          contentContainerStyle={{
            paddingTop: headerHeight,
          }}
          scrollEventThrottle={1}
          stickyHeaderIndices={[0]}
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
        >
          <Fund {...this.props} />
          <Chart {...this.props} />
          <Selector
            onLayout={this.handleSelectorOnLayout}
            list={selectionList}
            page={Current}
            onPress={this.handlePageSwitch}
          />
          <View style={styles.page}>
            <Current.component {...this.props} />
          </View>
        </Animated.ScrollView>
        <Bottom
          {...this.props}
          onFavorPress={this.handleFavorPress}
          onInvestmentPress={this.handleInvestmentPress}
        />
        <StatusSelector
          loading={favor_loading}
          isVisible={this.props.showStatusSelector}
          onCancel={() => this.props.toggleStatusSelector(false)}
          onSubmit={this.handleSubmit}
        />
      </SafeArea>
    );
  }
}
