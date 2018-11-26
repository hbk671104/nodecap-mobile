import React from 'react';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';

const item = ({ data, onPress }) => (
  <Touchable foreground onPress={onPress}>
    <Flex style={styles.container}>
      <Avatar
        raised={false}
        style={styles.avatar}
        imageStyle={styles.avatar}
        size={52}
        innerRatio={1}
      />
      <View style={styles.content.container}>
        <Text style={styles.content.name}>
          Yemu Xu
          <Text style={{ color: '#E9E9E9', fontWeight: 'normal' }}> | </Text>
          <Text style={styles.content.from}>Zilliqa</Text>
        </Text>
        <Text style={styles.content.text}>啦啦啦啦啦</Text>
      </View>
      <View>
        <Text style={styles.trail.time}>09:12</Text>
      </View>
    </Flex>
  </Touchable>
);

const styles = {
  container: {
    padding: 12,
  },
  avatar: {
    borderRadius: 1,
  },
  content: {
    container: {
      flex: 1,
      marginLeft: 12,
      justifyContent: 'center',
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    from: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
      fontWeight: 'normal',
    },
    text: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.65)',
      marginTop: 12,
    },
  },
  trail: {
    container: {},
    time: {
      fontSize: 11,
      color: 'rgba(0, 0, 0, 0.25)',
    },
    badge: {
      marginTop: 12,
    },
  },
};

export default item;
