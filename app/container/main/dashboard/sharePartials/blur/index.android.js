import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import ViewShot from 'react-native-view-shot';

class blur extends Component {
  state = {
    uri: null,
    size: {},
  };

  onCapture = (uri) => {
    this.setState({ uri });
  };

  onLayout = (e) => {
    const { height, width } = e.nativeEvent.layout;
    this.setState({ size: { height, width } });
  };

  render() {
    const { uri, size } = this.state;
    return (
      <View>
        {uri ? (
          <View>
            <Image style={size} source={{ uri }} blurRadius={4} />
          </View>
        ) : (
          <ViewShot options={{ result: 'data-uri' }} onCapture={this.onCapture} captureMode="mount">
            <View onLayout={this.onLayout}>{this.props.children}</View>
          </ViewShot>
        )}
      </View>
    );
  }
}

blur.propTypes = {};
blur.defaultProps = {};

export default blur;
