import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Touchable from 'component/uikit/touchable';
import { shadow } from 'utils/style';

const deviceWidth = Dimensions.get('window').width;

const button = ({ style, onPress }) => (
  <View style={[styles.wrapper, style]}>
    <Touchable borderless onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>我要入驻</Text>
      </View>
    </Touchable>
  </View>
);

const styles = {
  wrapper: {
    position: 'absolute',
    bottom: 24,
    left: (deviceWidth - 160) / 2,
    ...shadow,
    shadowColor: '#1890FF',
    shadowOffset: {
      width: StyleSheet.hairlineWidth,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    backgroundColor: '#1890FF',
    borderRadius: 22,
  },
  container: {
    height: 44,
    width: 160,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
};

export default button;
