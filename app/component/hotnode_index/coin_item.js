import React from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';
import {
  VictoryChart,
  VictoryLine,
  VictoryArea,
  VictoryAxis,
} from 'victory-native';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';
import { Flex } from 'antd-mobile';

const coinItem = ({ data, onPress }) => {
  const name = R.pathOr('--', ['name'])(data);
  const icon = R.pathOr('', ['icon'])(data);
  const heat = R.pathOr('--', ['heat'])(data);
  const heat_change_percentage = R.pathOr(0, ['heat_change_percentage'])(data);
  const trend = R.pipe(
    R.pathOr([], ['trend']),
    R.map(t => ({
      x: t.date,
      y: t.heat,
    })),
  )(data);

  const minus = heat_change_percentage < 0;

  return (
    <Touchable foreground onPress={onPress}>
      <Flex style={styles.container} align="center">
        <Flex style={{ flex: 5 }}>
          <Avatar
            size={20}
            raised={false}
            innerRatio={1}
            source={{ uri: icon }}
          />
          <View style={{ flex: 1, paddingRight: 6 }}>
            <Text style={styles.title}>{name}</Text>
          </View>
        </Flex>
        <Flex style={{ flex: 4 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heat}>{heat}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.heat_percentage, minus && { color: '#F55454' }]}
            >
              {minus
                ? `${heat_change_percentage}`
                : `+${heat_change_percentage}`}
              %
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            {R.length(trend) > 1 && (
              <VictoryChart height={16} width={48} padding={styles.padding}>
                <VictoryAxis style={styles.axis.cross} crossAxis />
                <VictoryAxis style={styles.axis.dependent} dependentAxis />
                <VictoryArea
                  interpolation="basis"
                  style={{
                    ...styles.area,
                    data: {
                      ...styles.area.data,
                      fill: minus ? '#FFF6F6' : '#ECFFF1',
                    },
                  }}
                  data={trend}
                />
                <VictoryLine
                  interpolation="basis"
                  style={{
                    ...styles.line,
                    data: {
                      ...styles.line.data,
                      stroke: minus ? '#F55454' : '#15D661',
                    },
                  }}
                  data={trend}
                />
              </VictoryChart>
            )}
          </View>
        </Flex>
      </Flex>
    </Touchable>
  );
};

const styles = {
  container: {
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
    marginLeft: 12,
  },
  heat: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
  },
  heat_percentage: {
    fontSize: 12,
    color: '#09AC32',
  },
  padding: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  line: {
    data: {
      stroke: '#15D661',
      strokeWidth: 1,
    },
    axis: {
      stroke: 'none',
    },
  },
  axis: {
    cross: {
      axis: { stroke: 'none' },
    },
    dependent: {
      axis: { stroke: 'none' },
    },
  },
  area: {
    data: { fill: '#ECFFF1' },
  },
};

export default coinItem;
