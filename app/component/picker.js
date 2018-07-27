import React from 'react';
import PickerSelect from 'react-native-picker-select';

const picker = props => (
  <PickerSelect
    {...props}
    style={styles}
    placeholder={props.placeholder}
    items={props.data}
    onValueChange={value => props.onChange(value)}
    value={props.value}
  />
);

const styles = {
  inputIOS: {
    color: 'rgba(0, 0, 0, 0.85)',
  },
  inputAndroid: {
    color: 'rgba(0, 0, 0, 0.85)',
  },
};

export default picker;
