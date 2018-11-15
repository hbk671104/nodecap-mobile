import React from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';

import RatingItem from './rating_item';
import styles from './style';

const rating = ({ portfolio }) => {
  const data = R.pipe(
    R.pathOr([], ['rating']),
    R.filter(i => i.rating_name && i.grade),
  )(portfolio);

  if (R.isEmpty(data)) {
    return null;
  }

  return (
    <View style={styles.fieldGroup}>
      <Text style={[styles.title, styles.site]}>评级信息</Text>
      <RatingItem />
      <RatingItem />
      <RatingItem />
      <RatingItem />
    </View>
  );
};

export default rating;
