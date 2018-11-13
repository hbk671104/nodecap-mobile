import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';
import styles from './style';

const searchBarDisplay = ({ style, onPress, title, titleStyle, iconColor }) => (
  <Touchable onPress={onPress}>
    <View style={[styles.container, style]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <View style={styles.icon.container}>
        <Icon name="search" size={20} color={iconColor} />
      </View>
    </View>
  </Touchable>
);

searchBarDisplay.defaultProps = {
  onPress: () => null,
  title: '输入项目关键字搜索',
  iconColor: 'white',
};

searchBarDisplay.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  iconColor: PropTypes.string,
};

export default searchBarDisplay;
