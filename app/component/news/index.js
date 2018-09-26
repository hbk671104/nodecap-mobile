import React from 'react';
import { View, Text } from 'react-native';

import Report from './report';
import Trending from './trending';
import styles from './style';

const newsItem = ({ data }) => {
  let combo;

  const { type } = data;
  switch (type) {
    case 'report':
      combo = {
        title: '研究报告',
        component: Report,
      };
      break;

    default:
      combo = {
        title: '快讯',
        component: Trending,
      };
      break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.label.wrapper}>
        <View style={styles.label.container}>
          <Text style={styles.label.text}># {combo.title}</Text>
        </View>
      </View>
      <combo.component data={data} />
    </View>
  );
};

export default newsItem;
