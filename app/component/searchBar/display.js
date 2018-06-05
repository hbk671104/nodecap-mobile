import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ViewPropTypes, TouchableOpacity } from 'react-native';

import NodeCapIcon from 'component/icon/nodecap';
import styles from './style';

const searchBarDisplay = ({ style, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.75}
    style={[styles.container, style]}
    onPress={onPress}
  >
    <Text style={styles.title}>输入关键字搜索</Text>
    <View style={styles.icon.container}>
      <NodeCapIcon name="sousuo" size={16} color="white" />
    </View>
  </TouchableOpacity>
);

searchBarDisplay.defaultProps = {
  onPress: () => null,
};
searchBarDisplay.propTypes = {
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
};

export default searchBarDisplay;
