import React from 'react';
import Shimmer from 'react-native-shimmer';

const shimmer = props => (
  <Shimmer {...props} opacity={0.6}>
    {props.children}
  </Shimmer>
);

export default shimmer;
