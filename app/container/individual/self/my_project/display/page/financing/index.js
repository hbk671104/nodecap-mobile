import React, { PureComponent } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import R from 'ramda';
import moment from 'moment';

import { renderField as Field } from 'component/project/field';

import Group from './component/group';
import styles from './style';

export default class Financing extends PureComponent {
  renderSalesInfo = info => {
    const start_at = R.pathOr('', ['start_at'])(info);
    const end_at = R.pathOr('', ['end_at'])(info);
    const token_accepted = R.pathOr('', ['token_accepted'])(info);
    const soft_cap = R.pathOr('', ['finances', 0, 'soft_cap'])(info);
    const hard_cap = R.pathOr('', ['finances', 0, 'hard_cap'])(info);

    return (
      <Group title="发售信息" onEditPress={() => this.props.onEditPress()}>
        <Field
          style={styles.item.container}
          titleStyle={styles.item.title}
          valueStyle={styles.item.value}
          name="开始时间"
          value={start_at}
        />
        <Field
          style={styles.item.container}
          titleStyle={styles.item.title}
          valueStyle={styles.item.value}
          name="结束时间"
          value={end_at}
        />
        {/* <Field
          style={styles.item.container}
          titleStyle={styles.item.title}
          valueStyle={styles.item.value}
          name="发售总量"
          value={token_supply}
        /> */}
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
        <Field
          style={styles.item.container}
          titleStyle={styles.item.title}
          valueStyle={styles.item.value}
          name="募集币种"
          value={token_accepted}
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

    return (
      <Group
        title="Token 详情"
        onEditPress={() => this.props.onEditPress('CreateMyProjectFunding')}
      >
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
    const { portfolio } = this.props;
    const finance_info = R.pathOr({}, ['finance_info'])(portfolio);

    return (
      <View style={styles.container}>
        {this.renderSalesInfo(portfolio)}
        {/* {this.renderTokenInfo(portfolio)} */}
      </View>
    );
  }
}
