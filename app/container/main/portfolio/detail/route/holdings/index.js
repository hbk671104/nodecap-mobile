import React, { PureComponent } from 'react';
import { View, ScrollView, Text } from 'react-native';

import Group from './partials/group';
import Asset from './partials/asset';
import TransactionItem from './partials/transaction';
import styles from './style';

class Holdings extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Group
            style={styles.asset.container}
            icon={require('asset/project/detail/asset_analysis.png')}
            title="资产分析"
          >
            <Asset />
          </Group>
          <Group
            style={styles.transaction.container}
            icon={require('asset/project/detail/transaction.png')}
            title="交易记录"
          >
            <TransactionItem />
            <TransactionItem />
            <TransactionItem />
            <TransactionItem />
          </Group>
        </ScrollView>
      </View>
    );
  }
}

export default Holdings;
