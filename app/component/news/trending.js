import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import R from 'ramda';
import moment from 'moment';

import styles from './style';

const trending = ({ data, onPressShare }) => {
  const regex = R.pipe(
    R.path(['content']),
    R.match(/【(.*)】(.*)/),
  )(data);

  const title = R.pathOr('', [1])(regex);
  const content = R.pathOr('', [2])(regex);
  const created_at = R.path(['created_at'])(data);
  return (
    <View>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.subtitle.container}>
        <Text style={styles.subtitle.text}>{content}</Text>
      </View>
      <View style={styles.date.container}>
        <Text style={styles.date.text}>
          {moment.unix(created_at).format('LT')}
        </Text>
        <TouchableWithoutFeedback
          hitSlop={{
            top: 20,
            bottom: 20,
            left: 20,
            right: 20,
          }}
          onPress={() => {
            onPressShare(data);
          }}
        >
          <View>
            <Text style={[styles.date.text, styles.date.link]}>
          分享
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default trending;
