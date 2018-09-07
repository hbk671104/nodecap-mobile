import React from 'react';
import PropTypes from 'prop-types';
import Touchable from 'react-native-platform-touchable';

const touchable = props => {
  const effect = props.borderless
    ? Touchable.SelectableBackgroundBorderless()
    : Touchable.SelectableBackground();
  return (
    <Touchable
      {...props}
      activeOpacity={props.activeOpacity}
      hitSlop={props.hitSlop}
      {...{
        [props.foreground ? 'foreground' : 'background']: effect,
      }}
    >
      {props.children}
    </Touchable>
  );
};

touchable.defaultProps = {
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  },
  borderless: false,
  foreground: false,
};

touchable.propTypes = {
  activeOpacity: PropTypes.number,
  hitSlop: PropTypes.object,
  borderless: PropTypes.bool,
  foreground: PropTypes.bool,
};

touchable.defaultProps = {
  activeOpacity: 0.8,
};

export default touchable;
