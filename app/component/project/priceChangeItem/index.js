import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import Touchable from 'component/uikit/touchable';
import styles from './style';

const priceChangeItem = ({ item }) => (
  <Touchable style={styles.container}>
    <View style={styles.wrapper}>
      <View style={styles.left.container}>
        <View style={styles.left.group}>
          <View style={styles.left.logo.container}>
            <Image style={styles.left.logo.image} />
          </View>
          <View style={styles.left.title.container}>
            <Text style={styles.left.title.text}>Aelf</Text>
            <Text style={styles.left.subtitle}>(ELF)</Text>
          </View>
        </View>
      </View>
      <View style={styles.middle.container}>
        <Text style={styles.middle.title}>¥4.3274747</Text>
        <Text style={styles.middle.label}>
          成本{'  '}
          <Text style={styles.middle.content}>0.92</Text>
        </Text>
        <Text style={styles.middle.roi}>3.52倍</Text>
      </View>
      <View style={styles.right.container}>
        <View style={styles.right.wrapper}>
          <Text style={styles.right.title}>+162%</Text>
        </View>
      </View>
      <View style={styles.ranking.container}>
        <Text style={styles.ranking.label}>#1</Text>
      </View>
    </View>
  </Touchable>
);

priceChangeItem.propTypes = {
  item: PropTypes.object,
};

export default priceChangeItem;
