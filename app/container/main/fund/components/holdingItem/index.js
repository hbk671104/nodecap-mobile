import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const holdingItem = ({ item }) => (
  <View style={styles.container}>
    <View style={{ flex: 3 }}>
      <Text style={styles.title}>DDD</Text>
      <Text style={[styles.content, { marginTop: 3 }]}>x 726,182</Text>
    </View>
    <View style={{ flex: 3 }}>
      <Text style={styles.subtitle}>27,220 ETH</Text>
      <Text style={[styles.content, { marginTop: 3 }]}>约 4668.22万元</Text>
    </View>
    <View style={{ flex: 2, alignItems: 'flex-end' }}>
      <Text style={styles.subtitle}>12.10%</Text>
    </View>
  </View>
);

const styles = {
  container: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: 12,
    paddingRight: 12,
  },
  group: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
  },
  content: {
    fontSize: 11,
    color: 'rgba(0, 0, 0, 0.45)',
  },
};

holdingItem.propTypes = {
  item: PropTypes.object,
};

export default holdingItem;
