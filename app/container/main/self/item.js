import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import Icon from 'component/uikit/icon';
import Touchable from 'component/uikit/touchable';
import Badge from 'component/uikit/badge';

const item = ({ icon, title, badge, onPress }) => (
  <Touchable foreground onPress={onPress}>
    <View style={styles.container}>
      <Image resizeMode="contain" style={styles.icon} source={icon} />
      <View style={styles.group}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.badge.container}>
        <Badge value={badge} />
      </View>
      <Icon name="arrow-forward" size={16} color="rgba(0, 0, 0, 0.25)" />
    </View>
  </Touchable>
);

const styles = {
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 24,
  },
  icon: {
    height: 18,
    width: 18,
  },
  title: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.85)',
  },
  group: {
    flex: 1,
    marginLeft: 15,
  },
  badge: {
    container: {
      marginRight: 15,
    },
  },
};

item.defaultProps = {
  onPress: () => null,
};

item.propTypes = {
  icon: PropTypes.number,
  title: PropTypes.string.isRequired,
  badge: PropTypes.number,
  onPress: PropTypes.func,
};

export default item;
