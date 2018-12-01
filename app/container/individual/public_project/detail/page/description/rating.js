import React from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';
import { connect } from 'react-redux';

import RatingItem from './rating_item';
import styles from './style';

const rating = ({ portfolio, rating_orgs, onMorePress, onIndustryPress }) => {
  const data = R.pipe(
    R.pathOr([], ['rating']),
    // R.filter(i => i.rating_name && i.grade),
  )(portfolio);

  if (R.isEmpty(data)) {
    return null;
  }

  return (
    <View style={styles.fieldGroup}>
      <Text style={[styles.title, styles.site]}>评级信息</Text>
      {R.map(r => {
        const org_id = R.path(['rating_org_id'])(r);
        const org = R.find(o => o.id === org_id)(rating_orgs);
        return (
          <RatingItem
            key={r.id}
            data={r}
            org={org}
            onMorePress={() => onMorePress(r)}
            onIndustryPress={() => onIndustryPress(r)}
          />
        );
      })(data)}
    </View>
  );
};

export default connect(({ global }) => ({
  rating_orgs: R.pathOr([], ['constants', 'rating_orgs'])(global),
}))(rating);
