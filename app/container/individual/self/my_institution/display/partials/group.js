import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import Touchable from 'component/uikit/touchable';

const group = ({ title, children, onEditPress }) => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
      <Touchable borderless onPress={onEditPress}>
        <Text style={styles.edit}>编辑</Text>
      </Touchable>
    </View>
    {children}
  </View>
);

const styles = {
  container: {
    paddingTop: 15,
    paddingBottom: 5,
    paddingHorizontal: 12,
  },
  titleContainer: {
    // marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
  },
  edit: {
    fontSize: 12,
    color: '#6C98C0',
  },
};

group.propTypes = {
  title: PropTypes.string.isRequired,
};

export default group;
