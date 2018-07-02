import React, { Component } from 'react';
import { View, Text } from 'react-native';

import NavBar from 'component/navBar';
import Developing from 'component/developing';
import styles from './style';

class Self extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavBar gradient renderTitle={() => <Text style={styles.navBar.title}>我的机构</Text>} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Developing />
        </View>
      </View>
    );
  }
}

export default Self;
