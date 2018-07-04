import React, { Component } from 'react';
import { View, Image, findNodeHandle, StyleSheet, Dimensions } from 'react-native';
import { BlurView } from 'react-native-blur';
import StatusBar from './uikit/statusBar';

class Empty extends Component {
  state = {
    viewRef: null,
  };

  imageLoaded = () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <StatusBar />
        <Image
          ref={(img) => {
            this.backgroundImage = img;
          }}
          style={styles.blur}
          source={require('asset/dashboard_placeholder.png')}
          onLoadEnd={this.imageLoaded}
        />
        {!!this.state.viewRef && (
          <BlurView
            viewRef={this.state.viewRef}
            style={styles.blur}
            blurAmount={8}
            blurType="light"
          />
        )}
        <View style={styles.wrapper}>{this.props.children}</View>
      </View>
    );
  }
}

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

export default Empty;
