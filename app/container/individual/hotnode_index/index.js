import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import NavBar from 'component/navBar';
import styles from './style';

class HotnodeIndex extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <NavBar gradient title="Hotnode 指数" />
      </View>
    );
  }
}

export default HotnodeIndex;
