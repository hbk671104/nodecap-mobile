import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { compose, withState, withProps } from 'recompose';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { Toast } from 'antd-mobile';

import SafeArea from 'component/uikit/safeArea';
import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import Empty from 'component/empty';
import { hasPermission } from 'component/auth/permission/lock';

import Description from './page/description';
import Pairs from './page/pairs';
import Return from './page/return';
import Trend from './page/trend';
import Header from './header';
import Selector from './selector';
import Chart from './chart';
import Fund from './fund';
import Bottom from './bottom';
import styles from './style';

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
@connectActionSheet
@global.bindTrack({
  page: '项目详情',
  name: 'App_ProjectDetailOperation',
})
@compose(
  withState('offsetY', 'setOffsetY', 0),
  withState('currentPage', 'setCurrentPage', {
    component: Trend,
    name: '动态',
  }),
  withProps(({ offsetY }) => ({
    transformed: offsetY > 0,
  })),
)
@connect(({ portfolio, loading, global }, props) => {
  const item = props.navigation.getParam('item');
  const coin = R.pathOr({}, ['current', 'coin'])(portfolio);
  return {
    portfolio: R.pathOr({}, ['current'])(portfolio),
    id: R.pathOr(0, ['id'])(item),
    loading: loading.effects['portfolio/get'],
    stat_loading: loading.effects['portfolio/getStat'],
    status: R.pathOr([], ['constants', 'project_status'])(global),
    base_symbol: R.pathOr('', ['current', 'stats', 'quote'])(portfolio),
    can_calculate: R.pathOr(false, ['current', 'can_calculate'])(portfolio),
    unmatched: R.isEmpty(coin),
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
      payload: this.props.id,
    });
  };

  updateDetail = payload => {
    Toast.loading('更新中...', 0);
    this.props.dispatch({
      type: 'portfolio/updateProject',
      id: this.props.id,
      payload,
      callback: () => {
        Toast.hide();
      },
    });
  };

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

  handleCoinMatchPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PortfolioDetailMatchCoinUpdate',
        params: {
          id: this.props.id,
          coin: R.pathOr({}, ['portfolio', 'coin'])(this.props),
          update: payload => this.updateDetail(payload),
        },
      }),
    );
  };

  handleRecordButtonPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PortfolioRecord',
        params: {
          id: this.props.id,
        },
      }),
    );
  };

  handleOnScroll = ({ nativeEvent: { contentOffset } }) => {
    const { setOffsetY } = this.props;
    setOffsetY(contentOffset.y);
  };

  handlePageSwitch = page => () => {
    this.props.setCurrentPage(page);
  };

  renderNavBar = () => {
    const { transformed, portfolio } = this.props;
    return (
      <NavBar
        back
        gradient
        bottomHidden={transformed}
        title={transformed ? portfolio.name : ''}
        renderBottom={() => <Header {...this.props} data={portfolio} />}
      />
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

    const { currentPage: Current } = this.props;
    return (
      <SafeArea style={styles.container}>
        {this.renderNavBar()}
        <ScrollView
          contentContainerStyle={styles.scroll.contentContainer}
          // scrollEventThrottle={16}
          scrollEventThrottle={500}
          stickyHeaderIndices={[4]}
          onScroll={this.handleOnScroll}
        >
          <Fund {...this.props} />
          <View style={styles.divider} />
          <Chart {...this.props} />
          <View style={styles.divider} />
          <Selector
            list={selectionList}
            page={Current}
            onPress={this.handlePageSwitch}
          />
          <View style={styles.page}>
            <Current.component {...this.props} />
          </View>
        </ScrollView>
        <Bottom
          {...this.props}
          onRecordPress={this.handleRecordButtonPress}
          onStatusPress={this.handleStatusPress}
          onMatchPress={this.handleCoinMatchPress}
        />
      </SafeArea>
    );
  }
}
