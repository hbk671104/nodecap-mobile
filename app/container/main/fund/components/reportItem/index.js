import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';

import Avatar from 'component/uikit/avatar';
import Touchable from 'component/uikit/touchable';
import { mainColor } from 'component/uikit/color';

import ReportItemProgress from './progress';
import style from './style';

class ReportItem extends Component {
  /**
   * 头像及名称
   * @returns {XML}
   */
  renderAvatar() {
    return (
      <Flex>
        <Avatar source={{ uri: 'https://placehold.it/80x80' }} size={40} />
        <Text style={style.name}>SOC</Text>
      </Flex>
    );
  }

  /**
   * 头像右侧投资信息
   * @returns {XML}
   */
  renderProjectInvestment() {
    return (
      <Flex direction="column" align="end">
        <Text
          style={[
            style.investment,
            {
              marginBottom: 5,
            },
          ]}
        >
          投资 <Text style={style.investmentCount}>2,790,000</Text> ETH | 占基金
          1.48%
        </Text>
        <Text style={style.investment}>约为 641.7 万元</Text>
      </Flex>
    );
  }

  /**
   * 投资回报率
   * @returns {XML}
   */
  renderROI() {
    return (
      <View style={style.roi}>
        <Text style={style.roiTitle}>回报率</Text>
        <Flex align="end">
          <Text style={style.percent}>100</Text>
          <Text style={style.percentSymbol}>%</Text>
          <Text style={style.baseCoin}>(ETH)</Text>
          <Text style={style.roiDivision}>/</Text>
          <Text style={style.cnyPercent}>28%</Text>
          <Text style={style.cnyCoin}>(CNY)</Text>
        </Flex>
      </View>
    );
  }
  render() {
    return (
      <View style={style.container}>
        <Flex justify="space-between" align="center">
          {this.renderAvatar()}
          {this.renderProjectInvestment()}
        </Flex>
        {this.renderROI()}
        <View
          style={{
            marginTop: 14,
          }}
        >
          <ReportItemProgress
            title="已回币"
            rightTitle="锁仓中"
            color={mainColor}
            leftNumber={1000000}
            rightNumber={2000000}
            unit="ZIL"
          />
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <ReportItemProgress
            title="已出货"
            rightTitle="剩余"
            color="#F88E40"
            leftNumber={1000000}
            rightNumber={2000000}
            unit="ZIL"
          />
        </View>
        <Flex style={style.actionBar}>
          <Touchable style={style.button}>
            <Text style={style.buttonText}>投资记录</Text>
          </Touchable>
          <View style={style.buttonDivision} />
          <Touchable style={style.button}>
            <Text style={style.buttonText}>出货记录</Text>
          </Touchable>
        </Flex>
      </View>
    );
  }
}

ReportItem.propTypes = {};
ReportItem.defaultProps = {};

export default ReportItem;
