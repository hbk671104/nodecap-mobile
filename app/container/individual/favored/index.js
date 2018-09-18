import React, { Component } from 'react';
import { View, Text } from 'react-native';

import NavBar from 'component/navBar';
import styles from './style';

class Favored extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavBar gradient title="关注" />
      </View>
    );
  }
}

export default Favored;
