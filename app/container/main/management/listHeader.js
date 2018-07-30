import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FilterIndicator from 'component/management/filterIndicator';

const listHeader = props => (
  <View style={styles.container}>
    <View style={styles.left}>
      <Text style={styles.title}>币种 </Text>
      <FilterIndicator active />
    </View>
    <View style={styles.middle}>
      <Text style={styles.title}>持仓资产（CNY）</Text>
      <FilterIndicator />
    </View>
    <View style={styles.right}>
      <Text style={styles.title}>价格 </Text>
      <FilterIndicator />
    </View>
  </View>
);

const styles = {
  container: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  title: {
    color: 'rgba(0, 0, 0, 0.45)',
    fontSize: 12,
  },
  left: {
    width: 140,
    paddingLeft: 20 + 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  middle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export default listHeader;
