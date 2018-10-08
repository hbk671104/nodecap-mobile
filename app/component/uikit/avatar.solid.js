import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Animated } from 'react-native';

const avatar = props => (
  <Animated.View
    style={[
      styles.container,
      { height: props.size, width: props.size, borderRadius: props.size / 2 },
      props.style,
    ]}
  >
    <Animated.Image
      {...props}
      resizeMode={props.resizeMode}
      defaultSource={require('asset/project/project_logo_default.png')}
      style={{
        height: props.size * props.innerRatio,
        width: props.size * props.innerRatio,
      }}
    />
  </Animated.View>
);

avatar.defaultProps = {
  size: 42,
  innerRatio: 2 / 3,
  resizeMode: 'contain',
  raised: true,
};

avatar.propTypes = {
  size: PropTypes.number,
  innerRatio: PropTypes.number,
  resizeMode: PropTypes.string,
  raised: PropTypes.bool,
};

const styles = {
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E9E9E9',
  },
};

export default avatar;
