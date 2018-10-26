import React from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';

const miscTags = ({ data }) => {
  // misc
  const owners = R.pipe(
    R.pathOr([], ['owners']),
    R.isEmpty,
    R.not,
  )(data);
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

  return (
    <View style={styles.container}>
      {owners && (
        <View style={styles.item.container}>
          <Text style={styles.item.text}>项目已入驻</Text>
        </View>
      )}
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
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    marginTop: 8,
  },
  item: {
    container: {
      height: 17,
      backgroundColor: '#088CEE',
      borderRadius: 1,
      paddingHorizontal: 3,
      marginRight: 4,
    },
    text: {
      fontSize: 11,
      color: 'white',
    },
  },
};

export default miscTags;
