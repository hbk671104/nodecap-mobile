import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import R from 'ramda';

import Avatar from 'component/uikit/avatar';

const memberItem = ({ data }) => {
  const profile_pic = R.pathOr('', ['profile_pic'])(data);
  const name = R.pathOr('--', ['name'])(data);
  const title = R.pathOr('--', ['title'])(data);
  return (
    <View style={styles.container}>
      <Avatar
        source={{ uri: profile_pic }}
        raised={false}
        size={40}
        innerRatio={1}
      />
      <View style={styles.content.container}>
        <Text style={styles.content.title}>{R.trim(name)}</Text>
        <Text style={styles.content.subtitle}>{R.trim(title)}</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  content: {
    container: {
      flex: 1,
      marginLeft: 15,
    },
    title: {
      color: 'rgba(0, 0, 0, 0.85)',
      fontSize: 14,
      fontWeight: 'bold',
    },
    subtitle: {
      marginTop: 6,
      color: 'rgba(0, 0, 0, 0.65)',
      fontSize: 12,
    },
  },
};

memberItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default memberItem;