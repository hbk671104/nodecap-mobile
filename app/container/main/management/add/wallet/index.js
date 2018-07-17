import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import NavBar from 'component/navBar';
import ListItem from 'component/listItem';
import Input from 'component/uikit/textInput';

import styles from './style';

class AddWallet extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavBar back gradient title="从钱包导入" />
        <ScrollView>
          <View style={styles.notice.container}>
            <Text style={styles.notice.title}>
              扫描二维码或手动粘贴你的钱包地址
            </Text>
          </View>
          <ListItem
            style={styles.listItem.container}
            icon={require('asset/management/add/scan.png')}
            title="扫一扫"
            titleStyle={styles.listItem.title}
          />
          <ListItem
            disablePress
            style={styles.listItem.container}
            icon={require('asset/management/add/wallet_address.png')}
            title="钱包地址"
            titleStyle={styles.listItem.title}
            renderContent={() => <Input />}
          />
        </ScrollView>
      </View>
    );
  }
}

export default AddWallet;
