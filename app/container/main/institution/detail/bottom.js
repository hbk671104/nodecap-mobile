import React from 'react';
import { View, Text, Image } from 'react-native';
import R from 'ramda';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import Touchable from 'component/uikit/touchable';

import { shadow } from '../../../../utils/style';
import { bottomTabHeight } from './style';

const bottom = ({
  onFavorPress,
  onInviteJoinPress,
  portfolio,
  openShareModal,
  onPressComment,
}) => {
  const favored = R.pathOr(false, ['is_focused'])(portfolio);
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
              resizeMode="contain"
              style={styles.group.image}
              source={require('asset/project/detail/share.png')}
            />
            <Text style={styles.group.title}>分享</Text>
          </View>
        </Touchable>
        <Touchable
          style={styles.group.wrapper}
          borderless
          onPress={onInviteJoinPress}
        >
          <View style={styles.group.container}>
            <Image
              resizeMode="contain"
              style={styles.group.image}
              source={require('asset/project/detail/invite_join.png')}
            />
            <Text style={styles.group.title}>邀请入驻</Text>
          </View>
        </Touchable>
      </View>
    </View>
  );
};

const styles = {
  wrapper: {
    backgroundColor: 'white',
    ...shadow,
    shadowOffset: {
      height: -2,
    },
    shadowOpacity: 0.2,
    paddingBottom: getBottomSpace(),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: bottomTabHeight,
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
    image: {
      height: 20,
      width: 20,
    },
    title: {
      marginTop: 5,
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
