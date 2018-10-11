import React from 'react';
import { View, Text } from 'react-native';

import Report from './report';
import Trending from './trending';
import Announcement from './announcement';
import styles from './style';

const newsItem = props => {
  let combo;
  const { data } = props;
  const { type } = data;
  switch (type) {
    case 'report':
      combo = {
        title: '研究报告',
        component: Report,
      };
      break;
    case 'announcement':
      combo = {
        title: '上所公告',
        component: Announcement,
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
      <combo.component {...props} />
    </View>
  );
};

export default newsItem;
