import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import Icon from 'component/uikit/icon';
import Touchable from 'component/uikit/touchable';
import Badge from 'component/uikit/badge';

const StaticItem = ({ icon, title, subtitle, badge, onPress, loading, renderRight }) => (
  <Touchable foreground onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.top}>
        <Image resizeMode="contain" style={styles.icon} source={icon} />
        <View style={styles.group}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {renderRight}
      </View>
    </View>
  </Touchable>
);

const item = ({ icon, title, subtitle, badge, onPress, loading }) => (
  <Touchable foreground onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.top}>
        <Image resizeMode="contain" style={styles.icon} source={icon} />
        <View style={styles.group}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.badge.container}>
          {loading ? <ActivityIndicator /> : <Badge value={badge} />}
        </View>
        <Icon name="arrow-forward" size={16} color="rgba(0, 0, 0, 0.25)" />
      </View>
      {!!subtitle && (
        <View style={styles.bottom}>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      )}
    </View>
  </Touchable>
);

const styles = {
  container: {
    minHeight: 50,
    paddingLeft: 12,
    paddingRight: 24,
    justifyContent: 'center',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom: {
    paddingLeft: 18 + 15,
    marginTop: 4,
  },
  icon: {
    height: 18,
    width: 18,
  },
  title: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.85)',
  },
  subtitle: {
    fontSize: 11,
    color: 'rgba(0, 0, 0, 0.45)',
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
  subtitle: PropTypes.string,
  badge: PropTypes.number,
  onPress: PropTypes.func,
};

export default item;
export {
  StaticItem,
};
