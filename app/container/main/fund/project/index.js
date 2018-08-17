import React, { Component } from 'react';
import { View } from 'react-native';

import NavBar from 'component/navBar';
import styles from './style';

class FundProject extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavBar back gradient title="项目清单" />
      </View>
    );
  }
}

export default FundProject;
