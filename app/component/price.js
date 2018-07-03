import React from 'react';
import { PropTypes } from 'prop-types';
import { Text } from 'react-native';
import Accounting from 'accounting';

const price = ({ symbol, children }) => {
  if (symbol === 'CNY' || symbol === 'USD') {
    return <Text>{Accounting.formatNumber(children, 2)}</Text>;
  }
  return <Text>{Accounting.formatNumber(children, 9)}</Text>;
};

price.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export default price;
