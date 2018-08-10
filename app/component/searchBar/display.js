import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

import NodeCapIcon from '../icon/nodecap';
import styles from './style';

const searchBarDisplay = ({ style, onPress, title }) => (
  <TouchableOpacity
    activeOpacity={0.75}
    style={[styles.container, style]}
    onPress={onPress}
  >
    <Text style={styles.title}>{title}</Text>
    <View style={styles.icon.container}>
      <NodeCapIcon name="sousuo" size={16} color="white" />
    </View>
  </TouchableOpacity>
);

searchBarDisplay.defaultProps = {
  onPress: () => null,
  title: '输入项目关键字搜索',
};

searchBarDisplay.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
};

export default searchBarDisplay;
