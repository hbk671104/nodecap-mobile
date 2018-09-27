import React from 'react';
import { View, Text, Image } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';

import { shadow } from '../../../../utils/style';
import { bottomTabHeight } from './style';

const bottom = ({ onFavorPress, onInvestmentPress, portfolio, openShareModal }) => {
  const favored = R.pathOr(false, ['is_focused'])(portfolio);
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Touchable
          style={styles.group.wrapper}
          borderless
          onPress={() => onFavorPress()}
        >
          <View style={styles.group.container}>
            <Image
              style={{
                width: 19,
                height: 19,
              }}
              source={
                favored
                  ? require('asset/project/detail/gold_star.png')
                  : require('asset/project/detail/grey_star.png')
              }
            />
            <Text style={styles.group.title}>
              {favored ? '已关注' : '关注'}
            </Text>
          </View>
        </Touchable>
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
          style={styles.investment.wrapper}
          onPress={() => onInvestmentPress()}
        >
          <View style={styles.investment.container}>
            <Text style={styles.investment.title}>投资记录</Text>
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
  investment: {
    wrapper: {
      flex: 3,
      height: 39,
      borderRadius: 2,
      marginHorizontal: 12,
    },
    container: {
      flex: 1,
      flexDirection: 'row',
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
