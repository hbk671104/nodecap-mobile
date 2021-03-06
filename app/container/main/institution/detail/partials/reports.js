import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Group from './group';
import { Flex } from 'antd-mobile';
import moment from 'moment';
import Touchable from 'component/uikit/touchable';

const ReportItem = ({ data = [], onPress }) => {
  if (data.length > 0) {
    return (
      <Group title="评级报告">
        <View>
          {data.map(i => (
            <Touchable onPress={() => onPress(i)}>
              <Flex
                key={i.name}
                style={styles.container}
                align="start"
                justify="between"
              >
                <Text style={styles.title}>{i.title}</Text>
                <Text style={styles.desc}>
                  {moment(i.published_at).format('MM-DD')}
                </Text>
              </Flex>
            </Touchable>
          ))}
        </View>
      </Group>
    );
  }
  return null;
};

const styles = {
  container: {
    paddingVertical: 12,
    minWidth: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e9e9e9',
    flex: 1,
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
    flexShrink: 0,
    minWidth: 0,
    width: 40,
  },
  name: {
    fontSize: 14,
    color: '#FFFFFF',
    letterSpacing: 0.17,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    textShadowColor: 'rgba(131,158,182,0.50)',
  },
  titleContainer: {
    // marginBottom: 4,
  },
  title: {
    minWidth: 0,
    flex: 1,
  },
};

ReportItem.propTypes = {
  title: PropTypes.string,
};

export default ReportItem;
