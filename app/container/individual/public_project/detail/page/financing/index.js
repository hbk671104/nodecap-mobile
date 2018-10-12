import React, { PureComponent } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import R from 'ramda';
import moment from 'moment';

import { renderField as Field } from 'component/project/field';

import Empty from '../empty';
import Group from './component/group';
import styles from './style';

export default class Financing extends PureComponent {
  renderSalesInfo = info => {
    const start_at = R.pathOr('', ['start_at'])(info);
    const end_at = R.pathOr('', ['end_at'])(info);
    const token_supply = R.pathOr('--', ['token_supply'])(info);
    const soft_cap = R.pathOr('--', ['soft_cap'])(info);
    const hard_cap = R.pathOr('--', ['hard_cap'])(info);
    const isEmpty = v => {
      return v === '--' || v === '';
    };
    if (
      isEmpty(start_at) &&
      isEmpty(end_at) &&
      isEmpty(token_supply) &&
      isEmpty(soft_cap) &&
      isEmpty(hard_cap)
    ) {
      return null;
    }
    return (
      <Group title="发售信息">
        <Field
          style={styles.item.container}
          titleStyle={styles.item.title}
          valueStyle={styles.item.value}
          name="开始时间"
          value={start_at ? moment.unix(start_at).format('YYYY-MM-DD') : null}
        />
        <Field
          style={styles.item.container}
          titleStyle={styles.item.title}
          valueStyle={styles.item.value}
          name="结束时间"
          value={end_at ? moment.unix(end_at).format('YYYY-MM-DD') : null}
        />
        <Field
          style={styles.item.container}
          titleStyle={styles.item.title}
          valueStyle={styles.item.value}
          name="发售总量"
          value={token_supply}
        />
        <Field
          style={styles.item.container}
          titleStyle={styles.item.title}
          valueStyle={styles.item.value}
          name="软顶"
          value={soft_cap}
        />
        <Field
          style={styles.item.container}
          titleStyle={styles.item.title}
          valueStyle={styles.item.value}
          name="硬顶"
          value={hard_cap}
        />
      </Group>
    );
  };

  renderTokenInfo = info => {
    const token_type = R.pathOr('--', ['token_type'])(info);
    const token_accepted = R.pathOr('--', ['token_accepted'])(info);
    const conversion_ratio = R.pathOr('--', ['conversion_ratio'])(info);
    const token_distribution = R.pathOr('--', ['token_distribution'])(info);
    const country_limitation = R.pathOr('--', ['country_limitation'])(info);
    const discount = R.pathOr('--', ['discount'])(info);
    const isEmpty = v => {
      return v === '--' || v === '';
    };
    if (
      isEmpty(token_type) &&
      isEmpty(token_accepted) &&
      isEmpty(conversion_ratio) &&
      isEmpty(token_distribution) &&
      isEmpty(country_limitation) &&
      isEmpty(discount)
    ) {
      return null;
    }
    return (
      <Group title="Token 详情">
        <Field
          style={styles.item.container}
          titleStyle={styles.item.title}
          valueStyle={styles.item.value}
          name="Token 类型"
          value={token_type}
        />
        <Field
          style={styles.item.container}
          titleStyle={styles.item.title}
          valueStyle={styles.item.value}
          name="接受币种"
          value={token_accepted}
        />
        <Field
          style={styles.item.container}
          titleStyle={styles.item.title}
          valueStyle={styles.item.value}
          name="兑换比例"
          value={conversion_ratio}
        />
        <Field
          style={styles.item.container}
          titleStyle={styles.item.title}
          valueStyle={styles.item.value}
          name="Token 分配"
          value={token_distribution}
        />
        <Field
          style={styles.item.container}
          titleStyle={styles.item.title}
          valueStyle={styles.item.value}
          name="受限国家"
          value={country_limitation}
        />
        <Field
          style={styles.item.container}
          titleStyle={styles.item.title}
          valueStyle={styles.item.value}
          name="折扣"
          value={discount}
        />
      </Group>
    );
  };

  render() {
    const { portfolio, loading } = this.props;

    // if (loading) {
    //   return <ActivityIndicator style={styles.indicator} />;
    // }

    const finance_info = R.pathOr({}, ['finance_info'])(portfolio);
    const empty = R.isEmpty(finance_info);

    if (empty) {
      // return <Empty title="暂无募集信息" />;
      return null;
    }

    return (
      <View style={styles.container}>
        {this.renderSalesInfo(finance_info)}
        {this.renderTokenInfo(finance_info)}
      </View>
    );
  }
}
