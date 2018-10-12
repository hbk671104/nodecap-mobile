import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ViewPropTypes } from 'react-native';

import Touchable from 'component/uikit/touchable';
import { SolidAvatar } from 'component/uikit/avatar';

const iconMap = {
  twitter: require('asset/social_network/twiter.png'),
  telegram: require('asset/social_network/telegram.png'),
  reddit: require('asset/social_network/reddit.png'),
  github: require('asset/social_network/github.png'),
  medium: require('asset/social_network/medium-2.png'),
  youtube: require('asset/social_network/youtube.png'),
};
const item = ({ style, name, onPress }) => {
  const icon = iconMap[name.toLowerCase()];
  if (!icon) {
    return null;
  }
  return (
    <Touchable foreground onPress={onPress}>
      <View style={[styles.container, style]}>
        <SolidAvatar size={40} innerRatio={2 / 5} source={icon} />
        <View style={styles.content.container}>
          <Text style={styles.content.title}>{name}</Text>
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

export const itemHeight = 66;
const styles = {
  container: {
    justifyContent: 'center',
    marginRight: 17,
  },
  content: {
    container: {
      flex: 1,
    },
    title: {
      marginTop: 5,
      fontSize: 10,
      color: 'rgba(0, 0, 0, 0.65)',
      textAlign: 'center',
    },
  },
};

export default item;
