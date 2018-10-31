import React, { Component } from 'react';
import { View, Animated, Image } from 'react-native';
import { connect } from 'react-redux';
import { compose, withState, withProps } from 'recompose';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import SafeArea from 'component/uikit/safeArea';
import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';

// Partials
import Description from './page/description';
import Trend from './page/trend';
import Return from './page/return';
import Pairs from './page/pairs';
import Chart from './chart';
import Fund from './fund';
import Share from './share';
import Header from './header';
import Selector from './selector';
import Bottom from './bottom';
import styles from './style';

@global.bindTrack({
  page: '项目详情',
  name: 'App_ProjectDetailOperation',
})
@connect(({ public_project, loading, login }, props) => {
  const item = props.navigation.getParam('item');
  const id = R.pathOr(0, ['id'])(item);
  const portfolio = R.pathOr({}, ['current', id])(public_project);
  const market = R.pathOr({}, ['market'])(portfolio);
  return {
    id,
    portfolio,
    loading: loading.effects['public_project/get'],
    favor_loading: loading.effects['public_project/favor'],
    can_calculate: R.not(R.isEmpty(market)),
    logged_in: !!login.token,
    base_symbol: R.pathOr('CNY', ['market', 'quote'])(portfolio),
  };
})
@compose(
  withState('showShareModal', 'toggleShareModal', false),
  withState('currentScrollY', 'setCurrentScrollY', 0),
  withState('animateY', 'setAnimatedY', new Animated.Value(0)),
  withState('selectorY', 'setSelectorY', 0),
  withProps(({ animateY, portfolio }) => {
    const investment = R.pathOr({}, ['roi'])(portfolio);
    const symbols = R.pathOr([], ['symbols'])(portfolio);
    const trends = R.pathOr([], ['news', 'data'])(portfolio);
    return {
      navBarOpacityRange: animateY.interpolate({
        inputRange: [0, 160],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      backgroundOpacityRange: animateY.interpolate({
        inputRange: [0, 160],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      }),
      selectionList: [
        {
          component: Description,
          name: '详情',
        },
        ...(R.isEmpty(trends)
          ? []
          : [
              {
                component: Trend,
                name: '动态',
              },
            ]),
        ...(R.isEmpty(symbols)
          ? []
          : [
              {
                component: Pairs,
                name: '交易所',
              },
            ]),
        ...(R.isEmpty(investment)
          ? []
          : [
              {
                component: Return,
                name: '回报',
              },
            ]),
      ],
    };
  }),
  withState('currentPage', 'setCurrentPage', ({ selectionList }) =>
    R.path([0])(selectionList),
  ),
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
      id: this.props.id,
    });
  }
  onPressClaimCoin = () => {
    this.props.track('点击认领按钮');
    if (!this.props.logged_in) {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      );
      return;
    }
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ClaimMyProject',
        params: {
          project_id: this.props.id,
        },
      }),
    );
  };
  loadDetail = () => {
    this.props.dispatch({
      type: 'public_project/get',
      id: this.props.id,
    });
  };

  handleFavorPress = () => {
    this.props.track('点击关注按钮');
    if (!this.props.logged_in) {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      );
      return;
    }

    const is_focused = R.pathOr(false, ['is_focused'])(this.props.portfolio);
    this.props.dispatch({
      type: is_focused ? 'public_project/unfavor' : 'public_project/favor',
      payload: this.props.id,
    });
  };

  handleInvestmentPress = () => {
    this.props.track('点击投资记录按钮');

    if (!this.props.logged_in) {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      );
      return;
    }

    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PublicProjectRecord',
        params: {
          id: this.props.id,
        },
      }),
    );
  };

  handleCommentPress = () => {
    this.props.track('点击点评按钮');

    if (!this.props.logged_in) {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      );
      return;
    }

    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'CommentCoin',
        params: {
          coin: this.props.portfolio,
        },
      }),
    );
  };

  handlePageSwitch = page => () => {
    this.props.setCurrentPage(page, () => {
      if (this.props.currentScrollY < this.props.selectorY) {
        return;
      }
      this.scroll
        .getNode()
        .scrollTo({ y: this.props.selectorY, animated: false });
    });
  };

  handleSelectorOnLayout = ({ nativeEvent: { layout } }) => {
    this.props.setSelectorY(layout.y);
  };

  handleInstitutionItemPress = item => {
    this.props.track('点击进入机构详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'InstitutionDetail',
        params: {
          id: item.id,
        },
        key: `InstitutionDetail_${item.id}`,
      }),
    );
  };

  render() {
    const {
      currentPage: Current,
      selectionList,
      portfolio,
      currentScrollY,
      navBarOpacityRange,
      backgroundOpacityRange,
    } = this.props;

    return (
      <SafeArea style={styles.container}>
        <Animated.View
          style={[styles.wrapper, { opacity: backgroundOpacityRange }]}
        />
        <Animated.View
          style={[
            styles.navBar.wrapper,
            { opacity: navBarOpacityRange, zIndex: 50 },
          ]}
        >
          <NavBar
            back
            barStyle={currentScrollY > 80 ? 'dark-content' : 'light-content'}
            style={styles.navBar.container}
            title={R.path(['name'])(portfolio)}
          />
        </Animated.View>
        <Animated.ScrollView
          ref={ref => {
            this.scroll = ref;
          }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          stickyHeaderIndices={[3]}
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
              listener: event => {
                const offsetY = event.nativeEvent.contentOffset.y;
                this.props.setCurrentScrollY(offsetY);
              },
            },
          )}
        >
          <Header {...this.props} />
          <Fund {...this.props} />
          <Chart {...this.props} />
          <Selector
            onLayout={this.handleSelectorOnLayout}
            list={selectionList}
            page={Current}
            onPress={this.handlePageSwitch}
          />
          <View style={styles.page}>
            <Current.component
              {...this.props}
              onInstitutionItemPress={this.handleInstitutionItemPress}
            />
          </View>
        </Animated.ScrollView>
        <Touchable
          style={styles.claim.container}
          onPress={this.onPressClaimCoin}
        >
          <Image source={require('asset/project/detail/claim.png')} />
        </Touchable>
        <Bottom
          {...this.props}
          openShareModal={() => {
            this.props.toggleShareModal(true);
          }}
          onFavorPress={this.handleFavorPress}
          onInvestmentPress={this.handleInvestmentPress}
          onPressComment={this.handleCommentPress}
        />
        <Share
          onClose={() => this.props.toggleShareModal(false)}
          coin={this.props.portfolio}
          visible={this.props.showShareModal}
        />
      </SafeArea>
    );
  }
}
