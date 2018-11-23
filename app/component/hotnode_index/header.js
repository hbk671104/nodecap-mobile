import React, { PureComponent } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import R from 'ramda';
import { Flex } from 'antd-mobile';
import { compose, withState } from 'recompose';
import { VictoryChart, VictoryAxis, VictoryBar } from 'victory-native';
import moment from 'moment';

import Explanation from 'component/explanation';
import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';
import Format from 'component/format';
import PercentageChangeItem from './percentage_change_item';

const item = ({
  title,
  number,
  change,
  percentage_change,
  index_precision = 0,
  selected,
  onPress,
  onExplanationPress,
}) => {
  const minus_percentage = percentage_change < 0;
  return (
    <Touchable style={{ flex: 1 }} onPress={onPress}>
      <View
        style={[
          styles.item.container,
          selected && { backgroundColor: '#1890FF' },
        ]}
      >
        <Flex justify="space-between">
          <Touchable borderless onPress={onExplanationPress}>
            <Flex>
              <Text
                style={[styles.item.title.text, selected && { color: 'white' }]}
              >
                {title}
              </Text>
              <Image
                style={{ marginLeft: 3 }}
                source={
                  selected
                    ? require('asset/public_project/explanation.png')
                    : require('asset/public_project/explanation_dim.png')
                }
              />
            </Flex>
          </Touchable>
          <Text
            style={[
              styles.item.content.change,
              selected && { color: 'white', fontWeight: 'bold' },
            ]}
          >
            <Icon
              override
              name={`md-arrow-drop${minus_percentage ? 'down' : 'up'}`}
              color={
                selected ? 'white' : minus_percentage ? '#F55454' : '#09AC32'
              }
            />{' '}
            <Format digit={index_precision}>{change}</Format>
          </Text>
        </Flex>
        <View style={styles.item.content.container}>
          <Text
            style={[styles.item.content.text, selected && { color: 'white' }]}
          >
            <Format digit={index_precision}>{number}</Format>
          </Text>
        </View>
        <PercentageChangeItem
          style={[
            { marginTop: 8, alignSelf: 'flex-start' },
            selected && { backgroundColor: 'white' },
          ]}
          textStyle={[selected && { color: '#1890FF' }]}
          percentage_change={percentage_change}
        />
      </View>
    </Touchable>
  );
};

@compose(
  withState('indexType', 'setIndexType', 'hotnode'),
  withState('showHotnodeExplanation', 'setShowHotnodeExplanation', false),
  withState('showMarketExplanation', 'setShowMarketExplanation', false),
)
class CategoryHeader extends PureComponent {
  renderChart = () => {
    const { global, indexType } = this.props;
    const trend = R.pipe(
      R.pathOr([], ['7_days']),
      R.map(t => ({
        x: t.date,
        y: indexType === 'hotnode' ? t.count_change : t.market_change,
      })),
    )(global);

    if (R.length(trend) > 1) {
      return (
        <View style={styles.chart.container}>
          <Text style={styles.chart.title}>单位：个</Text>
          <VictoryChart
            height={192}
            padding={styles.chart.padding}
            domainPadding={{ x: [24, 12], y: [0, 0] }}
          >
            <VictoryAxis
              crossAxis
              style={styles.chart.axis.cross}
              tickFormat={x => moment(x).format('MM.DD')}
            />
            <VictoryAxis
              dependentAxis
              style={styles.chart.axis.dependent}
              // tickValues={R.map(t => t.y)(trend)}
              tickFormat={y => Math.floor(y)}
            />
            <VictoryBar style={styles.chart.bar} barWidth={10} data={trend} />
          </VictoryChart>
        </View>
      );
    }
    return null;
  };

