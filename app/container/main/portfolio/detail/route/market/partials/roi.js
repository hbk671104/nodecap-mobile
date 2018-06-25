import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ViewPropTypes } from 'react-native';
import * as R from 'ramda';
import { shadow } from '../../../../../../../utils/style';

const icon = (k) => {
  switch (k) {
    case 'BTC':
      return require('asset/crypto/transparent/BTC.png');
    case 'ETH':
      return require('asset/crypto/transparent/ETH.png');
    case 'USD':
      return require('asset/crypto/transparent/USD.png');
    case 'CNY':
      return require('asset/crypto/transparent/CNY.png');
    default:
      return null;
  }
};

const roi = ({ style, data }) => (
  <View style={[styles.container, style]}>
    {R.keys(data).map((k) => {
      const item = data[k];
      return (
        <View key={k} style={styles.group.container}>
          <View style={styles.group.inner}>
            <View style={styles.image.container}>
              <Image source={icon(k)} />
            </View>
            <Text style={styles.title}>{k}</Text>
            <Text style={styles.subtitle}>
              {item.count.toFixed(0)}
              <Text style={{ fontSize: 12 }}>%</Text>
            </Text>
          </View>
        </View>
      );
    })}
  </View>
);

roi.propTypes = {
  style: ViewPropTypes.style,
  data: PropTypes.object,
};

const styles = {
  container: {
    flexDirection: 'row',
    marginTop: 15,
  },
  group: {
    container: {
      flex: 1,
      padding: 5,
    },
    inner: {
      ...shadow,
      borderRadius: 4,
      height: 65,
      backgroundColor: 'white',
      justifyContent: 'center',
      paddingLeft: 6,
    },
  },
  title: {
    color: '#666666',
    fontSize: 12,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#1890FF',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 6,
  },
  image: {
    container: {
      position: 'absolute',
      bottom: 0,
      right: 6,
    },
  },
};

export default roi;
