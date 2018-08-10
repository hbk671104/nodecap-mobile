import React from 'react';
import { View, Image, Platform } from 'react-native';
import Touchable from 'component/uikit/touchable';

const add = ({ onPress }) => (
  <View style={styles.container}>
    <Touchable borderless style={styles.content} onPress={onPress}>
      <Image source={require('asset/project/plus.png')} />
    </Touchable>
  </View>
);

const styles = {
  container: {
    position: 'absolute',
    right: 12,
    bottom: 60,
    backgroundColor: '#1890ff',
    borderRadius: 25,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 3, width: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  content: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default add;
