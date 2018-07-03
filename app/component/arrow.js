import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

const arrow = ({ style }) => (
  <View style={style}>
    <Svg style={styles.container}>
      <Polygon points="8,0 0,8 16,8" fill="white" />
    </Svg>
  </View>
);

arrow.propTypes = {
  style: ViewPropTypes.style,
};

const styles = {
  container: {
    height: 8,
    width: 16,
  },
};

export default arrow;
