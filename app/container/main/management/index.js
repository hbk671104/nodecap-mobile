import React, { Component } from 'react';
import { View, Image } from 'react-native';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import Touchable from 'component/uikit/touchable';

import ListItem from './listItem';
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

  renderItem = ({ item }) => <ListItem />;

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          gradient
          title="资产管理"
          renderRight={this.renderNavBarRight}
          renderBottom={this.renderHeader}
        />
        <List
          // action={this.requestData}
          data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
          // pagination={pagination}
          // loading={loading}
          renderItem={this.renderItem}
          // renderHeader={this.renderHeader}
          // onScroll={this.props.onScroll}
          scrollEventThrottle={500}
        />
      </View>
    );
  }
}

export default Management;
