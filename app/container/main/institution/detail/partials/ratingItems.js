import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Group from './group';
import { Flex } from 'antd-mobile';

const getColor = (opacity) => `rgba(128, 155, 180, ${opacity})`;

const RatingItem = ({ data = [] }) => (data.length ? (
  <Group title="评级标准">
    <View style={{ marginTop: 20 }}>
      {data.map((i, idx) => (
        <Flex key={i.name} style={styles.container} align="start">
          <View style={[styles.icon, {
          backgroundColor: getColor(0.3 + (idx + 1) * (0.7 / data.length)),
        }]}
          >
            <Text style={styles.name}>{i.name}</Text>
          </View>
          <Text style={styles.desc}>{i.description}</Text>
        </Flex>
    ))}
    </View>
  </Group>
) : null);

const styles = {
  container: {
    marginBottom: 12,
    minWidth: 0,
  },
  icon: {
    width: 60,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    marginLeft: 16,
    fontSize: 13,
    color: 'rgba(0,0,0,0.65)',
    minWidth: 0,
    flex: 1,
  },
  name: { fontSize: 14, color: '#FFFFFF', letterSpacing: 0.17, textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2, textShadowColor: 'rgba(131,158,182,0.50)' },
  titleContainer: {
    // marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
  },
};

RatingItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RatingItem;
