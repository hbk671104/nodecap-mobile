import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import ListItem from 'component/listItem';
import Input from 'component/uikit/textInput';
import AuthButton from 'component/auth/button';
import Icon from 'component/uikit/icon';

import { addKeychain, updateKeychain } from '../../../../../utils/keychain';
import styles from './style';

@createForm()
@connect()
class AddExchange extends Component {
  handleImportPress = ({ name, apiKey, secretKey }, item) => () => {
    if (item) {
      updateKeychain(
        item,
        {
          apiKey,
          secretKey,
        },
        this.goBack,
      );
    } else {
      addKeychain(
        {
          type: 'exchange',
          name,
          apiKey,
          secretKey,
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
    const apiKey = getFieldValue('key');
    const secretKey = getFieldValue('secret');

    const title = this.props.navigation.getParam('title');
    const item = this.props.navigation.getParam('item');

    return (
      <View style={styles.container}>
        <NavBar back gradient title={title} />
        <ScrollView keyboardDismissMode="on-drag">
          <View style={styles.notice.container}>
            <Text style={styles.notice.title}>
              手动导入 API Key 与 Secret Key
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
            icon={require('asset/management/add/key.png')}
            title="API Key"
            titleStyle={styles.listItem.title}
            contentContainerStyle={styles.listItem.content.container}
            renderContent={() => (
              <View>
                {getFieldDecorator('key', {
                  initialValue: (item && item.apiKey) || undefined,
                })(
                  <Input
                    style={styles.listItem.input}
                    placeholder="请手动输入"
                  />,
                )}
              </View>
            )}
          />
          <ListItem
            disablePress
            style={styles.listItem.container}
            icon={require('asset/management/add/key.png')}
            title="Secret Key"
            titleStyle={styles.listItem.title}
            contentContainerStyle={styles.listItem.content.container}
            renderContent={() => (
              <View>
                {getFieldDecorator('secret', {
                  initialValue: (item && item.secretKey) || undefined,
                })(
                  <Input
                    style={styles.listItem.input}
                    placeholder="请手动输入"
                  />,
                )}
              </View>
            )}
          />
          <View style={styles.help.container}>
            <Text style={styles.help.title}>
              查看获取 {title} 的 API Key 和 Secret Key 的方式{' '}
              <Icon name="arrow-forward" color="rgba(0, 0, 0, 0.25)" />
            </Text>
          </View>
        </ScrollView>
        <AuthButton
          style={styles.import.container}
          title="导 入"
          disabled={!apiKey || !secretKey}
          onPress={this.handleImportPress(
            { apiKey, secretKey, name: title },
            item,
          )}
        />
      </View>
    );
  }
}

export default AddExchange;
