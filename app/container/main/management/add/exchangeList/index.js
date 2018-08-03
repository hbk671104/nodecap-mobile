import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import ListItem from 'component/listItem';

import styles from './style';

@connect()
class ExchangeList extends Component {
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
        <NavBar back gradient title="自动模式" />
        <ScrollView>
          <ListItem
            icon={require('asset/management/exchange/huobi.png')}
            title="Huobi Global"
            onPress={this.handleExchangePress('Huobi Global')}
          />
          <ListItem
            icon={require('asset/management/exchange/binance.png')}
            title="Binance"
            onPress={this.handleExchangePress('Binance')}
          />
          <ListItem
            icon={require('asset/management/exchange/gate.png')}
            title="Gate.io"
            onPress={this.handleExchangePress('Gate.io')}
          />
          <ListItem
            icon={require('asset/management/exchange/okex.png')}
            title="OKEx"
            onPress={this.handleExchangePress('OKEx')}
          />
        </ScrollView>
      </View>
    );
  }
}

export default ExchangeList;
