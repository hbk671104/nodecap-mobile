import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import Touchable from 'component/uikit/touchable';

const group = ({ title, children, onEditPress }) => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
      <Touchable borderless onPress={onEditPress}>
        <Text style={{ fontSize: 12, color: '#6C98C0' }}>编辑</Text>
      </Touchable>
    </View>
    {children}
  </View>
);

const styles = {
  container: {
    marginBottom: 20,
  },
  titleContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
