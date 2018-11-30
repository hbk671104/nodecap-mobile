import React from 'react';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';

import Avatar from 'component/uikit/avatar';
import Badge from 'component/badge';

import styles from './style';

const item = ({ data }) => (
  <Flex style={styles.container} align="flex-start">
    <Avatar
      raised={false}
      style={styles.avatar}
      imageStyle={styles.avatar}
      size={52}
      innerRatio={1}
    />
    <View style={styles.content.container}>
      <Flex>
        <View style={{ flex: 1 }}>
          <Text style={styles.content.name}>
            Yemu Xu
            <Text style={{ color: '#E9E9E9', fontWeight: 'normal' }}> | </Text>
            <Text style={styles.content.from}>Zilliqa</Text>
          </Text>
        </View>
        <Text style={styles.content.time}>09:12</Text>
      </Flex>
      <Flex style={styles.bottom}>
        <View style={{ flex: 1 }}>
          <Text style={styles.content.text}>闷声发大财，识得唔识得？</Text>
        </View>
        <Badge style={styles.badge} size={8} />
      </Flex>
    </View>
  </Flex>
);

export default item;
