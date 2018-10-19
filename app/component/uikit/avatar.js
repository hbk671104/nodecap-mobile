import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Animated } from 'react-native';
import R from 'ramda';
import { raised } from '../../utils/style';
import SolidAvatar from './avatar.solid';

const avatar = props => {
  const uri = R.pathOr('', ['source', 'uri'])(props);
  return (
    <Animated.View
      style={[
        styles.container,
        { height: props.size, width: props.size, borderRadius: props.size / 2 },
        props.raised && { ...raised },
        props.style,
      ]}
    >
      <Animated.Image
        {...props}
        resizeMode={props.resizeMode}
        source={
          R.isEmpty(uri)
            ? require('asset/project/project_logo_default.png')
            : { uri }
        }
        style={{
          height: props.size * props.innerRatio,
          width: props.size * props.innerRatio,
          borderRadius: (props.size * props.innerRatio) / 2,
        }}
      />
    </Animated.View>
  );
};

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
  },
};

export { SolidAvatar };
export default avatar;
