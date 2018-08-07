import React from 'react';
import { View, ImageBackground, StyleSheet, Platform } from 'react-native';

import StatusBar from 'component/uikit/statusBar';
import { realBarHeight } from 'component/navBar';

const empty = props => (
  <ImageBackground
    style={[styles.container, props.style]}
    source={require('asset/dashboard_placeholder.png')}
    blurRadius={Platform.OS === 'ios' ? 7 : 2}
  >
    <StatusBar barStyle="light-content" />
    <View style={styles.wrapper}>{props.children}</View>
  </ImageBackground>
);

const styles = {
  container: {
    ...StyleSheet.absoluteFillObject,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    top: realBarHeight,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
};

export default empty;
