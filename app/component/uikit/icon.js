import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const icon = props => {
  const name = props.override
    ? props.name
    : `${Platform.OS === 'ios' ? 'ios' : 'md'}-${props.name}`;

  return <Icon {...props} name={name} />;
};

icon.defaultProps = {
  override: false,
};

icon.propTypes = {
  override: PropTypes.bool,
};

export default icon;
