import React from 'react';
import { View, Text, Image } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import StatusDisplay from 'component/project/statusDisplay';

import { shadow } from '../../../../utils/style';
import { bottomTabHeight } from './style';

const bottom = ({
  unmatched,
  onRecordPress,
  onStatusPress,
  onMatchPress,
  portfolio,
}) => {
  const match_source = unmatched
    ? require('asset/project/detail/unmatched.png')
    : require('asset/project/detail/matched.png');
  const match_title = unmatched ? '未匹配' : '已匹配';
  const status = R.pathOr(0, ['status'])(portfolio);
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Touchable style={styles.group.wrapper} onPress={() => onMatchPress()}>
          <View style={styles.group.container}>
            <Image source={match_source} />
            <Text
              style={[styles.group.title, !unmatched && { color: '#1890FF' }]}
            >
              {match_title}
            </Text>
          </View>
        </Touchable>
        <Touchable style={styles.group.wrapper} onPress={() => onRecordPress()}>
          <View style={styles.group.container}>
            <Image
              source={require('asset/project/detail/investment_record.png')}
            />
            <Text style={styles.group.title}>投资记录</Text>
          </View>
        </Touchable>
        <Touchable
          style={styles.status.wrapper}
          onPress={() => onStatusPress()}
        >
          <View style={styles.status.container}>
            <StatusDisplay
              showDot={false}
              titleStyle={styles.status.title}
              status={status}
            />
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
      width: 160,
      height: 39,
      borderRadius: 2,
      backgroundColor: '#1890FF',
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
