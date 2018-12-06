import React from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';

import FilterItem from './item';

const progressGroup = ({ title, selection, onSelect, onAllPress }) => {
  const progress = R.pathOr('', ['progress'])(selection);
  const empty_selection = R.isEmpty(progress);
  return (
    <View style={styles.container}>
      <View style={styles.header.container}>
        <Text style={styles.header.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.tag.container}>
        <FilterItem
          title="全部"
          selected={empty_selection}
          onPress={() => onAllPress()}
        />
        <FilterItem
          title="即将开始"
          selected={progress === '2'}
          onPress={() =>
            onSelect({
              value: '2',
              name: '即将开始',
            })
          }
        />
        <FilterItem
          title="进行中"
          selected={progress === '3'}
          onPress={() =>
            onSelect({
              value: '3',
              name: '进行中',
            })
          }
        />
        <FilterItem
          title="已结束"
          selected={progress === '4'}
          onPress={() =>
            onSelect({
              value: '4',
              name: '已结束',
            })
          }
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    marginTop: 20,
    marginBottom: 10,
  },
  header: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      paddingRight: 12,
    },
    title: {
      flex: 1,
      fontSize: 14,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    expand: {
      fontSize: 13,
      color: 'rgba(0, 0, 0, 0.65)',
    },
  },
  tag: {
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
};

export default progressGroup;
