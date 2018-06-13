import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import Touchable from 'component/uikit/touchable';
import styles from './style';

const investmentItem = ({ item }) => (
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
        <Text style={styles.middle.label}>投资金额</Text>
        <Text style={[styles.middle.title, { marginTop: 2 }]}>¥736,283,724</Text>
        <Text style={[styles.middle.label, { marginTop: 3 }]}>
          +2,384,792<Text>{'  '}浮动盈余</Text>
        </Text>
      </View>
      <View style={styles.ranking.container}>
        <Text style={styles.ranking.label}>#1</Text>
      </View>
    </View>
  </Touchable>
);

investmentItem.propTypes = {
  item: PropTypes.object,
};

export default investmentItem;
