import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const loading = props => (
  <View style={[styles.container, props.style]}>
    <ActivityIndicator {...props} />
  </View>
);

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default loading;
