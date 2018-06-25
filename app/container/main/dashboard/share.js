import React, { Component } from 'react';
import {
  Animated,
  Text,
  View,
  ScrollView,
} from 'react-native';
import * as R from 'ramda';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import ViewShot from 'react-native-view-shot';

import NavBar from 'component/navBar';
import NodeCapIcon from 'component/icon/nodecap';
import Empty from 'component/empty';

import Header from './partials/header';
import ProfitSwiper from './partials/profitSwiper';
import DashboardGroup from './partials/group';
import InvestNumber from './partials/investNumber';
import ProjectItem from './partials/projectItem';
import Investment from './partials/investment';
import styles from './style';

@connect(({ dashboard, fund, loading }) => ({
  dashboard: dashboard.data,
  funds: fund.funds,
  fundsError: fund.error,
  loading: loading.effects['dashboard/fetch'],
}))
export default class Dashboard extends Component {
  state = {
    currentFund: R.pathOr({}, ['funds', 0])(this.props),
  };

  componentWillMount() {
    const { currentFund } = this.state;
    this.getDashboardData(currentFund.id);
  }

  getDashboardData = (id) => {
    this.props.dispatch({
      type: 'dashboard/fetch',
      payload: id,
      callback: () => {
        this.setState({
          currentFund: R.find(R.propEq('id', id))(this.props.funds),
        });
      },
    });
  };

  renderBackground = () => (
    <Animated.Image style={styles.background} source={require('asset/dashboard_bg.png')} />
  );

  renderForeground = () => <Header {...this.props} style={styles.foreground} />;

  renderFixedHeader = () => {
    const { currentFund } = this.state;
    return (
      <NavBar
        style={styles.navbar.container}
        wrapperStyle={{ backgroundColor: 'white' }}
        barStyle="light-content"
        renderTitle={() => currentFund.name}
      />
    );
  };

  render() {
    const { dashboard } = this.props;
    const roiRankCount = R.length(R.path(['ROIRank'])(dashboard));
    if (!dashboard || !this.state.currentFund) {
      return (
        <Empty>
          <View style={styles.empty.group.container}>
            <Text style={styles.empty.group.title}>
              {'完善项目和投资记录，\n即可在此查看基金收益统计'}
            </Text>
            <Text style={styles.empty.group.subtitle}>
              <NodeCapIcon name="diannao" color="#4A4A4A" size={14} />
              {'  '}使用电脑端打开
              <Text
                style={{ color: '#1890FF' }}
                onPress={() => Communications.web('https://hotnode.io')}
              >
                {' hotnode.io '}
              </Text>，录入更快捷、高效
            </Text>
          </View>
          <View style={styles.empty.bottom.container}>
            <Text style={styles.empty.bottom.title}>
              <NodeCapIcon name="kefu" color="black" size={14} />
              {'  '}7x24小时服务热线
            </Text>
            <Text
              style={styles.empty.bottom.subtitle}
              onPress={() => Communications.phonecall('159-3715-9166', false)}
            >
              159-3715-9166
            </Text>
          </View>
        </Empty>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView.container}
          showsVerticalScrollIndicator={false}
        >
          <ViewShot ref={(ref) => {
            this.viewShot = ref;
          }}
          >
            <View style={styles.parallax}>
              {this.renderBackground()}
              {this.renderForeground()}
            </View>
            <View
              style={{
              flex: 1,
              paddingTop: 50,
            }}
            >
              <ProfitSwiper
                style={styles.swiper}
                total={R.pick(['ETH'])(R.path(['totalProfits', 'count'])(dashboard))}
                daily={R.pick(['ETH'])(R.path(['dailyProfits', 'count'])(dashboard))}
                weekly={R.pick(['ETH'])(R.path(['weeklyProfits', 'count'])(dashboard))}
              />
              {roiRankCount > 0 && (
                <DashboardGroup style={styles.dashboardGroup} title="投资回报率 TOP 5" icon="TOP">
                  {dashboard.ROIRank.map((r, i) => <ProjectItem key={i} index={i} data={r} />)}
                </DashboardGroup>
              )}
              <DashboardGroup title="已投项目数量" icon="yitouxiangmu">
                <InvestNumber data={dashboard.portfolio} />
              </DashboardGroup>
              <DashboardGroup style={styles.dashboardGroup} title="投资金额" icon="touzijine">
                <Investment data={dashboard.investment} />
              </DashboardGroup>
            </View>
          </ViewShot>
        </ScrollView>
        {this.renderFixedHeader()}
      </View>
    );
  }
}
