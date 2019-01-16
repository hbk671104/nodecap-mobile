import React from 'react';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';
import R from 'ramda';

import Format from 'component/format';

const holder = ({ data }) => {
  const rank = R.path(['rank'])(data);
  const balance = R.pathOr(0, ['balance'])(data);
  const address = R.pathOr('--', ['addr'])(data);
  return (
    <Flex style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.text, { marginLeft: 8 }]}>{rank}</Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.content}>
          <Format>{balance}</Format> BTC
        </Text>
      </View>
      <View style={{ flex: 3 }}>
        <Text style={styles.text}>{address}</Text>
      </View>
    </Flex>
  );
};

const styles = {
  container: {
    height: 40,
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.65)',
  },
  content: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
  },
};

export default holder;
