import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { createForm } from 'rc-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Toast } from 'antd-mobile';

import SafeAreaView from 'component/uikit/safeArea';
import NavBar from 'component/navBar';
import AuthButton from 'component/auth/button';
import InputItem from 'component/inputItem';

import Header from './header';
import styles from './style';

@connect()
@createForm()
class ExpressCreate extends Component {
  handleHeaderPress = item => () => {
    Linking.openURL(item.homepage);
  };

  handleNext = () => {
    this.props.form.validateFields((error, value) => {
      if (R.isNil(error)) {
        const item = this.props.navigation.getParam('item', {});
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: 'InvestmentCreate',
            params: {
              express: true,
              projectInfo: {
                coin_id: item.id,
                name: item.name,
                token_name: R.toUpper(item.symbol),
                ...value,
              },
            },
          }),
        );
      }
    });
  };

  render() {
    const item = this.props.navigation.getParam('item', {});
    const { getFieldDecorator } = this.props.form;
    return (
      <SafeAreaView style={styles.container}>
        <NavBar gradient back title="快速添加 (1/2)" />
        <KeyboardAwareScrollView keyboardDismissMode="on-drag">
          <Header item={item} onPress={this.handleHeaderPress(item)} />
          {getFieldDecorator('source', {
            rules: [
              {
                required: true,
                message: '请输入项目来源',
              },
            ],
          })(<InputItem title="项目来源" placeholder="请输入项目来源" />)}
          {getFieldDecorator('description', {
            initialValue: item.description,
            rules: [
              {
                required: true,
                message: '请输入项目描述',
              },
            ],
          })(
            <InputItem
              title="项目描述"
              placeholder="请输入项目描述"
              vertical
            />,
          )}
          <View style={styles.notice.container}>
            <Text style={styles.notice.text}>
              添加更多投资信息可前往网页版 hotnode.io
            </Text>
          </View>
        </KeyboardAwareScrollView>
        <AuthButton
          style={styles.confirm}
          disabled={false}
          title="信息无误，下一步"
          onPress={this.handleNext}
        />
      </SafeAreaView>
    );
  }
}

export default ExpressCreate;
