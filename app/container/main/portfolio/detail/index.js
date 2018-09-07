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
import StatusDisplay from 'component/project/statusDisplay';
import Touchable from 'component/uikit/touchable';
import { hasPermission } from 'component/auth/permission/lock';

import Description from './page/description';
import Pairs from './page/pairs';
import Return from './page/return';
import Trend from './page/trend';
import Header from './header';
import Selector from './selector';
import Chart from './chart';
import Fund from './fund';
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
    can_calculate: R.pathOr(false, ['can_calculate'])(item),
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
        this.updateDetail({ status });
      },
    );
  };

  handleCoinMatchPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PortfolioDetailMatchCoinUpdate',
        params: {
          id: this.props.id,
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

  handleAddInvestmentPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PortfolioInvestmentCreate',
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

  renderSwitchButton = () => {
    const { portfolio, transformed, unmatched } = this.props;

    if (transformed) return null;
    return (
      <View style={styles.switch.container}>
        <View style={styles.switch.content.wrapper}>
          <Touchable activeOpacity={0.98} onPress={this.handleStatusPress}>
            <View style={styles.switch.content.container}>
              <StatusDisplay
                status={portfolio.status}
                titleStyle={styles.switch.status.text}
              />
              <Text style={styles.switch.content.text}>切换</Text>
            </View>
          </Touchable>
        </View>
        <View style={styles.switch.content.wrapper}>
          <Touchable activeOpacity={0.98} onPress={this.handleCoinMatchPress}>
            <View style={styles.switch.content.container}>
              <Text
                style={[
                  styles.switch.status.text,
                  styles.switch.matched.highlight,
                ]}
              >
                {unmatched ? '立即匹配' : '项目已匹配'}
              </Text>
              {!unmatched && (
                <Text style={styles.switch.content.text}>切换</Text>
              )}
            </View>
          </Touchable>
        </View>
      </View>
    );
  };

  renderRecordButton = () => (
    <Touchable onPress={this.handleRecordButtonPress}>
      <View style={styles.record.container}>
        <Text style={styles.record.text}>查看完整投资、回币、卖出记录</Text>
      </View>
    </Touchable>
  );

  render() {
    const { currentPage: Current } = this.props;
    return (
      <SafeArea style={styles.container}>
        {this.renderNavBar()}
        <ScrollView
          contentContainerStyle={styles.scroll.contentContainer}
          // scrollEventThrottle={16}
          scrollEventThrottle={500}
          stickyHeaderIndices={[3]}
          onScroll={this.handleOnScroll}
        >
          <Fund {...this.props} />
          {this.renderRecordButton()}
          <Chart {...this.props} />
          <Selector
            list={selectionList}
            page={Current}
            onPress={this.handlePageSwitch}
          />
          <View style={styles.page}>
            <Current.component {...this.props} />
          </View>
        </ScrollView>
        <View style={styles.bottomTab.wrapper}>
          <Touchable
            style={styles.bottomTab.container}
            activeOpacity={0.98}
            onPress={this.handleAddInvestmentPress}
          >
            <Text style={styles.bottomTab.title}>+ 添加投资记录</Text>
          </Touchable>
        </View>
        <View style={styles.switch.wrapper}>{this.renderSwitchButton()}</View>
      </SafeArea>
    );
  }
}
