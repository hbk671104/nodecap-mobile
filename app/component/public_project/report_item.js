import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import Touchable from 'component/uikit/touchable';

const reportItem = ({ data, onPress }) => (
  <Touchable onPress={onPress}>
    <View style={styles.container}>
      <Text style={styles.title}>多重机制仍难保证DAG的稳定性</Text>
      <View style={styles.content.container}>
        <Text style={styles.content.text}>#火币研究院</Text>
        <Text style={styles.content.text}>08-10</Text>
      </View>
    </View>
  </Touchable>
);

const styles = {
  container: {
    padding: 12,
  },
  title: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
  },
  content: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    text: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
    },
  },
};

reportItem.propTypes = {
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

reportItem.defaultProps = {
  onPress: () => null,
};

export default reportItem;
