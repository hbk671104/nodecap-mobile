import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import R from 'ramda';

const purpose = ({ style, data }) => {
  const purpose_raw = R.pathOr([], ['purpose'])(data);
  if (R.isEmpty(purpose_raw)) {
    return null;
  }

  const purpose_text = R.pipe(
    R.map(p => p.name),
    R.join('、'),
  )(purpose_raw);
  return (
    <View style={[styles.container, style]}>
      <View style={styles.title.container}>
        <Text style={styles.title.text}>需求</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.content.container}
        contentContainerStyle={{ alignItems: 'center', paddingRight: 16 }}
      >
        <Text style={styles.content.text}>{purpose_text}</Text>
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
  },
  title: {
    container: {
      height: 22.5,
      borderRadius: 2,
      backgroundColor: '#F87A0D',
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

export default purpose;
