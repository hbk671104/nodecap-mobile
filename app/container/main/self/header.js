import React from 'react';
import { View, Image, Text } from 'react-native';

import Icon from 'component/uikit/icon';
import { shadow } from '../../../utils/style';

const header = ({ style }) => (
  <View style={[styles.container, style]}>
    <Image />
    <View />
    <Icon name="arrow-forward" size={26} />
  </View>
);

export const headerHeight = 100;

const styles = {
  container: {
    height: headerHeight,
    backgroundColor: 'white',
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadow,
  },
};

export default header;
