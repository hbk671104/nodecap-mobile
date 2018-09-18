import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';

import Avatar from 'component/uikit/avatar';
import Touchable from 'component/uikit/touchable';

const favoredItem = ({ data, onPress, onFavorPress }) => (
  <Touchable foreground onPress={onPress}>
    <View style={styles.container}>
      <Avatar size={45} />
      <View style={styles.content.container}>
        <View>
          <Text style={styles.content.title}>Scry.info</Text>
        </View>
        <Text style={styles.content.subtitle}>
          基于真实数据的区块链开源协议
        </Text>
      </View>
      <View style={styles.end.container}>
        <Text style={styles.end.status}>进行中</Text>
        <Touchable
          foreground
          style={styles.end.favor.container}
          onPress={onFavorPress}
        >
          <Text style={styles.end.favor.number}>
            <Image source={require('asset/favored/favored_star.png')} /> 1273
          </Text>
        </Touchable>
      </View>
    </View>
  </Touchable>
);

const styles = {
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 10,
  },
  content: {
    container: {
      flex: 1,
      marginLeft: 20,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    subtitle: {
      marginTop: 8,
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
    },
  },
  end: {
    container: {
      alignItems: 'flex-end',
    },
    status: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    favor: {
      container: {
        marginTop: 8,
        height: 23,
        width: 60,
        borderRadius: 2,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
      },
      number: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.65)',
      },
    },
  },
};

favoredItem.propType = {
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  onFavorPress: PropTypes.func,
};

favoredItem.defaultProps = {
  onPress: () => null,
  onFavorPress: () => null,
};

export default favoredItem;
