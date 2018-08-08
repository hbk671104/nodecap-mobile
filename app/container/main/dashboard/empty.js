import React from 'react';
import { View, ImageBackground, StyleSheet, Platform } from 'react-native';

import StatusBar from 'component/uikit/statusBar';

const empty = props => (
  <ImageBackground
    style={[styles.container, props.style]}
    source={require('asset/dashboard_placeholder.png')}
    blurRadius={Platform.OS === 'ios' ? 12 : 5}
  >
    <StatusBar barStyle="light-content" />
    <View style={styles.wrapper}>{props.children}</View>
  </ImageBackground>
);

const styles = {
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
};

export default empty;
