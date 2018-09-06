import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
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

  render() {
    const item = this.props.navigation.getParam('item');
    const displayTab =
      item && item.can_calculate && hasPermission('project-statistic');
    const { currentPage: Current } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView
          contentContainerStyle={styles.scroll.contentContainer}
          // bounces={false}
          // scrollEventThrottle={16}
          stickyHeaderIndices={[0]}
          onScroll={this.handleOnScroll}
        >
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
