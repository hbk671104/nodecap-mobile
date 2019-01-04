import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Group from './group';
import { Flex } from 'antd-mobile';

const getColor = opacity => `rgba(128, 155, 180, ${opacity})`;

const RatingItem = ({ data = [] }) => {
  if (data.length > 0) {
    return (
      <Group title="评级标准">
        <View style={{ marginTop: 20 }}>
          {data.map((i, idx) => (
            <Flex key={i.name} style={styles.container} align="center">
              <View style={[styles.icon]}>
                <Text style={styles.name}>{i.name}</Text>
              </View>
              <View style={styles.divider} />
              <Text style={styles.desc}>{i.description}</Text>
            </Flex>
          ))}
        </View>
      </Group>
    );
  }
  return null;
};

const styles = {
  container: {
    marginBottom: 12,
    minWidth: 0,
    borderColor: '#e9e9e9',
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 15,
    paddingRight: 15,
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
  name: { fontSize: 17, color: '#1890FF' },
  titleContainer: {
    // marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
  },
  divider: {
    height: 30,
    width: 1,
    borderRightColor: '#e9e9e9',
    borderRightWidth: StyleSheet.hairlineWidth,
  },
};

RatingItem.propTypes = {
  title: PropTypes.string,
};

export default RatingItem;
