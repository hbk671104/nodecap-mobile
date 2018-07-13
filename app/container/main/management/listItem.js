import React from 'react';
import { View, Text, Image } from 'react-native';

const listItem = props => (
  <View style={styles.container}>
    <View style={styles.left.container}>
      <Image style={styles.left.avatar} />
      <View style={styles.left.group}>
        <Text style={styles.left.title}>ZIL</Text>
        <Text style={styles.left.source}>钱包倒入</Text>
      </View>
    </View>
  </View>
);

const styles = {
  container: {
    height: 55,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      height: 20,
      width: 20,
    },
    group: {
      marginLeft: 12,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    source: {
      fontSize: 10,
      color: 'rgba(0, 0, 0, 0.45)',
      marginTop: 4,
    },
  },
};

export default listItem;
