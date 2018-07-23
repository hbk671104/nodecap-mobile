import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import ListItem from 'component/listItem';
import Input from 'component/uikit/textInput';
import AuthButton from 'component/auth/button';

import { addKeychain, updateKeychain } from '../../../../../utils/keychain';
import { parseIBAN } from '../../../../../utils/iban';
import styles from './style';

@createForm()
@connect()
class AddWallet extends Component {
  onScanComplete = (data, callback) => {
    const address = parseIBAN(data);
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      address,
    });
    if (callback) {
      callback();
    }
  };

  handleScannerPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Scanner',
        params: {
          onComplete: this.onScanComplete,
        },
      }),
    );
  };

  handleImportPress = (address, item) => () => {
    if (item) {
      updateKeychain(
        item,
        {
          address,
        },
        this.goBack,
      );
    } else {
      addKeychain(
        {
          type: 'eth',
          name: 'ETH Wallet',
          address,
        },
        this.goBack,
      );
    }
  };

  goBack = () => {
    this.props.dispatch(NavigationActions.back());
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const address = getFieldValue('address');
    const item = this.props.navigation.getParam('item');
    return (
      <View style={styles.container}>
        <NavBar back gradient title="从钱包导入" />
        <ScrollView keyboardDismissMode="on-drag">
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
            onPress={this.handleScannerPress}
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
                {getFieldDecorator('address', {
                  initialValue: (item && item.address) || undefined,
                })(
                  <Input
                    style={styles.listItem.input}
                    placeholder="请手动输入或粘贴您的钱包地址"
                  />,
                )}
              </View>
            )}
          />
        </ScrollView>
        <AuthButton
          style={styles.import.container}
          title="导 入"
          disabled={!address}
          onPress={this.handleImportPress(address, item)}
        />
      </View>
    );
  }
}

export default AddWallet;
