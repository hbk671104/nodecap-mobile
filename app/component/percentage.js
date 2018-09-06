import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import Accounting from 'accounting';

const percentage = ({ children, colorAware, digit }) => {
  return (
    <Text
      style={[
        colorAware && {
          color: children >= 0 ? '#09AC32' : '#F5222D',
        },
      ]}
    >
      {children >= 0 && '+'}
      {Accounting.formatNumber(children, digit)}%
    </Text>
  );
};

percentage.propTypes = {
  children: PropTypes.number.isRequired,
  digit: PropTypes.number,
  colorAware: PropTypes.bool,
};

percentage.defaultProps = {
  digit: 2,
  colorAware: true,
};

export default percentage;
