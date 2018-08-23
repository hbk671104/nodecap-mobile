import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import Format from 'component/format';
import Amount from 'component/amount';

const dataItem = ({ title, content, symbol, subcontent }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.group}>
      <Text style={styles.content}>
        <Format digit={1}>{content}</Format> {symbol}
      </Text>
      <Text style={[styles.subcontent, { marginTop: 6 }]}>
        约 <Amount>{subcontent}</Amount> 元
      </Text>
    </View>
  </View>
);

const styles = {
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  title: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.85)',
  },
  group: {
    alignItems: 'flex-end',
  },
  content: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
  },
  subcontent: {
    fontSize: 11,
    color: 'rgba(0, 0, 0, 0.45)',
  },
};

dataItem.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  symbol: PropTypes.string,
  subcontent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default dataItem;
