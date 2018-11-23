import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';

const item = ({ style, data, onPress }) => {
  const title = R.pathOr('--', ['name'])(data);
  const logo_url = R.pathOr('', ['logo_url'])(data);
  return (
    <Touchable foreground onPress={onPress}>
      <View style={[styles.container, style]}>
        <Avatar
          size={40}
          style={{ borderRadius: 0 }}
          innerRatio={1}
          imageStyle={styles.avatar}
          raised={false}
          source={{ uri: logo_url }}
        />
        <View style={styles.content.container}>
          <Text style={styles.content.title}>{title}</Text>
        </View>
      </View>
    </Touchable>
  );
};

item.propTypes = {
  style: ViewPropTypes.style,
  disableSubtitle: PropTypes.bool,
};

item.defaultProps = {
  disableSubtitle: false,
};

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginBottom: 12,
  },
  avatar: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 1,
    borderColor: '#DDDDDD',
  },
  content: {
    container: {
      flex: 1,
    },
    title: {
      marginTop: 5,
      fontSize: 10,
      color: 'rgba(0, 0, 0, 0.65)',
    },
  },
};

export default item;
