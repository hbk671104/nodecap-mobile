import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

class Input extends PureComponent {
  static propTypes = {
    placeholderTextColor: PropTypes.string,
  };

  static defaultProps = {
    placeholderTextColor: '#999999',
  };

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
