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

const NumberBadge = ({ number }) => {
  if (number > 0) {
    return (
      <View style={[styles.wrapper]}>
        <View style={[styles.numberContainer]}>
          <Text style={styles.text}>{number}</Text>
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
    backgroundColor: '#F5222D',
  },
  numberContainer: {
    backgroundColor: '#F5222D',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
  },
  text: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 9,
    color: '#FFFFFF',
    textAlign: 'left',
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
