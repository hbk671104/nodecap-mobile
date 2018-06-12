import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import styles from './style';

const projectItem = ({ item }) => (
  <View style={styles.container}>
    <View style={styles.top.container}>
      <View style={styles.top.group}>
        <View style={styles.top.logo.container}>
          <Image style={styles.top.logo.image} />
        </View>
        <Text style={styles.top.title}>Aelf (ELF)</Text>
      </View>
      <Text>哈哈</Text>
    </View>
    <View style={styles.middle.container}>
      <Text>市价/涨跌幅</Text>
      <Text>市价/涨跌幅</Text>
    </View>
    <View style={styles.bottom.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>浮动盈亏</Text>
        <Text>3.4亿元</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>投资金额</Text>
        <Text>720万元</Text>
      </View>
    </View>
  </View>
);

projectItem.propTypes = {
  item: PropTypes.object,
};

export default projectItem;
