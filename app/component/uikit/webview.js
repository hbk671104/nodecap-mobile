import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, WebView } from 'react-native';

const webview = props => (
  <WebView {...props} style={[styles.container, props.style]} />
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
