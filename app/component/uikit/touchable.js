import React from 'react';
import PropTypes from 'prop-types';
import Touchable from 'react-native-platform-touchable';

const touchable = (props) => {
  const effect = props.borderless
    ? Touchable.SelectableBackgroundBorderless()
    : Touchable.SelectableBackground();
  return (
    <Touchable
      {...props}
      hitSlop={props.hitSlop}
      {...(props.foreground ? { foreground: effect } : { background: effect })}
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
  hitSlop: PropTypes.object,
  borderless: PropTypes.bool,
  foreground: PropTypes.bool,
};

export default touchable;
