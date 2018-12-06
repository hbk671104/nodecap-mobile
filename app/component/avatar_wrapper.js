import React from 'react';
import { View, Image, Text } from 'react-native';

import Touchable from 'component/uikit/touchable';

const avatar_wrapper = ({ style, onPress, children }) => (
  <Touchable onPress={onPress}>
    <View style={style}>
      {children}
      <Image
        style={styles.topLeft}
        source={require('asset/avatar_wrapper/top_left.png')}
      />
      <Image
        style={styles.topRight}
        source={require('asset/avatar_wrapper/top_right.png')}
      />
      <Image
        style={styles.bottomLeft}
        source={require('asset/avatar_wrapper/bottom_left.png')}
      />
      <Image
        style={styles.bottomRight}
        source={require('asset/avatar_wrapper/bottom_right.png')}
      />
    </View>
  </Touchable>
);

const styles = {
  topLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topRight: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
};

export default avatar_wrapper;
