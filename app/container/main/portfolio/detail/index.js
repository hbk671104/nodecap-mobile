import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { compose, withState, withProps } from 'recompose';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { Toast } from 'antd-mobile';

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
    transformed: offsetY > 50,
  })),
)

@connect(({ portfolio, loading, global }, props) => {
  const item = props.navigation.getParam('item');
  return {
    portfolio: R.pathOr({}, ['current'])(portfolio),
    id: R.pathOr(0, ['id'])(item),
    loading: loading.effects['portfolio/get'],
    status: R.pathOr([], ['constants', 'project_status'])(global),
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
        Toast.loading('保存中...', 0);
        this.props.dispatch({
          type: 'portfolio/update',
          id: this.props.id,
          payload: {
            status: newStatus,
          },
          callback: () => {
            this.loadDetail();
            Toast.hide();
          },
        });
        // setCurrentRank(newRank, () => {
        //   Toast.loading('加载中...', 0);
        //   this.list.scrollToOffset({ offset: 0, animated: false });
        //   this.requestData(1, 20, () => {
        //     Toast.hide();
        //   });
        // });
      },
    );
  };

  handleCoinMatchPress = () => {};

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
    const { transformed, portfolio, loading } = this.props;
    return (
      <NavBar
        back
        gradient
        bottomHidden={transformed}
        title={transformed ? portfolio.name : ''}
        renderBottom={() => <Header loading={loading} data={portfolio} />}
      />
    );
  };

  renderSwitchButton = () => {
    const { portfolio, transformed } = this.props;
    const can_calculate = R.pathOr(false, ['can_calculate'])(portfolio);

    if (transformed) return null;
    return (
      <View style={styles.switch.container}>
        <View style={styles.switch.content.wrapper}>
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
        </View>
        <View style={styles.switch.content.wrapper}>
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
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView
          contentContainerStyle={styles.scroll.contentContainer}
          // scrollEventThrottle={16}
          scrollEventThrottle={500}
          stickyHeaderIndices={[1]}
          onScroll={this.handleOnScroll}
        >
          {this.renderRecordButton()}
          <Selector
            list={selectionList}
            page={Current}
            onPress={this.handlePageSwitch}
          />
          <Current.component {...this.props} />
        </ScrollView>
        <View style={styles.switch.wrapper}>{this.renderSwitchButton()}</View>
      </View>
    );
  }
}
