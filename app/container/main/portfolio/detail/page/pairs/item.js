import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import R from 'ramda';

import Amount from 'component/amount';
import Price from 'component/price';
import Percentage from 'component/percentage';

const pairItem = ({ data }) => {
  if (R.isNil(data) || R.isEmpty(data)) {
    return null;
  }

  const market = R.pathOr('--', ['market'])(data);
  const symbol = R.pathOr('--', ['symbol'])(data);
  const base = R.pathOr('--', ['base'])(data);
  const base_volume = R.pathOr('--', ['base_volume'])(data);
  const quote = R.pathOr('--', ['quote'])(data);
  const quote_volume = R.pathOr('--', ['quote_volume'])(data);
  const price = R.pathOr('--', ['current_price', quote])(data);
  const price_cny = R.pathOr('--', ['current_price', 'CNY'])(data);
  const percentage = R.pathOr('--', ['percentage'])(data);

  return (
    <View style={styles.container}>
      <View style={styles.left.container}>
        <Text style={styles.left.title}>
          {market}
          {'    '}
          <Text style={styles.left.subtitle}>{symbol}</Text>
        </Text>
        <Text style={styles.left.content}>
          <Amount>{base_volume}</Amount> {base} /{' '}
          <Amount>{quote_volume}</Amount> {quote}{' '}
        </Text>
      </View>
      <View style={styles.middle.container}>
        <Text style={styles.middle.title}>
          <Price symbol={quote}>{price}</Price>
        </Text>
        <Text style={styles.middle.content}>
          ≈￥
          <Price symbol="CNY">{price_cny}</Price>
        </Text>
      </View>
      <View style={styles.right.container}>
        <Text style={styles.right.text}>
          <Percentage>{percentage}</Percentage>
        </Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    height: 53,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    paddingRight: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  left: {
    container: {
      flex: 4,
    },
    title: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
      fontWeight: 'normal',
    },
    content: {
      marginTop: 4,
      fontSize: 10,
      color: 'rgba(0, 0, 0, 0.45)',
    },
  },
  middle: {
    container: {
      flex: 3,
      // alignItems: 'center',
    },
    title: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.65)',
    },
    content: {
      marginTop: 4,
      fontSize: 10,
      color: 'rgba(0, 0, 0, 0.45)',
    },
  },
  right: {
    container: {
      flex: 2,
      alignItems: 'flex-end',
    },
    text: {
      fontSize: 14,
      fontWeight: 'bold',
    },
  },
};

pairItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default pairItem;
