import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import R from 'ramda';
import Accounting from 'accounting';

const format = ({ children, digit }) => {
  if (R.isNil(children) || isNaN(children)) {
    return <Text>--</Text>;
  }
  return <Text>{Accounting.formatNumber(children, digit)}</Text>;
};

format.defaultProps = {
  digit: 2,
};

format.propTypes = {
  digit: PropTypes.number,
};

export default format;
