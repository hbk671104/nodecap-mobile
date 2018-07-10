import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const icon = props => (
  <Icon
    {...props}
    name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-${props.name}`}
  />
);

export default icon;
