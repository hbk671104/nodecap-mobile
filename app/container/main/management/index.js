import React, { Component } from 'react';
import { View, Text } from 'react-native';

import NavBar from 'component/navBar';
import styles from './style';

class Management extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavBar gradient renderTitle={() => <Text style={styles.navBar.title}>资产管理</Text>} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>敬请期待</Text>
        </View>
      </View>
    );
  }
}

export default Management;
