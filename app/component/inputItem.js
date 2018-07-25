import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import Input from 'component/uikit/textInput';

const inputItem = props => (
  <View style={styles.container}>
    <Text style={styles.title}>{props.title}</Text>
    <Input
      {...props}
      style={styles.input}
      placeholder={props.placeholder}
      placeholderTextColor="rgba(0, 0, 0, 0.25)"
    />
  </View>
);

const styles = {
  container: {
    minHeight: 56,
    marginLeft: 12,
    paddingRight: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'rgba(0, 0, 0, 0.45)',
  },
  input: {
    flex: 1,
    marginLeft: 9,
  },
};

inputItem.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default inputItem;
