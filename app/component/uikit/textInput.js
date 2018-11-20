import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, Platform } from 'react-native';

class Input extends Component {
  static propTypes = {
    placeholderTextColor: PropTypes.string,
    inputRef: PropTypes.func,
  };

  static defaultProps = {
    placeholderTextColor: '#999999',
  };

  // HACK: waiting for official fix
  shouldComponentUpdate(nextProps) {
    return Platform.OS !== 'ios' || this.props.value === nextProps.value;
  }

  render() {
    return (
      <TextInput
        clearButtonMode="while-editing"
        {...this.props}
        ref={this.props.inputRef}
        style={[styles, this.props.style]}
        underlineColorAndroid="transparent"
        placeholderTextColor={this.props.placeholderTextColor}
        onChangeText={this.props.onChange}
      />
    );
  }
}

const styles = {
  paddingTop: 0,
  paddingBottom: 0,
};

export default Input;
