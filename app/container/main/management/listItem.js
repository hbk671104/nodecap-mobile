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
    <View style={styles.middle.container}>
      <Text style={styles.middle.title}>283,713.01</Text>
      <Text style={styles.middle.subtitle}>3,823,761 ZIL</Text>
    </View>
    <View style={styles.right.container}>
      <Text style={styles.right.price}>0.4343</Text>
      <Text style={styles.right.change}>-0.35%</Text>
    </View>
  </View>
);

const styles = {
  container: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 140,
      paddingLeft: 12,
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
  middle: {
    container: {
      flex: 1,
    },
    title: {
      color: 'rgba(0, 0, 0, 0.85)',
      fontSize: 14,
      fontWeight: 'bold',
    },
    subtitle: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 11,
      marginTop: 4,
    },
  },
  right: {
    container: {
      width: 80,
    },
    price: {
      color: '#FF3C00',
      fontSize: 14,
      fontWeight: 'bold',
    },
    change: {
      color: '#FF3C00',
      fontSize: 12,
      marginTop: 4,
    },
  },
};

export default listItem;
