import React from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';
import {
  VictoryChart,
  VictoryArea,
  VictoryPolarAxis,
  VictoryTheme,
} from 'victory-native';

import styles from './style';

const overall_ratings = ({ portfolio }) => {
  const ratings = R.pathOr({}, ['overall_rating'])(portfolio);
  const overall = R.pathOr(90, ['value'])(ratings);
  const data = [
    { x: '产品', y: R.pathOr(80, ['product'])(ratings) },
    { x: '团队', y: R.pathOr(70, ['team'])(ratings) },
    { x: '营销', y: R.pathOr(30, ['marketing'])(ratings) },
    { x: '技术', y: R.pathOr(50, ['technology'])(ratings) },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.title.container}>
        <Text style={styles.title.text}>项目综合得分</Text>
        <Text style={styles.title.score}>{overall}</Text>
      </View>
      <VictoryChart range={{ y: [0, 100] }} polar theme={VictoryTheme.material}>
        <VictoryArea style={styles.chart.area} data={data} />
        <VictoryPolarAxis labelPlacement="vertical" />
      </VictoryChart>
    </View>
  );
};

export default overall_ratings;
