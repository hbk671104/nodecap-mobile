import React, { Component } from 'react';
import { View, Text } from 'react-native';

import NavBar from 'component/navBar';
import Developing from 'component/developing';
import styles from './style';

class Management extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavBar gradient title="资产管理" />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Developing />
        </View>
      </View>
    );
  }
}

export default Management;
