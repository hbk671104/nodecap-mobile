import React, { Component } from 'react';
import * as R from 'ramda';
import Touchable from '../../../component/uikit/touchable';
import { Flex } from 'antd-mobile';
import styles from './style';
import { Text, View } from 'react-native';
import SolidAvatar from '../../../component/uikit/avatar.solid';

export default function ({ item, onPress }) {
  const tags = R.pathOr([], ['tags'])(item);
  return (
    <Touchable onPress={() => onPress(item)}>
      <Flex align="start" style={styles.itemContainer}>
        <View style={styles.avatar}>
          <SolidAvatar
            raised={false}
            innerRatio={1}
            source={{ uri: item.logo }}
            imageStyle={{
              borderRadius: 0,
            }}
          />
        </View>
        <View style={styles.right}>
          <Text style={styles.title}>{item.title}</Text>
          <Flex>
            {tags.map(i => (
              <View key={i.name} style={styles.tag}>
                <Text style={styles.tagText}>{i.name}</Text>
              </View>
            ))}
          </Flex>
          <Text style={styles.desc} numberOfLines={1}>{item.description}</Text>
        </View>
      </Flex>
    </Touchable>
  );
}
