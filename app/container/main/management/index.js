import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import Touchable from 'component/uikit/touchable';

import ListItem from './listItem';
import ListHeader from './listHeader';
import Header from './header';
import styles from './style';

const mock = [
  {
    id: 1,
    name: 'BTC',
    holding: {
      base: 20,
      CNY: 1000000,
    },
    price: 54201,
    change: -0.14,
  },
  {
    id: 2,
    name: 'BCH',
    holding: {
      base: 450,
      CNY: 2250000,
    },
    price: 5473,
    change: -0.71,
  },
  {
    id: 3,
    name: 'ETH',
    holding: {
      base: 3648,
      CNY: 1860000,
    },
    price: 3212,
    change: -1.2,
  },
  {
    id: 4,
    name: 'EOS',
    holding: {
      base: 46276,
      CNY: 2545180,
    },
    price: 55.67,
    change: -0.71,
  },
  {
    id: 5,
    name: 'IOTA',
    holding: {
      base: 464304,
      CNY: 3166553.28,
    },
    price: 6.82,
    change: -0.65,
  },
];

@compose(withState('offsetY', 'setOffsetY', 0))
@connect()
class Management extends Component {
  handleOnScroll = ({ nativeEvent: { contentOffset } }) => {
    this.props.setOffsetY(contentOffset.y);
  };

  handleKeyPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'KeyManagement',
      }),
    );
  };

  handlePlusPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'AddHolding',
      }),
    );
  };

  renderNavBarRight = () => (
    <View style={styles.navBar.right.container}>
      <Touchable style={{ marginRight: 12 }} onPress={this.handleKeyPress}>
        <Image
          resizeMode="contain"
          style={styles.navBar.right.item}
          source={require('asset/management/key.png')}
        />
      </Touchable>
      <Touchable onPress={this.handlePlusPress}>
        <Image
          resizeMode="contain"
          style={styles.navBar.right.item}
          source={require('asset/management/plus.png')}
        />
      </Touchable>
    </View>
  );

  renderHeader = () => <Header />;

  renderListHeader = () => <ListHeader />;

  renderItem = ({ item }) => <ListItem item={item} />;

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { offsetY } = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          gradient
          title="资产管理"
          bottomHidden={offsetY > 0}
          renderRight={this.renderNavBarRight}
          renderBottom={this.renderHeader}
        />
        {this.renderListHeader()}
        <List
          contentContainerStyle={styles.list.contentContainer}
          // action={this.requestData}
          data={mock}
          // pagination={pagination}
          // loading={loading}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
          // renderHeader={this.renderHeader}
          onScroll={this.handleOnScroll}
          scrollEventThrottle={500}
        />
      </View>
    );
  }
}

export default Management;
