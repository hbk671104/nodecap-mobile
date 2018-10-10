import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import R from 'ramda';

import Icon from 'component/uikit/icon';
import Touchable from 'component/uikit/touchable';
import { shadow } from 'utils/style';

const header = ({ pagination }) => {
  const total_count = R.pathOr(0, ['total'])(pagination);
  return (
    <View style={styles.container}>
      <View style={styles.content.container}>
        <Text style={styles.content.title}>
          当前：
          <Text style={{ fontWeight: 'bold', color: '#1890FF' }}>
            {total_count}
          </Text>
        </Text>
        <View style={styles.content.tag.container}>
          <Touchable style={styles.content.tag.wrapper}>
            <Text style={styles.content.tag.title}>即将开始</Text>
          </Touchable>
          <Touchable style={styles.content.tag.wrapper}>
            <Text style={styles.content.tag.title}>进行中</Text>
          </Touchable>
          <Touchable style={styles.content.tag.wrapper}>
            <Text style={styles.content.tag.title}>已结束</Text>
          </Touchable>
        </View>
      </View>
      <Touchable borderless style={styles.filter.container}>
        <Text style={styles.filter.title}>
          <Image source={require('asset/public_project/funnel.png')} /> 筛选
        </Text>
      </Touchable>
    </View>
  );
};

const styles = {
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  content: {
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.65)',
    },
    tag: {
      container: {
        flexDirection: 'row',
        marginLeft: 12,
      },
      wrapper: {
        borderRadius: 2,
        height: 28.5,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        marginRight: 10,
      },
      title: {
        fontSize: 11,
        color: 'rgba(0, 0, 0, 0.65)',
      },
    },
  },
  filter: {
    container: {
      marginLeft: 12,
    },
    title: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.65)',
    },
  },
};

export default header;
