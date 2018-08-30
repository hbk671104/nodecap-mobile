import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import Avatar from 'component/uikit/avatar';

const notificationItem = props => (
  <View style={styles.container}>
    <Avatar />
  </View>
);

const styles = {
  container: {
    padding: 12,
    flexDirection: 'row',
  },
};

notificationItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default notificationItem;
