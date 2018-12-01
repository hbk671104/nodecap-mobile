import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import R from 'ramda';

const miscTags = ({ style, data }) => {
  const invested_by_renowned_insti = R.pathOr(false, ['is_renowned_industry'])(
    data,
  );
  const top_rated = R.pathOr(false, ['has_rating'])(data);
  const is_reachable = R.pathOr(false, ['is_reachable'])(data);
  const has_whitepapers = R.pathOr(false, ['has_white_paper'])(data);
  const has_weekly = R.pathOr(false, ['has_weekly'])(data);

  if (
    !invested_by_renowned_insti &&
    !top_rated &&
    !is_reachable &&
    !has_whitepapers &&
    !has_weekly
  ) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.title.container}>
        <Text style={styles.title.text}>亮点</Text>
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
            ...(has_weekly ? ['有周报'] : []),
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
