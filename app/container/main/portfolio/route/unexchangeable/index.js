import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import styles from './style';

export default class Unexchangeable extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text>噢哈哈哈哈哈哈</Text>
          <Text>噢哈哈哈哈哈哈</Text>
          <Text>噢哈哈哈哈哈哈</Text>
        </ScrollView>
      </View>
    );
  }
}
