import React, { Component } from 'react';
import { View, Image } from 'react-native';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import Header from './header';
import styles from './style';

class Management extends Component {
  renderNavBarRight = () => (
    <View style={styles.navBar.right.container}>
      <Touchable style={{ marginRight: 12 }}>
        <Image
          resizeMode="contain"
          style={styles.navBar.right.item}
          source={require('asset/management/key.png')}
        />
      </Touchable>
      <Touchable>
        <Image
          resizeMode="contain"
          style={styles.navBar.right.item}
          source={require('asset/management/plus.png')}
        />
      </Touchable>
    </View>
  );

  renderHeader = () => <Header />;

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          gradient
          title="资产管理"
          renderRight={this.renderNavBarRight}
          renderBottom={this.renderHeader}
        />
      </View>
    );
  }
}

export default Management;
