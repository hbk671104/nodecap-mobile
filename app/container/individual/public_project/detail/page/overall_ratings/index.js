import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';
import {
  VictoryChart,
  VictoryArea,
  VictoryPolarAxis,
  VictoryTheme,
  VictoryLabel,
} from 'victory-native';

import styles from './style';

class LabelComponent extends PureComponent {
  render() {
    return <Text>哈哈</Text>;
  }
}

const overall_ratings = ({ portfolio }) => {
  const ratings = R.pathOr({}, ['overall_rating'])(portfolio);
  const overall = R.pathOr(90, ['value'])(ratings);

  const progress = R.pathOr(80, ['progress'])(ratings);
  const team = R.pathOr(90, ['team'])(ratings);
  const community = R.pathOr(85, ['community'])(ratings);

  const data = [
    { x: '发展', y: progress },
    { x: '团队', y: team },
    { x: '社群', y: community },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.title.container}>
        <Text style={styles.title.text}>项目综合得分</Text>
        <Text style={styles.title.score}>{overall}</Text>
      </View>
      <VictoryChart
        polar
        padding={24}
        minDomain={{ y: 0 }}
        maxDomain={{ y: 100 }}
        style={styles.chart.container}
      >
        <VictoryPolarAxis
          dependentAxis
          style={styles.chart.dependentAxis}
          tickFormat={() => null}
        />
        <VictoryPolarAxis
          style={styles.chart.axis}
          tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
        />
        <VictoryArea style={styles.chart.area} data={data} />
      </VictoryChart>
    </View>
  );
};

export default overall_ratings;
