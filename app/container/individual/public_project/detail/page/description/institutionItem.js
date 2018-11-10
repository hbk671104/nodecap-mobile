import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ViewPropTypes } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import { SolidAvatar } from 'component/uikit/avatar';

const item = ({ style, data, onPress }) => {
  const title = R.pathOr('--', ['name'])(data);
  const logo_url = R.pathOr('', ['logo_url'])(data);
  return (
    <Touchable foreground onPress={onPress}>
      <View style={[styles.container, style]}>
        <SolidAvatar source={{ uri: logo_url }} />
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
    marginRight: 20,
    marginBottom: 12,
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
