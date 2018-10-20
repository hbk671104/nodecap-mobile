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
import { hasPermission } from 'component/auth/permission/lock';
import { NavigationActions } from 'react-navigation';
import Share from '../../../individual/public_project/detail/share';

import Description from './page/description';
import Trend from './page/trend';
import Header, { headerHeight } from './header';
import Selector from './selector';
import Bottom from './bottom';
import styles from './style';
import StatusSelector from './statusSelector';

const calcHeaderHeight = ({ can_calculate, purpose }) => {
  let baseHeight = headerHeight;
  if (
    R.compose(
      R.not,
      R.isEmpty,
    )(purpose)
  ) {
    baseHeight += 37;
  }
  return baseHeight;
};

@global.bindTrack({
  page: '项目详情',
  name: 'App_ProjectDetailOperation',
})
@connect(({ public_project, loading, global }, props) => {
  const item = props.navigation.getParam('item');
  const id = R.pathOr(0, ['id'])(item);
  return {
    id,
    portfolio: R.pathOr({}, ['current', id])(public_project),
    loading: loading.effects['public_project/getOrganization'],
    favor_loading: loading.effects['public_project/addToWorkflow'],
    status: R.pathOr([], ['constants', 'project_status'])(global),
  };
})
@compose(
  withState('showShareModal', 'toggleShareModal', false),
  withState('currentScrollY', 'setCurrentScrollY', 0),
  withState('animateY', 'setAnimatedY', new Animated.Value(0)),
  withState('selectorY', 'setSelectorY', 0),
  withState('showStatusSelector', 'toggleStatusSelector', false),
  withProps(({ animateY, portfolio }) => {
    const trends = R.pathOr([], ['news', 'data'])(portfolio);
    const height = calcHeaderHeight({ purpose: portfolio.purpose });

    return {
      headerWrapperYRange: animateY.interpolate({
        inputRange: [0, height],
        outputRange: [0, -height],
        extrapolate: 'clamp',
      }),
      headerOpacityRange: animateY.interpolate({
        inputRange: [0, height],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      }),
      titleOpacityRange: animateY.interpolate({
        inputRange: [0, height],
        outputRange: [0, 1],
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

  loadDetail = () => {
    this.props.dispatch({
      type: 'public_project/getOrganization',
      id: this.props.id,
    });
  };

  showToast = () => {
    Toast.info('可在投资库中管理该项目');
  };

  handleStatusPress = () => {
    this.props.track('点击添加至工作流按钮');
    const matched = R.pathOr(false, ['matched'])(this.props.portfolio);
    if (matched) {
      this.showToast();
    } else {
      this.props.toggleStatusSelector(true);
    }
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

  handleSubmit = status => {
    this.props.track('提交项目初始状态');
    this.props.dispatch({
      type: 'public_project/addToWorkflow',
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
    const height = calcHeaderHeight({ purpose: portfolio.purpose });

    return (
      <Animated.View
        style={[
          styles.navBar.wrapper,
          {
            height: realBarHeight + height,
            transform: [
              {
                translateY: headerWrapperYRange,
              },
            ],
            zIndex: 50,
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
    if (!hasPermission('project-view')) {
      return (
        <View style={styles.container}>
          <NavBar gradient back />
          <Empty
            image={require('asset/empty/permission_denied.png')}
            title="您尚未解锁此权限"
          />
        </View>
      );
    }

    const {
      selectionList,
      currentPage: Current,
      portfolio,
      titleOpacityRange,
      favor_loading,
    } = this.props;
    const height = calcHeaderHeight({ purpose: portfolio.purpose });

    return (
      <SafeArea style={styles.container}>
        {this.renderNavBarBackground()}
        <NavBar
          back
          iconStyle={styles.navBar.icon}
          style={[styles.navBar.container, { zIndex: 100 }]}
          title={R.pathOr('', ['name'])(portfolio)}
          titleContainerStyle={{ opacity: titleOpacityRange }}
        />
        <Animated.ScrollView
          ref={ref => {
            this.scroll = ref;
          }}
          contentContainerStyle={{
            paddingTop: height,
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
              listener: event => {
                const offsetY = event.nativeEvent.contentOffset.y;
                this.props.setCurrentScrollY(offsetY);
              },
            },
          )}
        >
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
        <Bottom
          {...this.props}
          onStatusPress={this.handleStatusPress}
          openShareModal={() => {
            this.props.toggleShareModal(true);
          }}
        />
        <StatusSelector
          loading={favor_loading}
          isVisible={this.props.showStatusSelector}
          onCancel={() => this.props.toggleStatusSelector(false)}
          onSubmit={this.handleSubmit}
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
