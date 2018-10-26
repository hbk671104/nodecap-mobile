import React from 'react';
import PickerSelect from 'react-native-picker-select';

const picker = props => (
  <PickerSelect
    {...props}
    style={{
      ...styles,
      ...props.style,
    }}
    placeholder={props.placeholder}
    items={props.data}
    onValueChange={value => props.onChange(value)}
    value={props.value}
  />
);

const styles = {
  viewContainer: {
    // alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  inputIOS: {
    color: 'rgba(0, 0, 0, 0.85)',
  },
  inputAndroid: {
    color: 'rgba(0, 0, 0, 0.85)',
  },
  underline: {
    borderTopWidth: 0,
  },
};

export default picker;
