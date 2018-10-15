import React from 'react';
import { Text } from 'react-native';

import Touchable from 'component/uikit/touchable';

const button = ({ title, onPress }) => (
  <Touchable style={styles.container} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
  </Touchable>
);

const styles = {
  container: {
    height: 39,
    marginHorizontal: 12,
    marginVertical: 15,
    backgroundColor: '#1890FF',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
};

export default button;
