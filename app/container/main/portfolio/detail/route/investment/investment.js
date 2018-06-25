import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';
import * as R from 'ramda';
import moment from 'moment';
import Group from 'component/project/group';
import styles from './investmentStyle';

const dateFormat = date => (date ? moment(date).format('YYYY年MM月DD日 HH:mm') : null);

class Investment extends Component {
  renderField({ name, value, style, valueStyle }) {
    if (!value) {
      return null;
    }
    return (
      <View style={[styles.field, style]}>
        <Flex justify="space-between" align="center">
          <Text style={styles.fieldName}>{name}</Text>
          <Text style={[styles.fieldValue, valueStyle]}>{value}</Text>
        </Flex>
      </View>
    );
  }
  renderItemFields(field) {
    const projectProps = path => R.path([...path])(field);
    const tokens = R.path(['constants', 'tokens'])(this.props);
    const stages = R.path(['constants', 'finance_stages'])(this.props);
    const getStageName = item => R.prop('name')(R.find(R.propEq('id', item.stage_id))(stages));
    const getTokenName = item => R.prop('name')(R.find(R.propEq('id', item.invest_token))(tokens));
    const tokenName = R.path(['portfolio', 'token_name'])(this.props);
    return (
      <View>
        <View>
          <Flex>
            {this.renderField({
              name: '投资类型',
              value: projectProps(['financeType']) === 'token' ? 'Token' : '股权',
              style: {
                flex: 1,
                alignItems: projectProps(['stage_id']) ? 'flex-start' : 'space-between',
              },
              valueStyle: {
                marginLeft: 14,
              },
            })}
            {this.renderField({
              name: '所投阶段',
              value: getStageName(field),
              style: {
                flex: 1,
                marginLeft: projectProps(['financeType']) ? 0 : 22,
                paddingLeft: projectProps(['financeType']) ? 10 : 0,
              },
            })}
          </Flex>
          <Flex>
            {this.renderField({
              name: '投资币种',
              value: getTokenName(field),
              style: {
                flex: 1,
                alignItems: projectProps(['invest_count']) ? 'flex-start' : 'space-between',
              },
              valueStyle: {
                marginLeft: 14,
              },
            })}
            {this.renderField({
              name: '投资数量',
              value: projectProps(['invest_count']),
              style: {
                flex: 1,
                marginLeft: projectProps(['invest_token']) ? 0 : 22,
                paddingLeft: projectProps(['invest_token']) ? 10 : 0,
              },
            })}
          </Flex>
          {this.renderField({
            name: '兑换比例',
            value: projectProps(['transfer_price']) ? `1 ${getTokenName(field) || ''} = ${field.transfer_price || ''} ${tokenName || ''}` : null,
          })}
          {this.renderField({
            name: '应回币数量',
            value: projectProps(['return_count']) ? `${projectProps(['return_count']) || ''} ${tokenName || ''}` : null,
          })}
          <Flex>
            {this.renderField({
              name: '投资主体',
              value: projectProps(['fund', 'name']),
              style: {
                flex: 1,
                alignItems: projectProps(['stage_id']) ? 'flex-start' : 'space-between',
              },
              valueStyle: {
                marginLeft: 14,
              },
            })}
            {this.renderField({
              name: '打币状态',
              value: projectProps(['is_paid']) ? '已打币' : '未打币',
              style: {
                flex: 1,
                marginLeft: projectProps(['financeType']) ? 0 : 22,
                paddingLeft: projectProps(['financeType']) ? 10 : 0,
              },
            })}
          </Flex>
          {this.renderField({
            name: '折扣/Bonus',
            value: projectProps(['bonus_comment']),
          })}
          {this.renderField({
            name: '锁仓机制',
            value: projectProps(['lock_comment']),
          })}
          {this.renderField({
            name: '打币人',
            value: projectProps(['paid_user']),
          })}
          {this.renderField({
            name: '打币时间',
            value: dateFormat(projectProps(['paid_at'])),
          })}
          {this.renderField({
            name: '打币地址',
            value: projectProps(['paid_address']),
          })}
        </View>
      </View>
    );
  }
  renderItem(item, idx) {
    return (
      <View style={styles.item}>
        <View style={styles.itemHeader}>
          <Flex justify="space-between">
            <Text style={styles.itemHeaderText}>#{idx + 1}</Text>
            <Text style={styles.itemHeaderText}>{moment(item.created_at).format('YYYY-MM-DD')}</Text>
          </Flex>
        </View>
        {this.renderItemFields(item)}
      </View>
    );
  }
  render() {
    const finance_token = R.pathOr([], ['item', 'invest_tokens', 'data'])(this.props);
    const finance_equities = R.pathOr([], ['item', 'invest_equities', 'data'])(this.props);

    const financeData = finance_token.map(i => ({
      ...i,
      financeType: 'token',
    })).concat(
      finance_equities.map(i => ({
        ...i,
        financeType: 'equities',
      }))
    );
    const afterSort = R.sort((a, b) => b.created_at - a.created_at)(financeData);
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
