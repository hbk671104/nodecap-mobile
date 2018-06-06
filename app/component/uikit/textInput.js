import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

const textInput = props => (
  <TextInput
    {...props}
    style={[styles, props.style]}
    underlineColorAndroid="transparent"
    placeholderTextColor={props.placeholderTextColor}
    clearButtonMode="while-editing"
  />
);

textInput.defaultProps = {
  placeholderTextColor: '#999999',
};

textInput.propTypes = {
  mask: PropTypes.string,
  placeholderTextColor: PropTypes.string,
};

const styles = {
  paddingTop: 0,
  paddingBottom: 0,
};

export default textInput;
