import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import ListItem from 'component/listItem';

import styles from './style';

@connect()
class AddHolding extends Component {
  handleWalletPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'AddWallet',
      }),
    );
  };

  handleExchangePress = title => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'AddExchange',
        params: {
          title,
        },
      }),
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <NavBar back gradient title="记录持仓盈亏" />
        <ScrollView>
          {/* <ListItem
            style={styles.listItem.container}
            icon={require('asset/management/add/manual.png')}
            title="手动模式"
            titleStyle={styles.listItem.title}
            subtitle="支持手动添加用户记录交易所，法币资产"
          /> */}
          <ListItem
            style={styles.listItem.container}
            icon={require('asset/management/add/wallet.png')}
            title="钱包导入资产"
            titleStyle={styles.listItem.title}
            subtitle="支持 ETH 和 ERC-20 资产导入"
            onPress={this.handleWalletPress}
          />
          <ListItem
            noBottomBorder
            disablePress
            style={styles.listItem.container}
            icon={require('asset/management/add/automatic.png')}
            title="自动模式"
            titleStyle={styles.listItem.title}
            subtitle="使用交易所API自动同步"
          >
            <ListItem
              noBottomBorder
              style={styles.exchangeItem.container}
              icon={require('asset/management/exchange/huobi.png')}
              title="Huobi Global"
              titleStyle={styles.exchangeItem.title}
              onPress={this.handleExchangePress('Huobi Global')}
            />
            <ListItem
              noBottomBorder
              style={styles.exchangeItem.container}
              icon={require('asset/management/exchange/binance.png')}
              title="Binance"
              titleStyle={styles.exchangeItem.title}
              onPress={this.handleExchangePress('Binance')}
            />
            <ListItem
              noBottomBorder
              style={styles.exchangeItem.container}
              icon={require('asset/management/exchange/gate.png')}
              title="Gate.io"
              titleStyle={styles.exchangeItem.title}
              onPress={this.handleExchangePress('Gate.io')}
            />
            <ListItem
              noBottomBorder
              style={styles.exchangeItem.container}
              icon={require('asset/management/exchange/okex.png')}
              title="OKEx"
              titleStyle={styles.exchangeItem.title}
              onPress={this.handleExchangePress('OKEx')}
            />
          </ListItem>
        </ScrollView>
      </View>
    );
  }
}

export default AddHolding;
