import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import R from 'ramda';
import * as Animatable from 'react-native-animatable';

import Touchable from 'component/uikit/touchable';
import Group from './group';

const bottom = props => (
  <Group
    title="资讯"
    renderRight={() => (
      <Touchable borderless onPress={props.onRefreshPress}>
        <View style={styles.rightContainer}>
          <Animatable.View
            animation={props.loading ? 'rotate' : undefined}
            easing="linear"
            iterationCount="infinite"
            useNativeDriver
          >
            <Image source={require('asset/public_project/refreshing.png')} />
          </Animatable.View>
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
