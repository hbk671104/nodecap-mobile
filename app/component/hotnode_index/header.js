import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import R from 'ramda';
import { Flex } from 'antd-mobile';

import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';

const item = ({ title, number, change, percentage_change }) => (
  <View style={styles.item.container}>
    <View>
      <Text style={styles.item.title.text}>{title}</Text>
    </View>
    <View style={styles.item.content.container}>
      <Text style={styles.item.content.text}>{number}</Text>
      <Text style={styles.item.content.change}>
        <Icon override name="md-arrow-dropup" color="#09AC32" /> {change}
      </Text>
    </View>
    <View style={styles.item.percentage_change.container}>
      <Text style={styles.item.percentage_change.text}>
        +{percentage_change}%
      </Text>
    </View>
  </View>
);

const categoryHeader = ({ global, onPress }) => {
  const count = R.pathOr('--', ['count'])(global);
  const count_change = R.pathOr('', ['count_change'])(global);
  const count_change_percentage = R.pathOr('', ['count_change_percentage'])(
    global,
  );
  const heat = R.pathOr('--', ['heat'])(global);
  const heat_change = R.pathOr('', ['heat_change'])(global);
  const heat_change_percentage = R.pathOr('', ['heat_change_percentage'])(
    global,
  );

  return (
    <Touchable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.top.container}>
          <Flex align="center">
            <View style={styles.top.dot} />
            <Text style={styles.top.title}>区块链一级市场指数</Text>
          </Flex>
          <Text style={styles.top.more}>
            详情
            {'  '}
            <Icon name="arrow-forward" />
          </Text>
        </View>
        <Flex style={styles.item.wrapper}>
          {item({
            title: 'Hotnode 指数',
            number: count,
            change: count_change,
            percentage_change: count_change_percentage,
          })}
          <View style={styles.divider} />
          {item({
            title: '项目数',
            number: heat,
            change: heat_change,
            percentage_change: heat_change_percentage,
          })}
        </Flex>
      </View>
    </Touchable>
  );
};

const styles = {
  container: {
    marginHorizontal: 12,
    marginVertical: 16,
    paddingTop: 20,
    paddingBottom: 16,
    borderRadius: 2,
    borderColor: '#ECECEC',
    borderWidth: StyleSheet.hairlineWidth,
  },
  top: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    dot: {
      height: 5,
      width: 5,
      borderRadius: 2.5,
      backgroundColor: '#1890FF',
      marginRight: 8,
    },
    title: {
      fontSize: 15,
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 'bold',
    },
    more: {
      fontSize: 12,
      color: '#1890FF',
      fontWeight: 'bold',
    },
  },
  divider: {
    backgroundColor: '#E9E9E9',
    width: StyleSheet.hairlineWidth,
    height: 50,
  },
  item: {
    wrapper: {
      marginTop: 20,
    },
    container: {
      flex: 1,
      paddingHorizontal: 16,
    },
    title: {
      text: {
        fontSize: 11,
        color: 'rgba(0, 0, 0, 0.45)',
      },
    },
    content: {
      container: {
        marginTop: 12,
        flexDirection: 'row',
      },
      text: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.85)',
      },
      change: {
        marginLeft: 8,
        fontSize: 12,
        color: '#333333',
      },
    },
    percentage_change: {
      container: {
        marginTop: 8,
        height: 20,
        backgroundColor: '#09AC32',
        borderRadius: 10,
        paddingHorizontal: 6,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
      },
      text: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
      },
    },
  },
};

export default categoryHeader;
