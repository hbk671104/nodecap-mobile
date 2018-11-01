import React from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';

const miscTags = ({ data }) => {
  const invested_by_renowned_insti = R.pipe(
    R.pathOr([], ['renowned_industry']),
    R.isEmpty,
    R.not,
  )(data);
  const top_rated = R.pipe(
    R.pathOr([], ['top_rating']),
    R.isEmpty,
    R.not,
  )(data);
  const is_reachable = R.pipe(
    R.pathOr([], ['is_reachable']),
    R.isEmpty,
    R.not,
  )(data);

  if (!invested_by_renowned_insti && !top_rated && !is_reachable) {
    return null;
  }

  return (
    <View style={styles.container}>
      {top_rated && (
        <View style={styles.item.container}>
          <Text style={styles.item.text}>有评级</Text>
        </View>
      )}
      {invested_by_renowned_insti && (
        <View style={styles.item.container}>
          <Text style={styles.item.text}>知名机构所投</Text>
        </View>
      )}
      {is_reachable && (
        <View style={styles.item.container}>
          <Text style={styles.item.text}>可联系</Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    height: 41,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: '#168AF3',
    alignItems: 'center',
  },
  item: {
    container: {
      height: 17,
      backgroundColor: '#0F7ADD',
      borderRadius: 1,
      paddingHorizontal: 3,
      marginRight: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 11,
      color: 'white',
    },
  },
};

export default miscTags;
