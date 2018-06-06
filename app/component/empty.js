import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { BlurView } from 'react-native-blur';

const empty = props => (
  <View style={styles.container}>
    <Image style={styles.blur} source={require('asset/dashboard_placeholder.png')} />
    <BlurView style={styles.blur} blurAmount={8} blurType="light" />
    <View style={styles.wrapper}>{props.children}</View>
  </View>
);

const styles = {
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
};

export default empty;
