import React from 'react';
import { View, Text, Image } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';

import { shadow } from '../../../../utils/style';
import { bottomTabHeight } from './style';

const bottom = ({ onStatusPress, portfolio }) => {
  const matched = R.pathOr(false, ['matched'])(portfolio);
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Touchable
          disabled={matched}
          style={styles.status.wrapper}
          onPress={() => onStatusPress()}
        >
          <View
            style={[
              styles.status.container,
              matched && { backgroundColor: 'rgba(24, 144, 255, 0.6)' },
            ]}
          >
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
  status: {
    wrapper: {
      flex: 1,
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
