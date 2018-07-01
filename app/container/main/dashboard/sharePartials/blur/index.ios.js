import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'react-native-blur';

class blur extends Component {
  render() {
    return (
      <View>
        <View>{this.props.children}</View>
        <BlurView style={styles.blur} blurAmount={8} blurType="light" />
      </View>
    );
  }
}

const styles = {
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
};

blur.propTypes = {};
blur.defaultProps = {};

export default blur;
