import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ViewPropTypes, Image } from 'react-native';
import { Flex } from 'antd-mobile';
import Accounting from 'accounting';

import Touchable from 'component/uikit/touchable';
import { SolidAvatar } from 'component/uikit/avatar';

const iconMap = {
  twitter: require('asset/social_network/twiter.png'),
  telegram: require('asset/social_network/telegram.png'),
  reddit: require('asset/social_network/reddit.png'),
  github: require('asset/social_network/github.png'),
  medium: require('asset/social_network/medium-2.png'),
  youtube: require('asset/social_network/youtube.png'),
  facebook: require('asset/social_network/facebook.png'),
};
const item = ({ style, name, fans_count, onPress }) => {
  const icon = iconMap[name.toLowerCase()];
  if (!icon) {
    return null;
  }
  const fansCount = fans_count ? (
    <View>
      <Text style={styles.content.fansCount}>
        {Accounting.formatNumber(fans_count)}
      </Text>
      <Text style={styles.content.fansLabel}>成员数</Text>
    </View>
  ) : null;
  return (
    <Touchable foreground onPress={onPress}>
      <Flex align="center" justify="around" style={[styles.container, style]}>
        <Image
          source={icon}
          style={{ width: 25, height: 25, resizeMode: 'contain' }}
        />
        <View style={styles.content.container}>
          <Text style={styles.content.title}>{name}</Text>
          {fansCount}
        </View>
      </Flex>
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
    borderWidth: 0.5,
    borderColor: '#e9e9e9',
    padding: 10,
    height: itemHeight,
    marginRight: 10,
    borderRadius: 2,
  },
  content: {
    container: {
      // width: 0,
      marginLeft: 15,
    },
    title: { fontSize: 11, color: 'rgba(0,0,0,0.85)', letterSpacing: 0.13 },
    fansCount: {
      fontSize: 11,
      color: '#1890FF',
      letterSpacing: 0.13,
      marginTop: 5,
    },
    fansLabel: { fontSize: 10, color: 'rgba(0,0,0,0.45)', letterSpacing: 0.12 },
  },
};
export { iconMap };
export default item;
