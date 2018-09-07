import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';
import Icon from 'component/uikit/icon';

const searchItem = ({ item, onPress }) => (
  <Touchable foreground onPress={onPress}>
    <View style={styles.container}>
      <Avatar size={40} source={{ uri: item.icon }} />
      <Text style={styles.title} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.subtitle}>
        快速匹配
        {'   '}
        <Icon name="arrow-forward" size={12} />
      </Text>
    </View>
  </Touchable>
);

const styles = {
  container: {
    height: 60,
    paddingLeft: 22,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
    marginLeft: 16,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.45)',
    marginLeft: 12,
  },
};

searchItem.defaultProps = {
  onPress: () => null,
};

searchItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
};

export default searchItem;
