import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ViewPropTypes } from 'react-native';
import { shadow } from '../../../../../../../utils/style';

const roi = ({ style, data }) => (
  <View style={[styles.container, style]}>
    <View style={styles.group.container}>
      <View style={styles.group.inner}>
        <Text style={styles.title}>ETH</Text>
        <Text style={styles.subtitle}>424%</Text>
      </View>
    </View>
    <View style={styles.group.container}>
      <View style={styles.group.inner}>
        <Text style={styles.title}>BTC</Text>
        <Text style={styles.subtitle}>424%</Text>
      </View>
    </View>
    <View style={styles.group.container}>
      <View style={styles.group.inner}>
        <Text style={styles.title}>CNY</Text>
        <Text style={styles.subtitle}>424%</Text>
      </View>
    </View>
    <View style={styles.group.container}>
      <View style={styles.group.inner}>
        <Text style={styles.title}>USD</Text>
        <Text style={styles.subtitle}>424%</Text>
      </View>
    </View>
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
    fontSize: 14,
    marginTop: 6,
  },
};

export default roi;
