import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import R from 'ramda';
import { Flex } from 'antd-mobile';
import { currencyFormat } from '../../utils/utils';
import Touchable from 'component/uikit/touchable';
import Format from 'component/format';

const categoryItem = ({ data, onPress }) => {
  const category = R.pathOr('--', ['tag'])(data);
  const market_cap = R.path(['market_cap_usd'])(data);
  const heat = R.pathOr('--', ['indexes', 'heat'])(data);
  const heat_change_percentage = R.pathOr(0, [
    'indexes',
    'heat_change_percentage',
  ])(data);
  let marketCapText = '';
  if (market_cap > 10e7) {
    marketCapText = `${(market_cap / 10e7).toFixed(2)} 亿`;
  } else {
    marketCapText = `${(market_cap / 10e3).toFixed(2)} 万`;
  }
  const minus = heat_change_percentage < 0;

  return (
    <Flex style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      <Text style={styles.marketCap}>{marketCapText}</Text>
    </Flex>
  );
};

const styles = {
  container: {
    marginLeft: 12,
    marginTop: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
    width: 114,
  },
  marketCap: { width: 110, fontSize: 13, color: 'rgba(0,0,0,0.65)', letterSpacing: 0.16 },
  subtitle: {
    marginTop: 24,
    fontSize: 22,
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
  },
  heat: {
    fontSize: 12,
    color: '#09AC32',
    fontWeight: 'normal',
  },
};

export default categoryItem;
