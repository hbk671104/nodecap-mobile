import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

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

const styles = {
  wrapper: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  container: {
    backgroundColor: '#F5222D',
  },
};

badge.propTypes = {
  size: PropTypes.number,
};

badge.defaultProps = {
  size: 10,
};

export default badge;
