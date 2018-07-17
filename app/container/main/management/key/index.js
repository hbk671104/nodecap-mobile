import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { connectActionSheet } from '@expo/react-native-action-sheet';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import Touchable from 'component/uikit/touchable';
import ListItem from 'component/listItem';

import { getKeychain } from '../../../../utils/keychain';
import styles from './style';

@connectActionSheet
class KeyManagement extends Component {
  requestKeychain = () => {
    getKeychain();
  };

  handleItemPress = () => {
    this.props.showActionSheetWithOptions(
      {
        options: ['查看 API Key', '重置', '删除', '取消'],
        cancelButtonIndex: 3,
        destructiveButtonIndex: 2,
      },
      buttonIndex => {
        // Do something here depending on the button index selected
      },
    );
  };

  renderNavBarRight = () => (
    <View style={styles.navBar.right.container}>
      <Touchable borderless>
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

  renderItem = ({ item, index }) => (
    <ListItem
      style={styles.item.container}
      noBottomBorder
      icon={require('asset/management/exchange/huobi.png')}
      title={`${index}`}
      titleStyle={styles.item.title}
      subtitle="上次同步时间：2018/06/14 10:43:20"
      onPress={this.handleItemPress}
    />
  );

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
          action={this.requestKeychain}
          data={[{ id: 1 }, { id: 2 }]}
          // loading={loading}
          renderItem={this.renderItem}
          renderHeader={this.renderHeader}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}

export default KeyManagement;
