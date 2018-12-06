import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Icon from 'component/uikit/icon';
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
    {props.showMagnifier && (
      <View style={[styles.icon.container, props.iconContainerStyle]}>
        <Icon name="search" size={20} color={props.iconColor} />
      </View>
    )}
  </View>
);

searchBar.defaultProps = {
  placeholder: '输入项目关键字搜索',
  placeholderTextColor: 'white',
  returnKeyType: 'done',
  iconColor: 'white',
  showMagnifier: true,
};

searchBar.propTypes = {
  inputStyle: PropTypes.object,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  returnKeyType: PropTypes.string,
  iconColor: PropTypes.string,
  showMagnifier: PropTypes.bool,
};

export default searchBar;
