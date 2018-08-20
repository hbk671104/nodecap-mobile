import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';

const item = ({ data, onPress }) => (
  <Touchable onPress={onPress}>
    <View style={styles.container}>
      <Avatar source={{ uri: 'https://placehold.it/80x80' }} size={37} />
      <View style={styles.content.container}>
        <Text style={styles.content.title}>
          Aelf
          {'  '}
          <Text style={styles.content.subtitle}>(ELF)</Text>
        </Text>
      </View>
    </View>
  </Touchable>
);

const styles = {
  container: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    container: {
      marginLeft: 8,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'rgba(0, 0, 0, 0.85)',
    },
    subtitle: {
      fontWeight: 'bold',
      fontSize: 13,
      color: 'rgba(0, 0, 0, 0.65)',
    },
  },
};

item.propTypes = {
  data: PropTypes.object,
  onPress: PropTypes.func,
};

export default item;
