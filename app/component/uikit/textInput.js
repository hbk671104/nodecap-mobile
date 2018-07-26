import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, Platform } from 'react-native';

class Input extends Component {
  static propTypes = {
    placeholderTextColor: PropTypes.string,
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
        {...this.props}
        style={[styles, this.props.style]}
        underlineColorAndroid="transparent"
        placeholderTextColor={this.props.placeholderTextColor}
        clearButtonMode="while-editing"
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
