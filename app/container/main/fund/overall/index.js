import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import RefreshableScroll from 'component/scrollView';
import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';
import Format from 'component/format';
import FundGroup from '../components/group';
import Summary from '../components/summary';
import DataItem from '../components/dataItem';
import Investment from '../components/investment';
import ProjectItem from '../components/projectItem';
import styles from './style';

@connect(({ fund, loading }, { fid }) => ({
  overall: R.pipe(
    R.pathOr([], ['funds']),
    R.find(f => `${f.id}` === fid),
    R.pathOr({}, ['general_report']),
  )(fund),
  loading: loading.effects['fund/fetchGeneralReport'],
}))
class FundOverall extends Component {
  componentWillMount() {
    this.loadOverall();
  }

  loadOverall = () => {
    this.props.dispatch({
      type: 'fund/fetchGeneralReport',
      id: this.props.fid,
    });
  };

  handleProjectAllPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'FundProject',
      }),
    );
  };

  handleProjectPress = item => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PortfolioDetail',
        params: {
          item: {
            ...item,
            can_calculate: true,
          },
        },
      }),
    );
  };

  render() {
    const { loading, overall } = this.props;

    const total_count = R.pathOr('--', ['total_count'])(overall);
    const symbol = R.pathOr('-', ['symbol'])(overall);
    const invest_count = R.pathOr('-', ['project_report', 'invest_count'])(
      overall,
    );

    const calc_count = R.pathOr('--', ['project_report', 'calc_count'])(
      overall,
    );
    const total_cost = R.pathOr({}, ['investment', 'total_cost'])(overall);
    const cap = R.pathOr({}, ['investment', 'cap'])(overall);
    const sold_return = R.pathOr({}, ['investment', 'sold_return'])(overall);
    const profits = R.pathOr({}, ['investment', 'profits'])(overall);
    const roi = R.pathOr({}, ['investment', 'roi'])(overall);

    const roiRank = R.pathOr([], ['roi_rank'])(overall);

    return (
      <View style={styles.container}>
        <RefreshableScroll
          enableRefresh
          loading={loading}
          onRefresh={this.loadOverall}
        >
          <FundGroup
            shadow
            title="基金概况"
            renderRight={() => (
              <Text style={styles.summary.right}>
                共 <Format digit={0}>{total_count}</Format> {symbol}
              </Text>
            )}
          >
            <Summary {...this.props} />
          </FundGroup>
          <FundGroup
            style={styles.investment.container}
            title="投资数量"
            subtitle={`(${invest_count})`}
            renderRight={() => (
              <Touchable borderless onPress={this.handleProjectAllPress}>
                <Text style={styles.investment.right}>
                  项目清单 <Icon name="arrow-forward" />
                </Text>
              </Touchable>
            )}
          >
            <Investment {...this.props} />
          </FundGroup>
          <FundGroup
            style={styles.investment.container}
            contentContainer={styles.data.content}
            title="已上所项目浮盈统计"
            subtitle={`(${calc_count})`}
          >
            <DataItem
              title="本金"
              content={R.pathOr('--', [symbol])(total_cost)}
              symbol={symbol}
              subcontent={R.pathOr('--', ['CNY'])(total_cost)}
            />
            <DataItem
              title="市值"
              content={R.pathOr('--', [symbol])(cap)}
              symbol={symbol}
              subcontent={R.pathOr('--', ['CNY'])(cap)}
            />
            <DataItem
              title="出货所得"
              content={R.pathOr('--', [symbol])(sold_return)}
              symbol={symbol}
              subcontent={R.pathOr('--', ['CNY'])(sold_return)}
            />
            <DataItem
              title="累计利润"
              content={R.pathOr('--', [symbol])(profits)}
              symbol={symbol}
              subcontent={R.pathOr('--', ['CNY'])(profits)}
            />
            <DataItem
              title="回报率"
              content={R.pathOr('--', [symbol])(roi)}
              symbol={symbol}
              subcontent={R.pathOr('--', ['CNY'])(roi)}
            />
          </FundGroup>
          <FundGroup title="已上所项目收益 TOP 5">
            {R.pipe(
              R.slice(0, 5),
              R.addIndex(R.map)((r, i) => (
                <ProjectItem
                  key={r.id}
                  index={i}
                  style={styles.projectItem.container}
                  contentContainerStyle={styles.projectItem.contentContainer}
                  data={r}
                  onPress={this.handleProjectPress(r)}
                />
              )),
            )(roiRank)}
          </FundGroup>
        </RefreshableScroll>
      </View>
    );
  }
}

export default FundOverall;
