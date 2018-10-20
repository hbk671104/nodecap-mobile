import React from 'react';
import { View } from 'react-native';
import R from 'ramda';

const progressBar = ({ index, route }) => {
  const progressed = index + 1;
  const unprogressed = R.length(route) - progressed;
  return (
    <View style={styles.container}>
      <View style={[styles.progressed, { flex: progressed }]} />
      <View style={[styles.unprogressed, { flex: unprogressed }]} />
    </View>
  );
};

const styles = {
  container: {
    height: 2.5,
    flexDirection: 'row',
  },
  progressed: {
    backgroundColor: '#007EF2',
  },
  unprogressed: {
    backgroundColor: '#B8DDFF',
  },
};

export default progressBar;
