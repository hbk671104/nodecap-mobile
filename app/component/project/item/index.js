import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import Touchable from 'component/uikit/touchable';
import styles from './style';

const projectItem = ({ item }) => (
  <Touchable style={styles.container}>
    <View>
      <View style={styles.top.container}>
        <View style={styles.top.group}>
          <View style={styles.top.logo.container}>
            <Image style={styles.top.logo.image} />
          </View>
          <Text style={styles.top.title}>
            Aelf <Text style={styles.top.subtitle}>(ELF)</Text>
          </Text>
        </View>
        <Text style={styles.top.ranking}>#1</Text>
      </View>
      <View style={styles.middle.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.middle.title}>浮动盈余</Text>
          <Text style={[styles.middle.content, { fontSize: 24 }, styles.middle.up]}>
            +好多好多钱
          </Text>
        </View>
        <View style={{ paddingRight: 34 }}>
          <Text style={styles.middle.title}>回报率</Text>
          <Text style={[styles.middle.content, { fontSize: 18 }, styles.middle.up]}>+500%</Text>
        </View>
      </View>
      <View style={styles.bottom.container}>
        <View style={styles.bottom.group}>
          <Text style={styles.bottom.title}>投资金额</Text>
          <Text style={styles.bottom.content}>3.4亿元</Text>
        </View>
        <View style={styles.bottom.group}>
          <Text style={styles.bottom.title}>成本价/市价</Text>
          <Text style={styles.bottom.content}>0.92 / 4.23</Text>
          <View style={[styles.bottom.label.container, styles.bottom.label.up]}>
            <Text style={styles.bottom.label.title}>4.61倍</Text>
          </View>
        </View>
      </View>
    </View>
  </Touchable>
);

projectItem.propTypes = {
  item: PropTypes.any,
};

export default projectItem;
