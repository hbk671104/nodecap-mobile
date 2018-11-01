import React from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';

import Percentage from 'component/percentage';
import Amount from 'component/amount';
import Price from 'component/price';
import { symbol } from 'utils/icon';

const price = ({ can_calculate, data, base_symbol }) => {
  if (!can_calculate) {
    return null;
  }

  const market = R.pathOr({}, ['market'])(data);
  const current_price = R.pathOr('--', ['current_price', 'CNY'])(market);
  const price_change_percentage_24h = R.pathOr('--', [
    'price_change_percentage_24h',
  ])(market);
  const total_volume = R.pathOr('--', ['total_volume', base_symbol])(market);
  const high_24h = R.pathOr('--', ['high_24h', base_symbol])(market);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {symbol('CNY', styles.title)}
          <Price symbol="CNY">{current_price}</Price>
        </Text>
        <Text style={styles.subtitle}>
          <Percentage colorAware={false}>
            {price_change_percentage_24h}
          </Percentage>
        </Text>
      </View>
      <Text style={styles.content}>
        额(24H) <Amount symbol={base_symbol}>{total_volume}</Amount> | 最高(24H){' '}
        {symbol(base_symbol, styles.content)}
        <Price symbol={base_symbol}>{high_24h}</Price>
      </Text>
    </View>
  );
};

const styles = {
  wrapper: {
    marginVertical: 12,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
    marginLeft: 12,
  },
  content: {
    fontWeight: '300',
    fontSize: 10,
    color: 'white',
  },
};

export default price;
