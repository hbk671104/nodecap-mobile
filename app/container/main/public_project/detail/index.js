import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { connect } from 'react-redux';
import { compose, withState, withProps } from 'recompose';
import R from 'ramda';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { Toast } from 'antd-mobile';

import SafeArea from 'component/uikit/safeArea';
import NavBar, { realBarHeight } from 'component/navBar';
import Empty from 'component/empty';
import Gradient from 'component/uikit/gradient';
import { hasPermission } from 'component/auth/permission/lock';

import Description from './page/description';
import Trend from './page/trend';
import Financing from './page/financing';
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
    name: '募资信息',
  },
  {
    component: Trend,
    name: '动态',
  },
];
@connectActionSheet
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

  // updateDetail = payload => {
  //   Toast.loading('更新中...', 0);
  //   this.props.dispatch({
  //     type: 'portfolio/updateProject',
  //     id: this.props.id,
  //     payload,
  //     callback: () => {
  //       Toast.hide();
  //     },
  //   });
  // };

  handleStatusPress = () => {
    const { showActionSheetWithOptions, status } = this.props;
    showActionSheetWithOptions(
      {
        options: [...R.map(r => r.name)(status), '取消'],
        cancelButtonIndex: R.length(status),
      },
      buttonIndex => {
        const newStatus = R.pathOr(null, [buttonIndex, 'value'])(status);
        if (R.isNil(newStatus)) {
          return;
        }
        this.updateDetail({ status: newStatus });
      },
    );
  };

  handlePageSwitch = page => () => {
    this.props.setCurrentPage(page, () => {
      this.scroll
        .getNode()
        .scrollTo({ y: this.props.selectorY, animated: true });
    });
  };

  handleSelectorOnLayout = ({ nativeEvent: { layout } }) => {
    this.props.setSelectorY(layout.y);
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

    const { currentPage: Current, portfolio, titleOpacityRange } = this.props;
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
          ref={ref => {
            this.scroll = ref;
          }}
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
        {/* <Bottom
          {...this.props}
          onRecordPress={this.handleRecordButtonPress}
          onStatusPress={this.handleStatusPress}
          onMatchPress={this.handleCoinMatchPress}
        /> */}
        <StatusSelector
          isVisible={this.props.showStatusSelector}
          onCancel={() => this.props.toggleStatusSelector(false)}
          onSubmit={() => {
            this.props.toggleStatusSelector(false);
          }}
        />
      </SafeArea>
    );
  }
}
