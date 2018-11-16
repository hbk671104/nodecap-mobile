import React from 'react';
import { Text } from 'react-native';

import Touchable from 'component/uikit/touchable';

const filterItem = ({ title, titleStyle, selected, onPress }) => (
  <Touchable
    style={[styles.container, selected && styles.highlight]}
    onPress={onPress}
  >
    <Text
      style={[styles.title, selected && styles.titleHighlight, titleStyle]}
      numberOfLines={1}
    >
      {title}
    </Text>
  </Touchable>
);

const styles = {
  container: {
    height: 30,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 2,
    marginRight: 9,
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  highlight: {
    backgroundColor: '#E5F3FF',
  },
  title: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.65)',
  },
  titleHighlight: {
    color: '#1890FF',
  },
};

export default filterItem;
