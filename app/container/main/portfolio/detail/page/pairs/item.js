import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const pairItem = ({ data }) => (
  <View style={styles.container}>
    <View style={styles.left.container}>
      <Text>haha1</Text>
    </View>
    <View style={styles.middle.container}>
      <Text>haha1</Text>
    </View>
    <View style={styles.right.container}>
      <Text>haha1</Text>
    </View>
  </View>
);

const styles = {
  container: {
    height: 53,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    container: {
      flex: 3,
    },
  },
  middle: {
    container: {
      flex: 3,
    },
  },
  right: {
    container: {
      flex: 2,
    },
  },
};

pairItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default pairItem;
