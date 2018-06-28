import React, { Component } from 'react';
import { View } from 'react-native';
import { BlurView } from 'react-native-blur';

class blur extends Component {
  render() {
    return (
      <View>
        <BlurView
          viewRef={this.eleRef}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            right: 0,
            top: 0,
            zIndex: 10,
          }}
          blurAmount={8}
          blurType="light"
        />
        <View ref={(ref) => {
          this.eleRef = ref;
        }}
        >
          {this.props.children}
        </View>
      </View>
    );
  }
}

blur.propTypes = {};
blur.defaultProps = {};

export default blur;
