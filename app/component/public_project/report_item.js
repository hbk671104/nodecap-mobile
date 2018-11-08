import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import moment from 'moment';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';

const reportItem = ({ data, onPress, isRead }) => {
  const title = R.pathOr('--', ['title'])(data);
  const date = R.pathOr('--', ['published_at'])(data);
  const institution = R.pathOr('--', ['industry', 'name'])(data);
  const institution_url = R.pathOr('--', ['industry', 'logo_url'])(data);
  return (
    <Touchable onPress={() => onPress(data)}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, isRead ? styles.isReadTitle : {}]}>{title}</Text>
        </View>
        <View style={styles.content.container}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image style={styles.icon} source={{ uri: institution_url }} />
            <Text style={styles.content.text}>{institution}</Text>
          </View>
          <Text style={styles.content.text}>
            {moment(date).format('MM-DD')}
          </Text>
        </View>
      </View>
    </Touchable>
  );
};

const styles = {
  container: {
    padding: 12,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
  },
  isReadTitle: {
    color: 'rgba(0, 0, 0, 0.45)',
  },
  content: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 12,
    },
    text: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
    },
  },
  icon: {
    height: 15,
    width: 15,
    marginRight: 8,
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
