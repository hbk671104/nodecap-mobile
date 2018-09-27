import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';
import * as R from 'ramda';
import moment from 'moment';
import Group from 'component/project/group';
import Accounting from 'accounting';

import { renderField } from 'component/project/field';
import Empty from './empty';
import styles from './investmentStyle';

const dateFormat = date => {
  return date ? moment(date).format('YYYY年MM月DD日 HH:mm') : null;
};

class Investment extends Component {
  renderItemFields(field) {
    const projectProps = path => R.path([...path])(field);

    const exitTokenName = R.pathOr('', ['portfolio', 'token_name'])(this.props);
    const exitCount = projectProps(['exit_count'])
      ? Accounting.formatNumber(projectProps(['exit_count']))
      : projectProps(['exit_count']);
    const tokenName = R.pathOr('', ['token', 'symbol'])(field);
    const tokenCount = projectProps(['token_count'])
      ? Accounting.formatNumber(projectProps(['token_count']))
      : projectProps(['token_count']);

    return (
      <View>
        {renderField({
          name: '卖出时间',
          value: dateFormat(projectProps(['exit_date'])),
        })}
        {renderField({
          name: '卖出数量',
          value: exitCount
            ? `${exitCount || ''} ${R.toUpper(exitTokenName) || ''}`
            : null,
        })}
        {renderField({
          name: '所获数量',
          value: tokenCount
            ? `${tokenCount || ''} ${R.toUpper(tokenName) || ''}`
            : null,
        })}
        {renderField({
          name: '打币地址',
          value: projectProps(['token_address']),
        })}
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
    const return_tokens = R.pathOr([], ['item', 'exit_tokens', 'data'])(
      this.props,
    );

    const afterSort = R.sort((a, b) => b.created_at - a.created_at)(
      return_tokens,
    );

    const invalid = R.isNil(afterSort) || R.isEmpty(afterSort);

    return (
      <View onLayout={this.props.onLayout}>
        <Group
          style={styles.container}
          icon={require('asset/project/detail/sold.png')}
          title="卖出记录"
        />
        {invalid ? (
          <Empty
            image={require('asset/project/add_sold.png')}
            title="暂无卖出记录"
          />
        ) : (
          afterSort.map((i, idx) => this.renderItem(i, idx))
        )}
      </View>
    );
  }
}

export default Investment;
