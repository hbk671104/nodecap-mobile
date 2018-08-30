import React, { Component } from 'react';
import { View } from 'react-native';

import NavBar from 'component/navBar';

import styles from './style';

export default class NotificationCenter extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavBar gradient title="项目动态" />
      </View>
    );
  }
}
