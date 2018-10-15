import React from 'react';
import { View, Text } from 'react-native';

import Touchable from 'component/uikit/touchable';

const button = ({ title, renderTop, onPress }) => (
  <View>
    {!!renderTop && renderTop()}
    <Touchable style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Touchable>
  </View>
);

const styles = {
  container: {
    height: 39,
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 15,
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
