import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const group = ({ title, children }) => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
    {children}
  </View>
);

const styles = {
  container: {
    marginBottom: 20,
  },
  titleContainer: {
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
  },
};

group.propTypes = {
  title: PropTypes.string.isRequired,
};

export default group;
