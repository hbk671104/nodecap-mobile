import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ViewPropTypes } from 'react-native';
import * as R from 'ramda';
import Format from 'component/format';
import { shadow } from '../../../../../../utils/style';

const icon = k => {
  switch (k) {
    case 'BTC':
      return require('asset/crypto/transparent/BTC.png');
    case 'ETH':
      return require('asset/crypto/transparent/ETH.png');
    case 'USDT':
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
    {R.keys(data)
      .filter(c => c !== 'USDT')
      .map((k, i) => {
        const item = data[k];
        return (
          <View
            key={k}
            style={[styles.group.container, i === 0 && { marginLeft: 0 }]}
          >
            <View style={styles.group.inner}>
              <View style={styles.image.container}>
                <Image source={icon(k)} />
              </View>
              <Text style={styles.title}>{k}</Text>
              <Text style={styles.subtitle}>
                <Format>{item.value}</Format>
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
      // padding: 5,
      marginLeft: 10,
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
    fontSize: 16,
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
