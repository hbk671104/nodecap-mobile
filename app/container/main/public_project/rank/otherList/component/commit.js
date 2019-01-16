import React from 'react';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';
import R from 'ramda';

import Format from 'component/format';

const commit = ({ data }) => {
  const rank = R.path(['rank'])(data);
  const name = R.pathOr('--', ['name'])(data);
  const commits = R.pipe(
    R.pathOr([], ['commit_times']),
    R.reduce((acc, v) => {
      let commit_time = R.pathOr(0, ['commit_times'])(v);
      commit_time = parseInt(commit_time, 10);
      return acc + commit_time;
    }, 0),
  )(data);
  return (
    <Flex style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.text, { marginLeft: 8 }]}>{rank}</Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.content}>{name}</Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.text}>
          <Format digit={0}>{commits}</Format>
        </Text>
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

export default commit;
