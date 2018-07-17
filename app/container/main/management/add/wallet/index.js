import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { createForm } from 'rc-form';

import NavBar from 'component/navBar';
import ListItem from 'component/listItem';
import Input from 'component/uikit/textInput';
import AuthButton from 'component/auth/button';

import styles from './style';

@createForm()
class AddWallet extends Component {
  handleImportPress = () => {};

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const address = getFieldValue('address');
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
            contentContainerStyle={styles.listItem.content.container}
            renderContent={() => (
              <View>
                {getFieldDecorator('address')(
                  <Input placeholder="请手动输入或粘贴您的钱包地址" />,
                )}
              </View>
            )}
          />
        </ScrollView>
        <AuthButton
          style={styles.import.container}
          title="导 入"
          disabled={!address}
          onPress={this.handleImportPress}
        />
      </View>
    );
  }
}

export default AddWallet;
