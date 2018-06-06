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
        <Text style={styles.top.title}>Aelf</Text>
      </View>
      <Text>哈哈</Text>
    </View>
    <View style={styles.middle.container}>
      <Text>哈哈</Text>
    </View>
    <View style={styles.bottom.container}>
      <Text>哈哈</Text>
    </View>
  </View>
);

projectItem.propTypes = {
  item: PropTypes.object,
};

export default projectItem;
