import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';
import R from 'ramda';

import Avatar from 'component/uikit/avatar';
import Touchable from 'component/uikit/touchable';
import { mainColor } from 'component/uikit/color';
import Format from 'component/format';

import ReportItemProgress from './progress';
import style from './style';

class ReportItem extends PureComponent {
  /**
   * 头像及名称
   * @returns {XML}
   */
  renderAvatar = () => {
    const { data } = this.props;
    const name = R.pathOr('--', ['name'])(data);
    return (
      <Flex>
        <Avatar source={{ uri: data.logo_url || '' }} size={40} />
        <Text style={style.name}>{name}</Text>
      </Flex>
    );
  };

  /**
   * 头像右侧投资信息
   * @returns {XML}
   */
  renderProjectInvestment = () => {
    const { data } = this.props;
    const ratio = R.pathOr('--', ['ratio'])(data);
    const symbol = R.pathOr('--', ['invest_symbol'])(data);
    const invest_count = R.pathOr('--', ['invest_count', symbol])(data);
    const invest_count_cny = R.pathOr('--', ['invest_count', 'CNY'])(data);
    return (
      <Flex direction="column" align="end">
        <Text style={style.investment}>
          投资{' '}
          <Text style={style.investmentCount}>
            <Format digit={0}>{invest_count}</Format>
          </Text>{' '}
          {symbol}
        </Text>
        <Text style={[style.investment, { marginTop: 5 }]}>
          约为 <Format digit={1}>{invest_count_cny}</Format> 元
        </Text>
        <Text style={[style.investment, { marginTop: 5 }]}>
          占基金 <Format digit={1}>{ratio}</Format>%
        </Text>
      </Flex>
    );
  };

  /**
   * 投资回报率
   * @returns {XML}
   */
  renderROI = () => {
    const { data } = this.props;
    const symbol = R.pathOr('--', ['invest_symbol'])(data);
    const roi = R.pathOr('--', ['roi', symbol])(data);
    const roi_cny = R.pathOr('--', ['roi', 'CNY'])(data);
    return (
      <View style={style.roi}>
        <Text style={style.roiTitle}>回报率</Text>
        <Flex align="end">
          <Text style={style.percent}>
            <Format digit={1}>{roi}</Format>
          </Text>
          <Text style={style.percentSymbol}>%</Text>
          <Text style={style.baseCoin}>({symbol})</Text>
          <Text style={style.roiDivision}>/</Text>
          <Text style={style.cnyPercent}>
            <Format digit={1}>{roi_cny}</Format>%
          </Text>
          <Text style={style.cnyCoin}>(CNY)</Text>
        </Flex>
      </View>
    );
  };

  render() {
    const { data } = this.props;
    const total_return = R.pathOr('--', ['total_return'])(data);
    const current_return = R.pathOr('--', ['current_return'])(data);
    const shipments = R.pathOr('--', ['shipments'])(data);
    return (
      <Touchable foreground onPress={this.props.onPress}>
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
              leftNumber={current_return}
              rightNumber={total_return - current_return}
              unit="ZIL"
            />
          </View>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <ReportItemProgress
              title="已卖出"
              rightTitle="剩余"
              color="#F88E40"
              leftNumber={shipments}
              rightNumber={total_return - shipments}
              unit="ZIL"
            />
          </View>
          <Flex style={style.actionBar}>
            <Touchable style={style.button}>
              <Text style={style.buttonText}>投资记录</Text>
            </Touchable>
            <View style={style.buttonDivision} />
            <Touchable style={style.button}>
              <Text style={style.buttonText}>卖出记录</Text>
            </Touchable>
          </Flex>
        </View>
      </Touchable>
    );
  }
}

ReportItem.propTypes = {
  onPress: PropTypes.func,
};

ReportItem.defaultProps = {
  onPress: () => null,
};

export default ReportItem;
