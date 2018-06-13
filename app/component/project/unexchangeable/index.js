import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import Touchable from 'component/uikit/touchable';
import styles from './style';

const unexchangeableItem = ({ item }) => (
  <Touchable style={styles.container}>
    <View>
      <View style={styles.top.container}>
        <View style={styles.top.group}>
          <View style={styles.top.logo.container}>
            <Image style={styles.top.logo.image} />
          </View>
          <View style={styles.top.title.container}>
            <Text style={styles.top.title.text}>
              Aelf <Text style={{ fontSize: 13 }}>(ELF)</Text>
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.top.status.container}>
            <View style={styles.top.status.dot.container} />
            <Text style={styles.top.status.text}>确定意向</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom.container}>
        <View>
          <Text style={styles.bottom.content}>项目来源：likeyao</Text>
          <Text style={[styles.bottom.content, { marginTop: 7 }]}>跟进人：王明远</Text>
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <Text style={styles.bottom.content}>2018年7月12日 录入</Text>
        </View>
      </View>
    </View>
  </Touchable>
);

unexchangeableItem.propTypes = {
  item: PropTypes.object,
};

export default unexchangeableItem;
