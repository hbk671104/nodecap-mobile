import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';
import * as R from 'ramda';
import moment from 'moment';
import Group from 'component/project/group';
import Accounting from 'accounting';

import { renderField } from './field';
import styles from './investmentStyle';

const dateFormat = date => {
  return date ? moment(date).format('YYYY年MM月DD日 HH:mm') : null;
};

class Investment extends Component {
  renderItemFields(field) {
    const projectProps = path => R.path([...path])(field);

    const tokenName = R.path(['portfolio', 'token_name'])(this.props);
    const returnCount = projectProps(['return_count'])
      ? Accounting.formatNumber(projectProps(['return_count']))
      : projectProps(['return_count']);

    return (
      <View>
        {renderField({
          name: '回币时间',
          value: dateFormat(projectProps(['paid_at'])),
        })}
        {renderField({
          name: '回币数量',
          value: returnCount ? `${returnCount || ''} ${tokenName || ''}` : null,
        })}
        {renderField({
          name: '回币地址',
          value: projectProps(['paid_address']),
        })}
        {renderField({
          name: '确认人',
          value: projectProps(['confirm_user']),
        })}
        {renderField({
          name: '地址备注',
          value: projectProps(['paid_address_comment']),
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
    const return_tokens = R.pathOr([], ['item', 'return_tokens', 'data'])(
      this.props,
    );

    if (R.isNil(return_tokens) || R.isEmpty(return_tokens)) {
      return null;
    }

    const afterSort = R.sort((a, b) => b.created_at - a.created_at)(
      return_tokens,
    );

    return (
      <View onLayout={this.props.onLayout}>
        <Group
          style={[styles.container, { marginTop: 0 }]}
          icon={require('asset/project/detail/return_tokens.png')}
          title="回币记录"
        />
        {afterSort.map((i, idx) => this.renderItem(i, idx))}
      </View>
    );
  }
}

export default Investment;
