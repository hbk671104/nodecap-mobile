import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';

import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';
import styles from './style';

export const SearchBarDisplayHomepage = ({
  style,
  onPress,
  title,
  titleStyle,
  iconColor,
}) => (
  <Touchable onPress={onPress}>
    <View style={[styles.container, { justifyContent: 'center' }, style]}>
      <Flex align="center">
        <View style={styles.icon.container}>
          <Icon name="search" size={18} color={iconColor} />
        </View>
        <Text style={[styles.title, { flex: undefined }, titleStyle]}>
          {title}
        </Text>
      </Flex>
    </View>
  </Touchable>
);

const searchBarDisplay = ({
  style,
  onPress,
  title,
  titleStyle,
  iconColor,
  iconContainerStyle,
}) => (
  <Touchable onPress={onPress}>
    <View style={[styles.container, style]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <View style={[styles.icon.container, iconContainerStyle]}>
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
