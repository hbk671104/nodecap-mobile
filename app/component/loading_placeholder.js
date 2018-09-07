import React from 'react';
import { View } from 'react-native';
import Placeholder from 'rn-placeholder';

const customPlaceholder = ({ style }) => {
  return <View style={[styles.container, style]} />;
};

const styles = {
  container: {
    backgroundColor: '#F8F8F8',
    borderRadius: 2,
  },
};

export default Placeholder.connect(customPlaceholder);
