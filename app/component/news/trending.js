import React from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';

import styles from './style';

const trending = ({ data }) => {
  const regex = R.pipe(
    R.path(['content']),
    R.match(/【(.*)】(.*)/),
  )(data);

  const title = R.pathOr('', [1])(regex);
  const content = R.pathOr('', [2])(regex);

  return (
    <View>
      <View>
        <Text>哈哈哈</Text>
      </View>
      <View style={styles.subtitle.container}>
        <Text style={styles.subtitle.text}>哈哈哈</Text>
      </View>
    </View>
  );
};

export default trending;
