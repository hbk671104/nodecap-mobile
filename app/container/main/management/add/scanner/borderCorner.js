import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

const borderCorner = ({ position }) => (
  <View style={styles.container[position]}>
    <Svg style={styles.size}>
      <Polyline
        points={styles.points[position]}
        fill="none"
        stroke="white"
        strokeWidth={3}
      />
    </Svg>
  </View>
);

const styles = {
  container: {
    topLeft: {
      position: 'absolute',
      left: 0,
      top: 0,
    },
    topRight: {
      position: 'absolute',
      right: 0,
      top: 0,
    },
    bottomLeft: {
      position: 'absolute',
      left: 0,
      bottom: 0,
    },
    bottomRight: {
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
  },
  size: {
    height: 23,
    width: 23,
  },
  points: {
    topLeft: '0,23 0,0 23,0',
    topRight: '0,0 23,0 23,23',
    bottomLeft: '0,0 0,23 23,23',
    bottomRight: '0,23 23,23 23,0',
  },
};

borderCorner.propTypes = {
  position: PropTypes.string.isRequired,
};

export default borderCorner;
