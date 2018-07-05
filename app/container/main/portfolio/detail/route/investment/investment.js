import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';
import * as R from 'ramda';
import moment from 'moment';
import Group from 'component/project/group';

import { renderField } from './field';
import styles from './investmentStyle';

const dateFormat = date => (date ? moment(date).format('YYYY年MM月DD日 HH:mm') : null);

class Investment extends Component {
  renderItemFields(field) {
    const projectProps = path => R.path([...path])(field);
    const tokens = R.pathOr([], ['constants', 'tokens'])(this.props);
    const stages = R.pathOr([], ['constants', 'finance_stages'])(this.props);
    console.log('field', R.find(R.propEq('id', field.invest_token))(tokens));
    const getStageName = item => R.prop('name')(R.find(R.propEq('id', item.stage_id))(stages));
    const getTokenName = item => R.prop('name')(R.find(R.propEq('id', item.invest_token))(tokens));
    const tokenName = R.path(['portfolio', 'token_name'])(this.props);
    return (
      <View>
        <View>
          <Flex>
            {renderField({
              name: '投资类型',
              value: projectProps(['financeType']) === 'token' ? 'Token' : '股权',
              style: {
                flex: 1,
                // alignItems: projectProps(['stage_id']) ? 'flex-start' : 'space-between',
              },
              // valueStyle: {
              //   marginLeft: 14,
              // },
            })}
            {renderField({
              name: '所投阶段',
              value: getStageName(field),
              style: {
                flex: 1,
                // marginLeft: projectProps(['financeType']) ? 0 : 22,
                // paddingLeft: projectProps(['financeType']) ? 10 : 0,
              },
            })}
          </Flex>
          <Flex>
            {renderField({
              name: '投资币种',
              value: getTokenName(field),
              style: {
                flex: 1,
              },
            })}
            {renderField({
              name: '投资数量',
              value: projectProps(['invest_count']),
              style: {
                flex: 1,
              },
            })}
          </Flex>
          {renderField({
            name: '兑换比例',
            value: projectProps(['transfer_price'])
              ? `1 ${getTokenName(field) || ''} = ${field.transfer_price || ''} ${tokenName || ''}`
              : null,
          })}
          {renderField({
            name: '应回币数量',
            value: projectProps(['return_count'])
              ? `${projectProps(['return_count']) || ''} ${tokenName || ''}`
              : null,
          })}
          <Flex>
            {renderField({
              name: '投资主体',
              value: projectProps(['fund', 'name']),
              style: {
                flex: 1,
              },
            })}
            {renderField({
              name: '打币状态',
              value: projectProps(['is_paid']) ? '已打币' : '未打币',
              style: {
                flex: 1,
              },
            })}
          </Flex>
          {renderField({
            name: '折扣/Bonus',
            value: projectProps(['bonus_comment']),
          })}
          {renderField({
            name: '锁仓机制',
            value: projectProps(['lock_comment']),
          })}
          {renderField({
            name: '打币人',
            value: projectProps(['paid_user']),
          })}
          {renderField({
            name: '打币时间',
            value: dateFormat(projectProps(['paid_at'])),
          })}
          {renderField({
            name: '打币地址',
            value: projectProps(['paid_address']),
          })}
        </View>
      </View>
    );
  }
  renderItem(item, idx) {
    return (
      <View key={idx} style={styles.item}>
        <View style={styles.itemHeader}>
          <Flex justify="space-between">
            <Text style={styles.itemHeaderText}>#{idx + 1}</Text>
            <Text style={styles.itemHeaderText}>
              {moment(item.created_at).format('YYYY-MM-DD')}
            </Text>
          </Flex>
        </View>
        {this.renderItemFields(item)}
      </View>
    );
  }
  render() {
    const finance_token = R.pathOr([], ['item', 'invest_tokens', 'data'])(this.props);
    const finance_equities = R.pathOr([], ['item', 'invest_equities', 'data'])(this.props);

    const financeData = finance_token
      .map(i => ({
        ...i,
        financeType: 'token',
      }))
      .concat(
        finance_equities.map(i => ({
          ...i,
          financeType: 'equities',
        }))
      );
    const afterSort = R.sort((a, b) => b.created_at - a.created_at)(financeData);
    if (R.isNil(afterSort) || R.isEmpty(afterSort)) {
      return null;
    }

    return (
      <View>
        <Group
          style={styles.container}
          icon={require('asset/project/detail/investment.png')}
          title="投资信息"
        />
        {afterSort.map((i, idx) => this.renderItem(i, idx))}
      </View>
    );
  }
}

export default Investment;
