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
    { x: '发展', y: R.pathOr(80, ['progress'])(ratings) },
    { x: '团队', y: R.pathOr(70, ['team'])(ratings) },
    { x: '社群', y: R.pathOr(50, ['community'])(ratings) },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.title.container}>
        <Text style={styles.title.text}>项目综合得分</Text>
        <Text style={styles.title.score}>{overall}</Text>
      </View>
      <VictoryChart
        polar
        style={styles.chart.container}
        theme={VictoryTheme.material}
      >
        <VictoryArea style={styles.chart.area} data={data} />
        <VictoryPolarAxis style={styles.chart.axis} labelPlacement="vertical" />
      </VictoryChart>
    </View>
  );
};

export default overall_ratings;
