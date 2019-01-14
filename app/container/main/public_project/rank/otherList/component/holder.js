import React from 'react';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';

const holder = props => (
  <Flex style={styles.container}>
    <View style={{ flex: 1 }}>
      <Text style={styles.text}>哈哈</Text>
    </View>
    <View style={{ flex: 2 }}>
      <Text style={styles.content}>哈哈</Text>
    </View>
    <View style={{ flex: 3 }}>
      <Text style={styles.text}>哈哈</Text>
    </View>
  </Flex>
);

const styles = {
  container: {
    height: 40,
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.65)',
  },
  content: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
  },
};

export default holder;
