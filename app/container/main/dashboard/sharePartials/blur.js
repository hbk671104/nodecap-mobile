import React, { Component } from 'react';
import { View, findNodeHandle } from 'react-native';
import { BlurView } from 'react-native-blur';

class blur extends Component {
  state = {
    viewRef: null,
  };
  render() {
    return (
      <View>
        {!!this.state.viewRef && (
          <BlurView
            viewRef={this.state.viewRef}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              zIndex: 10,
            }}
            blurAmount={8}
            blurType="light"
          />
        )}
        <View
          ref={(ref) => {
            this.elementRef = ref;
          }}
          onLayout={() => {
            setTimeout(() => {
              this.setState({ viewRef: findNodeHandle(this.elementRef) });
            }, 200);
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
