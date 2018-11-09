import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import R from 'ramda';

const miscTags = ({ style, data }) => {
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
  const has_whitepapers = R.pipe(
    R.pathOr([], ['white_papers']),
    R.isEmpty,
    R.not,
  )(data);

  if (
    !invested_by_renowned_insti &&
    !top_rated &&
    !is_reachable &&
    !has_whitepapers
  ) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.title.container}>
        <Text style={styles.title.text}>优势</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.content.container}
        contentContainerStyle={{ alignItems: 'center', paddingRight: 16 }}
      >
        <Text style={styles.content.text}>
          {R.join('、')([
            ...(has_whitepapers ? ['有白皮书'] : []),
            ...(invested_by_renowned_insti ? ['知名机构所投'] : []),
            ...(top_rated ? ['有评级'] : []),
            ...(is_reachable ? ['可联系'] : []),
          ])}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    paddingLeft: 12,
    height: 46.5,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  title: {
    container: {
      height: 22.5,
      borderRadius: 2,
      backgroundColor: '#1890FF',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 4,
      alignSelf: 'center',
    },
    text: {
      fontSize: 12,
      color: 'white',
      fontWeight: 'bold',
    },
  },
  content: {
    container: {
      flex: 1,
      marginLeft: 16,
    },
    text: {
      fontSize: 13,
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 'bold',
    },
  },
};

export default miscTags;
