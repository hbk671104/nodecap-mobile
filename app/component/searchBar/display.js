import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './style';

const searchBarDisplay = ({ style, onPress }) => (
  <TouchableOpacity activeOpacity={0.75} style={[styles.container, style]} onPress={onPress}>
    <Text style={styles.title}>输入项目关键字搜索</Text>
    <View style={styles.icon.container}>
      <Image source={require('asset/search.png')} />
    </View>
  </TouchableOpacity>
);

searchBarDisplay.defaultProps = {
  onPress: () => null,
};

searchBarDisplay.propTypes = {
  onPress: PropTypes.func,
};

export default searchBarDisplay;
