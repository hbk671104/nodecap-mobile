import React, { Component } from 'react';
import { View, Text } from 'react-native';

import NavBar from 'component/navBar';
import Header from './header';
import styles from './style';

class Self extends Component {
  renderNavBar = () => (
    <NavBar
      gradient
      renderTitle={() => <Text style={styles.navBar.title}>我的</Text>}
      renderBottom={() => <View style={styles.navBar.bottom} />}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <Header style={styles.header} />
      </View>
    );
  }
}

export default Self;
