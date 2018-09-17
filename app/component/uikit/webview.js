import React from 'react';
import { View, ViewPropTypes, WebView } from 'react-native';

const webview = props => (
  <View style={[styles.container, props.style]}>
    <WebView {...props} />
  </View>
);

const styles = {
  container: {
    flex: 1,
  },
};

webview.propTypes = {
  style: ViewPropTypes.style,
};

export default webview;