  render() {
    const {
      global,
      indexType,
      setIndexType,
      showHotnodeExplanation,
      setShowHotnodeExplanation,
      showMarketExplanation,
      setShowMarketExplanation,
    } = this.props;

    const count = R.pathOr('--', ['count'])(global);
    const count_change = R.pathOr(0, ['count_change'])(global);
    const count_change_percentage = R.pathOr(0, ['count_change_percentage'])(
      global,
    );
    const heat = R.pathOr('--', ['heat'])(global);
    const heat_change = R.pathOr(0, ['heat_change'])(global);
    const heat_change_percentage = R.pathOr(0, ['heat_change_percentage'])(
      global,
    );
    const market = R.pathOr('--', ['market'])(global);
    const market_change = R.pathOr(0, ['market_change'])(global);
    const market_change_percentage = R.pathOr(0, ['market_change_percentage'])(
      global,
    );

    return (
      <View>
        <Flex style={styles.container}>
          {item({
            title: '项目指数',
            number: heat,
            change: heat_change,
            percentage_change: heat_change_percentage,
            index_precision: 1,
            selected: indexType === 'hotnode',
            onPress: () => setIndexType('hotnode'),
            onExplanationPress: () => setShowHotnodeExplanation(true),
          })}
          {item({
            title: '上所指数',
            number: market,
            change: market_change,
            percentage_change: market_change_percentage,
            selected: indexType === 'market',
            onPress: () => setIndexType('market'),
            onExplanationPress: () => setShowMarketExplanation(true),
          })}
        </Flex>
        <Flex style={styles.misc.container} justify="space-between">
          <Flex>
            <View
              style={[styles.misc.circle, { backgroundColor: '#1890FF' }]}
            />
            <Text style={styles.misc.title}>
              昨日新增项目数{' '}
              <Text style={{ color: '#1890FF', fontWeight: 'bold' }}>
                <Format digit={0}>{count_change}</Format>
              </Text>
            </Text>
          </Flex>
          <Flex>
            <View
              style={[styles.misc.circle, { backgroundColor: '#09AC32' }]}
            />
            <Text style={styles.misc.title}>
              上所指数{' '}
              <Text
                style={{
                  fontSize: 14,
                  color: 'rgba(0, 0, 0, 0.85)',
                  fontWeight: 'bold',
                }}
              >
                {market_change}
              </Text>{' '}
              <Text
                style={{
                  fontSize: 12,
                  color: market_change_percentage < 0 ? '#F55454' : '#09AC32',
                }}
              >
                {market_change_percentage < 0
                  ? `${market_change_percentage}`
                  : `+${market_change_percentage}`}
                %
              </Text>
            </Text>
          </Flex>
        </Flex>
        {this.renderChart()}
        <Explanation
          visible={showHotnodeExplanation}
          onBackdropPress={() => setShowHotnodeExplanation(false)}
          title="项目指数"
          content="Hotnode 平台目前已经累积 13000+ 个项目，超过 15 个项目数据源，每天仍然在持续增加中；平台根据每日新增的项目数量变化情况，制定“项目指数”，来衡量区块链行业的发展速度和热度。"
        />
        <Explanation
          visible={showMarketExplanation}
          onBackdropPress={() => setShowMarketExplanation(false)}
          title="上所指数"
          content="Hotnode 平台目前覆盖全网绝大部分主流交易所，实时监控上所公告的发布；平台根据每日上所公告数量的变化情况，制定“上所指数”。"
        />
      </View>
    );
  }
}

const styles = {
  container: {
    marginHorizontal: 6,
    marginTop: 12,
  },
  top: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    dot: {
      height: 5,
      width: 5,
      borderRadius: 2.5,
      backgroundColor: '#1890FF',
      marginRight: 8,
    },
    title: {
      fontSize: 15,
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 'bold',
    },
    more: {
      fontSize: 12,
      color: '#1890FF',
      fontWeight: 'bold',
    },
  },
  divider: {
    backgroundColor: '#E9E9E9',
    width: StyleSheet.hairlineWidth,
    height: 50,
  },
  item: {
    container: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 18,
      marginHorizontal: 6,
      borderRadius: 2,
      borderColor: '#ECECEC',
      borderWidth: StyleSheet.hairlineWidth,
    },
    title: {
      text: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.45)',
      },
    },
    content: {
      container: {
        marginTop: 8,
        flexDirection: 'row',
      },
      text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.85)',
      },
      change: {
        marginLeft: 8,
        fontSize: 12,
        color: '#333333',
      },
    },
  },
  misc: {
    container: {
      paddingHorizontal: 12,
      marginTop: 20,
    },
    circle: {
      height: 5,
      width: 5,
      borderRadius: 2.5,
      marginRight: 3,
    },
    title: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
    },
  },
  chart: {
    container: {
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    title: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 11,
    },
    padding: {
      top: 12,
      left: 36,
      right: 24,
      bottom: 24,
    },
    axis: {
      cross: {
        tickLabels: {
          fontSize: 11,
          fill: 'rgba(0, 0, 0, 0.45)',
        },
        axis: { stroke: '#979797', strokeWidth: StyleSheet.hairlineWidth },
      },
      dependent: {
        tickLabels: {
          fontSize: 10,
          fill: 'rgba(0, 0, 0, 0.45)',
        },
        grid: { stroke: '#EFEFEF', strokeWidth: StyleSheet.hairlineWidth },
        axis: { stroke: 'none', strokeWidth: StyleSheet.hairlineWidth },
      },
    },
    bar: {
      data: {
        fill: '#1890FF',
      },
    },
  },
};

export default CategoryHeader;
