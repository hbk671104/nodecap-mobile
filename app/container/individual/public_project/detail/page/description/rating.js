import React from 'react';
import { View, Text, Image } from 'react-native';
import R from 'ramda';
import { connect } from 'react-redux';

import RatingItem from './rating_item';
import styles from './style';
import { Flex } from 'antd-mobile';

const rating = ({ portfolio, rating_orgs, onMorePress, onIndustryPress }) => {
  const data = R.pipe(
    R.pathOr([], ['rating']),
    // R.filter(i => i.rating_name && i.grade),
  )(portfolio);

  if (R.isEmpty(data)) {
    return null;
  }

  const scoreText = R.pathOr(0, ['rating_score'])(portfolio);
  const score = (Number(scoreText) * 0.5);
  const fullStarCount = Math.floor(score);
  const halfStarCount = score % 1 > 0 ? 1 : 0;
  const emptyStarCount = 5 - fullStarCount - halfStarCount;

  return (
    <View style={styles.fieldGroup}>
      <View>
        <Text style={[styles.title, styles.site]}>综合评级</Text>
        <Flex align="center" style={styles.scoreContent}>
          <Text style={styles.scoreText}>{scoreText}</Text>
          <Flex>
            {R.times(R.identity, fullStarCount).map(i => <Image style={styles.score} source={require('asset/public_project/score/full.png')} />)}
            {R.times(R.identity, halfStarCount).map(i => <Image style={styles.score} source={require('asset/public_project/score/half.png')} />)}
            {R.times(R.identity, emptyStarCount).map(i => <Image style={styles.score} source={require('asset/public_project/score/empty.png')} />)}
          </Flex>
        </Flex>
        <View style={styles.scoreTipContainer}>
          <Text style={styles.scoreTipText}>
            综合评级，得分1-10分，是根据项目社群活跃度、代码仓库更新、二级市场表现、评级分数等信息，用科学的方法建模计算得出。
          </Text>
        </View>
      </View>
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
