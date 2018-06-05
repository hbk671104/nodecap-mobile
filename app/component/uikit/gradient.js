import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const gradient = props => (
  <LinearGradient
    {...props}
    colors={['#35C3FF', '#1890FF']}
    start={{ x: 0.5, y: 0.0 }}
    end={{ x: 0.5, y: 1.0 }}
  >
    {props.children}
  </LinearGradient>
);

export default gradient;
