import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import moment from 'moment';

import Touchable from 'component/uikit/touchable';

const reportItem = ({ data, onPress, institution }) => (
  <Touchable onPress={() => onPress(data)}>
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.content.container}>
        <Text style={styles.content.text}>#{institution.name}</Text>
        <Text style={styles.content.text}>{data.published_at ? moment(data.published_at).format('MM-DD') : ''}</Text>
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
