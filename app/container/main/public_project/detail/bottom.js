import React from 'react';
import { View, Text, Image } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';

import { shadow } from '../../../../utils/style';
import { bottomTabHeight } from './style';

const bottom = ({ onStatusPress, portfolio, openShareModal }) => {
  const matched = R.pathOr(false, ['matched'])(portfolio);
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Touchable
          style={styles.group.wrapper}
          borderless
          onPress={openShareModal}
        >
          <View style={styles.group.container}>
            <Image
              style={{
                width: 19,
                height: 19,
                marginTop: 2,
              }}
              source={require('asset/project/detail/share.png')}
            />
            <Text style={styles.group.title}>
              分享
            </Text>
          </View>
        </Touchable>
        <Touchable
          style={styles.status.wrapper}
          onPress={() => onStatusPress()}
        >
          <View style={[styles.status.container]}>
            <Text style={styles.status.title}>
              {matched ? '已添加至工作流' : '添加至工作流'}
            </Text>
            <Image
              style={styles.status.triangle}
              source={require('asset/project/detail/triangle.png')}
            />
          </View>
        </Touchable>
      </View>
    </View>
  );
};

const styles = {
  wrapper: {
    height: bottomTabHeight,
    backgroundColor: 'white',
    ...shadow,
    shadowOffset: {
      height: -2,
    },
    shadowOpacity: 0.2,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 12,
  },
  group: {
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      marginTop: 6,
      color: 'rgba(0, 0, 0, 0.65)',
      fontSize: 11,
    },
  },
  status: {
    wrapper: {
      flex: 2,
      height: 39,
      borderRadius: 2,
      marginHorizontal: 12,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
      backgroundColor: '#1890FF',
    },
    title: {
      fontSize: 13,
      color: 'white',
      fontWeight: 'bold',
    },
    triangle: {
      position: 'absolute',
      top: 3,
      right: 3,
    },
  },
};

export default bottom;
