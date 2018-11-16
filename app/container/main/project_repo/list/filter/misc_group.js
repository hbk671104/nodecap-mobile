import React from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';

import FilterItem from './item';

const miscGroup = ({ title, selection, onSelect, onAllPress }) => {
  const is_reachable = R.pathOr(0, ['is_reachable'])(selection);
  const has_weekly = R.pathOr(0, ['has_weekly'])(selection);
  const has_rating = R.pathOr(0, ['has_rating'])(selection);
  const has_white_paper = R.pathOr(0, ['has_white_paper'])(selection);
  const is_renowned_industry = R.pathOr(0, ['is_renowned_industry'])(selection);

  const empty_selection =
    is_reachable === 0 &&
    has_weekly === 0 &&
    has_rating === 0 &&
    has_white_paper === 0 &&
    is_renowned_industry === 0;

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
          title="可联系"
          selected={is_reachable === 1}
          onPress={() =>
            onSelect({
              value: is_reachable === 0 ? 1 : 0,
              key: 'is_reachable',
              name: '可联系',
            })
          }
        />
        <FilterItem
          title="有周报"
          selected={has_weekly === 1}
          onPress={() =>
            onSelect({
              value: has_weekly === 0 ? 1 : 0,
              key: 'has_weekly',
              name: '有周报',
            })
          }
        />
        <FilterItem
          title="有评级"
          selected={has_rating === 1}
          onPress={() =>
            onSelect({
              value: has_rating === 0 ? 1 : 0,
              key: 'has_rating',
              name: '有评级',
            })
          }
        />
        <FilterItem
          title="有白皮书"
          selected={has_white_paper === 1}
          onPress={() =>
            onSelect({
              value: has_white_paper === 0 ? 1 : 0,
              key: 'has_white_paper',
              name: '有白皮书',
            })
          }
        />
        <FilterItem
          title="知名机构所投"
          titleStyle={{ fontSize: 12 }}
          selected={is_renowned_industry === 1}
          onPress={() =>
            onSelect({
              value: is_renowned_industry === 0 ? 1 : 0,
              key: 'is_renowned_industry',
              name: '知名机构所投',
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

export default miscGroup;
