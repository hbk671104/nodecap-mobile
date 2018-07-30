import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ViewPropTypes } from 'react-native';
import TextInput from 'component/uikit/textInput';
import styles from './style';

class AuthInput extends PureComponent {
  static propTypes = {
    style: ViewPropTypes.style,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.string,
    inputProps: PropTypes.object,
  };

  render() {
    const {
      style,
      title,
      placeholder,
      onChange,
      value,
      inputProps,
    } = this.props;
    return (
      <View style={[style]}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          {...inputProps}
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </View>
    );
  }
}

export default AuthInput;
