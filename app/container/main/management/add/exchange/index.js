import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { createForm } from 'rc-form';

import NavBar from 'component/navBar';
import ListItem from 'component/listItem';
import Input from 'component/uikit/textInput';
import AuthButton from 'component/auth/button';
import Icon from 'component/uikit/icon';

import styles from './style';

@createForm()
class AddExchange extends Component {
  handleImportPress = () => {};

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const apiKey = getFieldValue('key');
    const secretKey = getFieldValue('secret');

    const title = this.props.navigation.getParam('title', '导入 Key 与 Secret');
    return (
      <View style={styles.container}>
        <NavBar back gradient title={title} />
        <ScrollView>
          <View style={styles.notice.container}>
            <Text style={styles.notice.title}>
              手动导入 API Key 与 Secret Key
            </Text>
          </View>
          <ListItem
            disablePress
            style={styles.listItem.container}
            icon={require('asset/management/add/key.png')}
            title="API Key"
            titleStyle={styles.listItem.title}
            contentContainerStyle={styles.listItem.content.container}
            renderContent={() => (
              <View>
                {getFieldDecorator('key')(<Input placeholder="请手动输入" />)}
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
                {getFieldDecorator('secret')(
                  <Input placeholder="请手动输入" />,
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
          onPress={this.handleImportPress}
        />
      </View>
    );
  }
}

export default AddExchange;
