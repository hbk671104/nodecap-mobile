import React from 'react';
import { PropTypes } from 'prop-types';
import { Text } from 'react-native';
import Accounting from 'accounting';
import R from 'ramda';

const amount = ({ children, disableFormatting, symbol }) => {
  if (R.isNil(children) || isNaN(children)) {
    return <Text>--</Text>;
  }

  let comp = Accounting.formatNumber(children);
  if (Math.abs(children) > 100000000 && !disableFormatting) {
    const num = children / 100000000;
    comp = `${Accounting.formatNumber(num)} 亿`;
  } else if (Math.abs(children) > 10000 && !disableFormatting) {
    const num = children / 10000;
    comp = `${Accounting.formatNumber(num, 1)} 万`;
  }
  return (
    <Text>
      {comp}
      {symbol ? ` ${symbol}` : ''}
    </Text>
  );
};

amount.defaultProps = {
  disableFormatting: false,
};

amount.propTypes = {
  disableFormatting: PropTypes.bool,
  symbol: PropTypes.string,
};

export default amount;
