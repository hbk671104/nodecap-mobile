import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

import StatusBar from './uikit/statusBar';

const empty = props => (
  <View style={[styles.container, props.style]}>
    <StatusBar barStyle="light-content" />
    <Image
      ref={img => {
        this.backgroundImage = img;
      }}
      style={styles.blur}
      source={require('asset/dashboard_placeholder.png')}
      onLoadEnd={this.imageLoaded}
      blurRadius={7}
    />
    <View style={styles.wrapper}>{props.children}</View>
  </View>
);

const styles = {
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
};

export default empty;
