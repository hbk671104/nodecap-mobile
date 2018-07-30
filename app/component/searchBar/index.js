import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import NodeCapIcon from '../icon/nodecap';
import Input from '../uikit/textInput';
import styles from './style';

const searchBar = props => (
  <View style={[styles.container, props.style]}>
    <Input
      {...props}
      style={[styles.input, props.inputStyle]}
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor}
      returnKeyType={props.returnKeyType}
    />
    <View style={styles.icon.container}>
      <NodeCapIcon name="sousuo" size={16} color={props.iconColor} />
    </View>
  </View>
);

searchBar.defaultProps = {
  placeholder: '输入项目关键字搜索',
  placeholderTextColor: 'white',
  returnKeyType: 'done',
  iconColor: 'white',
};

searchBar.propTypes = {
  inputStyle: PropTypes.object,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  returnKeyType: PropTypes.string,
  iconColor: PropTypes.string,
};

export default searchBar;
