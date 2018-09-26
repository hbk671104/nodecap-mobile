import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';
import FavorItem from 'component/favored/item';
import Group from './group';

const bottom = ({ data }) => (
  <Group
    title="资讯"
    renderRight={() => (
      <Touchable borderless>
        <View style={styles.rightContainer}>
          <Image source={require('asset/public_project/refreshing.png')} />
          <Text style={styles.rightText}>刷新</Text>
        </View>
      </Touchable>
    )}
  >
    {/* <View style={styles.info.container}>
      <Text style={styles.info.text}>
        今日新增：快讯26、头条 8、研报 3、交易所公告 14
      </Text>
    </View> */}
  </Group>
);

const styles = {
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    color: 'rgba(0, 0, 0, 0.85)',
    fontSize: 13,
    marginLeft: 5,
  },
  info: {
    container: {
      height: 22,
      backgroundColor: '#F4F4F4',
      justifyContent: 'center',
      marginTop: 5,
      paddingHorizontal: 12,
    },
    text: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 11,
    },
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E9E9E9',
    marginLeft: 78,
  },
};

export default bottom;
