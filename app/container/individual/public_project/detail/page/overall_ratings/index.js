import React from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';
import {
  VictoryChart,
  VictoryArea,
  VictoryPolarAxis,
  Text as VictoryText,
} from 'victory-native';

import styles from './style';

const LabelComponent = props => {
  const { x: key, y: value } = R.path(['datum', R.path(['index'])(props)])(
    props,
  );
  const { x, y } = props;
  const offsetX = () => {
    if (y > 0) {
      return -48;
    } else if (y < 0) {
      return -24;
    } else {
      return 0;
    }
  };
  return (
    <VictoryText>
      <VictoryText
        {...props}
        style={styles.chart.label}
        transform={`rotate(-30 ${x} ${y})`}
        dx={offsetX()}
      >
        {key}
      </VictoryText>
      <VictoryText
        {...props}
        x={x + 30}
        style={styles.chart.value}
        transform={`rotate(-30 ${x} ${y})`}
        dx={offsetX()}
      >
        {value}
      </VictoryText>
    </VictoryText>
  );
};

const overall_ratings = ({ portfolio }) => {
  const ratings = R.pathOr({}, ['overall_rating'])(portfolio);
  const overall = R.pathOr(50, ['value'])(ratings);

  const progress = R.pathOr(80, ['progress'])(ratings);
  const team = R.pathOr(90, ['team'])(ratings);
  const community = R.pathOr(40, ['community'])(ratings);

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
      <View style={{ paddingTop: 20 }}>
        <VictoryChart
          polar
          padding={20}
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
            tickLabelComponent={<LabelComponent datum={data} />}
          />
          <VictoryArea style={styles.chart.area} data={data} />
        </VictoryChart>
      </View>
    </View>
  );
};

export default overall_ratings;
