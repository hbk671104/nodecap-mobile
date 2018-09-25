import React from 'react';
import { PropTypes } from 'prop-types';
import { Text } from 'react-native';
import Accounting from 'accounting';
import R from 'ramda';

export const priceFormat = ({ symbol, text }) => {
  if (symbol === 'CNY' || symbol === 'USD' || symbol === 'USDT') {
    const int_rep = Number.parseInt(text, 10);
    const digit = int_rep.toString().length;
    if (digit > 4) {
      return int_rep;
    }
    return Number(text).toPrecision(4);
  }
  return Accounting.formatNumber(text, 9);
};

const price = ({ symbol, children }) => {
  if (R.isNil(children) || children === '--') {
    return <Text>--</Text>;
  }
  return <Text>{priceFormat({ symbol, text: children })}</Text>;
};

price.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export default price;
