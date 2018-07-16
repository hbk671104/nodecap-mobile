import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';

import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';

const keyItem = ({ onPress }) => (
  <Touchable onPress={onPress}>
    <View style={styles.container}>
      <Image style={styles.avatar} />
      <View style={styles.content.container}>
        <Text style={styles.content.title}>Huobi.prop</Text>
        <Text style={styles.content.time}>
          上次同步时间：2018/06/14 10:43:20
        </Text>
      </View>
      <Icon name="arrow-forward" color="rgba(0, 0, 0, 0.25)" size={20} />
    </View>
  </Touchable>
);

keyItem.defaultProps = {
  onPress: () => null,
};

keyItem.propTypes = {
  onPress: PropTypes.func,
};

const styles = {
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  avatar: {
    width: 25,
    height: 25,
  },
  content: {
    container: {
      flex: 1,
    },
    title: {
      color: 'rgba(0, 0, 0, 0.85)',
      fontSize: 14,
      fontWeight: 'bold',
    },
    time: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 11,
      marginTop: 7,
    },
  },
};

export default keyItem;
