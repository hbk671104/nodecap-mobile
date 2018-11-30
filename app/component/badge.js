import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const badge = ({ style, size }) => (
  <View style={[styles.wrapper, style]}>
    <View
      style={[
        styles.container,
        { height: size, width: size, borderRadius: size / 2 },
      ]}
    />
  </View>
);

const NumberBadge = ({ wrapperStyle, dot = false, number }) => {
  if (number > 0) {
    if (dot) {
      return badge();
    }
    return (
      <View style={[styles.wrapper, wrapperStyle]}>
        <View style={styles.numberWrapper}>
          <View style={[styles.numberContainer]}>
            <Text style={styles.text}>{number}</Text>
          </View>
        </View>
      </View>
    );
  }
  return null;
};

const styles = {
  wrapper: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  container: {
    backgroundColor: '#F55454',
  },
  numberWrapper: {
    padding: 1,
    backgroundColor: 'white',
    borderRadius: 7,
  },
  numberContainer: {
    backgroundColor: '#F55454',
    paddingHorizontal: 4.5,
    height: 14,
    minWidth: 14,
    alignItems: 'center',
    borderRadius: 7,
  },
  text: {
    fontSize: 9,
    color: 'white',
    fontWeight: 'bold',
  },
};

badge.propTypes = {
  size: PropTypes.number,
};

badge.defaultProps = {
  size: 10,
};

export default badge;
export { NumberBadge };
