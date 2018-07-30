import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import Accounting from 'accounting';

import Touchable from 'component/uikit/touchable';

const listItem = ({ item, onPress }) => (
  <Touchable onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.left.container}>
        <Image style={styles.left.avatar} />
        <View style={styles.left.group}>
          <Text style={styles.left.title}>{item.name}</Text>
          <Text style={styles.left.source}>钱包导入</Text>
        </View>
      </View>
      <View style={styles.middle.container}>
        <Text style={styles.middle.title} disablePrefix>
          {Accounting.formatNumber(item.holding.CNY)}
        </Text>
        <Text style={styles.middle.subtitle}>
          {Accounting.formatNumber(item.holding.base)} {item.name}
        </Text>
      </View>
      <View style={styles.right.container}>
        <Text style={styles.right.price}>
          {Accounting.formatNumber(item.price, 1)}
        </Text>
        <Text style={styles.right.change}>
          <Text>{Accounting.formatNumber(item.change, 2)}</Text>
          %
        </Text>
      </View>
    </View>
  </Touchable>
);

listItem.defaultProps = {
  onPress: () => null,
};

listItem.propTypes = {
  onPress: PropTypes.func,
  item: PropTypes.object.isRequired,
};

const styles = {
  container: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 140,
      paddingLeft: 12,
    },
    avatar: {
      height: 20,
      width: 20,
    },
    group: {
      marginLeft: 12,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    source: {
      fontSize: 10,
      color: 'rgba(0, 0, 0, 0.45)',
      marginTop: 4,
    },
  },
  middle: {
    container: {
      flex: 1,
    },
    title: {
      color: 'rgba(0, 0, 0, 0.85)',
      fontSize: 14,
      fontWeight: 'bold',
    },
    subtitle: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 11,
      marginTop: 4,
    },
  },
  right: {
    container: {
      width: 80,
    },
    price: {
      color: '#FF3C00',
      fontSize: 14,
      fontWeight: 'bold',
    },
    change: {
      color: '#FF3C00',
      fontSize: 12,
      marginTop: 4,
    },
  },
};

export default listItem;
