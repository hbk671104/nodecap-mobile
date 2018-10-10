import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import R from 'ramda';

import Avatar from 'component/uikit/avatar';

const group = ({ data }) => {
  const name = R.pathOr('--', ['name'])(data);
  const title = R.pathOr('--', ['title'])(data);
  const desc = R.pathOr('--', ['description'])(data);
  const avatar_url = R.pathOr('', ['avatar_url'])(data);
  return (
    <View style={styles.container}>
      <Avatar source={{ uri: avatar_url }} />
      <View style={styles.content.container}>
        <Text style={styles.content.title}>{name}</Text>
        <Text style={styles.content.content}>{desc}</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  content: {
    container: {
      flex: 1,
      marginLeft: 18,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    subtitle: {
      marginTop: 8,
      fontSize: 13,
      color: 'rgba(0, 0, 0, 0.65)',
    },
    content: {
      marginTop: 8,
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.65)',
      lineHeight: 18,
    },
  },
};

group.propTypes = {
  data: PropTypes.object.isRequired,
};

export default group;
