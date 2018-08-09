import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import Accounting from 'accounting';

const numConvert = (number, disablePrefix, digit = 0) => {
  const num = Accounting.formatNumber(number, digit);
  if (disablePrefix) return num;
  if (number > 0) {
    return `+${num}`;
  } else {
    return num;
  }
};

const text = props => {
  const { children, disablePrefix, colorAware, digit } = props;
  if (typeof children === 'string') {
    if (!isNaN(children)) {
      return (
        <Text
          {...props}
          {...(colorAware
            ? {
                style: [
                  props.style,
                  { color: children >= 0 ? '#09AC32' : '#F5222D' },
                ],
              }
            : {})}
        >
          {numConvert(children, disablePrefix, digit)}
        </Text>
      );
    }
  }
  if (typeof children === 'number') {
    return (
      <Text
        {...props}
        {...(colorAware
          ? {
              style: [
                props.style,
                { color: children >= 0 ? '#09AC32' : '#F5222D' },
              ],
            }
          : {})}
      >
        {numConvert(children, disablePrefix, digit)}
      </Text>
    );
  }
  return <Text {...props}>{children}</Text>;
};

text.defaultProps = {
  disablePrefix: false,
  colorAware: false,
};

text.propTypes = {
  disablePrefix: PropTypes.bool,
  colorAware: PropTypes.bool,
};

export default text;
