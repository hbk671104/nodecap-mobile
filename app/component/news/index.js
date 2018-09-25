import React from 'react';
import { View, Text } from 'react-native';

import Trending from './trending';
import styles from './style';

const newsItem = props => {
  return (
    <View style={styles.container}>
      <View style={styles.label.wrapper}>
        <View style={styles.label.container}>
          <Text style={styles.label.text}># 快讯</Text>
        </View>
      </View>
      <Trending {...props} />
    </View>
  );
};

export default newsItem;
