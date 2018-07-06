import React from 'react';
import { View, Image, Text } from 'react-native';

const developing = props => (
  <View style={styles.container}>
    <Image source={require('asset/developing.png')} />
    <Text style={styles.title}>功能正在火热开发中...</Text>
  </View>
);

const styles = {
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.65)',
    marginTop: 32,
  },
};

export default developing;
