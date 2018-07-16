import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import Touchable from 'component/uikit/touchable';

import KeyItem from './item';
import styles from './style';

class KeyManagement extends Component {
  renderNavBarRight = () => (
    <View style={styles.navBar.right.container}>
      <Touchable>
        <Text style={styles.navBar.right.text}>更新</Text>
      </Touchable>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header.container}>
      <Image source={require('asset/management/light_bulb.png')} />
      <View style={styles.header.title.container}>
        <Text style={styles.header.title.text}>
          我们在打开 APP 期间每5分钟同步一次 API Key
        </Text>
      </View>
    </View>
  );

  renderItem = ({ item }) => <KeyItem />;

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          back
          gradient
          title="Key 管家"
          renderRight={this.renderNavBarRight}
        />
        <List
          contentContainerStyle={styles.list.contentContainer}
          // action={this.requestData}
          data={[{ id: 1 }, { id: 2 }]}
          // pagination={pagination}
          // loading={loading}
          renderItem={this.renderItem}
          renderHeader={this.renderHeader}
          renderSeparator={this.renderSeparator}
          // renderHeader={this.renderHeader}
        />
      </View>
    );
  }
}

export default KeyManagement;
