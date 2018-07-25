import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import R from 'ramda';

import Avatar from 'component/uikit/avatar';
import { shadow } from '../../../../../utils/style';

const header = ({ item }) => (
  <View style={styles.container}>
    <Avatar size={60} source={{ uri: item.icon }} />
    <View style={styles.content.container}>
      <Text style={styles.content.title}>{item.name}</Text>
      <View style={styles.content.subtitle.container}>
        <Text style={styles.content.subtitle.text}>
          Token:{' '}
          <Text style={styles.content.subtitle.highlight}>
            {R.toUpper(item.symbol)}
          </Text>
        </Text>
      </View>
    </View>
  </View>
);

const styles = {
  container: {
    height: 90,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    ...shadow,
  },
  content: {
    container: {
      flex: 1,
      marginLeft: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#1890FF',
    },
    subtitle: {
      container: {
        marginTop: 7,
      },
      text: {
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.45)',
      },
      highlight: {
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.65)',
        fontWeight: 'bold',
      },
    },
  },
};

header.propTypes = {
  item: PropTypes.object,
};

export default header;
