import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

const gradient = props => (
  <LinearGradient
    {...props}
    colors={props.colors}
    start={props.start}
    end={props.end}
  >
    {props.children}
  </LinearGradient>
);

gradient.defaultProps = {
  colors: ['#35C3FF', '#1890FF'],
  start: { x: 0.5, y: 0.0 },
  end: { x: 0.5, y: 1.0 },
};

gradient.propTypes = {
  colors: PropTypes.array,
  start: PropTypes.object,
  end: PropTypes.object,
};

export default gradient;
