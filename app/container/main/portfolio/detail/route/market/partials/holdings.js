import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ViewPropTypes, StyleSheet } from 'react-native';
import * as R from 'ramda';
import Accounting from 'accounting';

const icon = k => {
  switch (k) {
    case 'BTC':
      return require('asset/crypto/BTC.png');
    case 'ETH':
      return require('asset/crypto/ETH.png');
    case 'USDT':
    case 'USD':
      return require('asset/crypto/USD.png');
    case 'CNY':
      return require('asset/crypto/CNY.png');
    default:
      return null;
  }
};

const holdings = ({ style, data }) => (
  <View style={[styles.container, style]}>
    {R.keys(data)
      .filter(c => c !== 'USDT')
      .map((k, i) => {
        const count = data[k];
        return (
          <View
            key={k}
            style={[styles.group.container, i === 0 && { borderTopWidth: 0 }]}
          >
            <View style={styles.group.title.container}>
              <Image source={icon(k)} />
              <Text style={styles.group.title.text}>{k}</Text>
            </View>
            <Text style={styles.group.content}>
              {Accounting.formatNumber(count)}
            </Text>
          </View>
        );
      })}
  </View>
);

holdings.propTypes = {
  style: ViewPropTypes.style,
  data: PropTypes.object,
};

const styles = {
  container: {
    marginTop: 10,
  },
  group: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#E9E9E9',
    },
    title: {
      container: {
        flexDirection: 'row',
      },
      text: {
        fontSize: 13,
        color: '#333333',
        marginLeft: 10,
      },
    },
    content: {
      fontSize: 14,
      color: '#333333',
      fontWeight: 'bold',
    },
  },
};

export default holdings;
