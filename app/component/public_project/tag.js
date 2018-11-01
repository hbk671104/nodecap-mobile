import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import R from 'ramda';

const tag = ({ data }) => {
  const tags = R.pipe(
    R.pathOr([], ['tags']),
    R.map(i => ({
      ...i,
      name: R.trim(i.name),
    })),
  )(data);

  if (R.isEmpty(tags)) {
    return null;
  }

  return (
    <View style={styles.container}>
      {R.map(t => (
        <View key={t.id} style={styles.item.container}>
          <Text style={styles.item.text}>{t.name}</Text>
        </View>
      ))(tags)}
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  item: {
    container: {
      height: 17,
      borderRadius: 1,
      borderColor: 'white',
      borderWidth: StyleSheet.hairlineWidth,
      paddingHorizontal: 3,
      marginRight: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 11,
      color: 'white',
      fontWeight: 'bold',
    },
  },
};

export default tag;
