import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import ListItem from 'component/listItem';
import Modal from 'component/modal';
import AuthButton from 'component/auth/button';
import Display from './display';

import {
  openRealm,
  getKeychain,
  deleteKeychain,
} from '../../../../utils/keychain';
import styles from './style';

@connectActionSheet
@compose(withState('modalVisible', 'setModalVisible', false))
@compose(withState('data', 'setData', []))
@compose(withState('currentItem', 'setCurrentItem', {}))
@connect()
class KeyManagement extends Component {
  componentWillMount() {
    this.requestKeychain();
    this.realm = openRealm();
    this.realm.addListener('change', this.handleKeychainChange);
  }

  componentWillUnmount() {
    this.realm.removeListener('change', this.handleKeychainChange);
  }

  requestKeychain = () => {
    const data = getKeychain();
    if (data) {
      this.props.setData(data);
    }
  };

  removeKeychain = item => {
    deleteKeychain(item);
  };

  handleKeychainChange = () => {
    this.requestKeychain();
  };

  handleResetPress = item => {
    switch (item.type) {
      case 'eth':
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: 'AddWallet',
            params: {
              item,
            },
          }),
        );
        break;
      case 'exchange':
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: 'AddExchange',
            params: {
              title: item.name,
              item,
            },
          }),
        );
        break;
      default:
        break;
    }
  };

  handleItemPress = ({ item, icon }) => () => {
    this.props.showActionSheetWithOptions(
      {
        options: ['查看 API Key', '重置', '删除', '取消'],
        cancelButtonIndex: 3,
        destructiveButtonIndex: 2,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.props.setCurrentItem({ item, icon }, this.toggleVisible);
            break;
          case 1:
            this.handleResetPress(item);
            break;
          case 2:
            this.removeKeychain(item);
            break;
          default:
            break;
        }
      },
    );
  };

  handleAddPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'AddHolding',
      }),
    );
  };

  toggleVisible = () => {
    const { modalVisible, setModalVisible } = this.props;
    setModalVisible(!modalVisible);
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

  renderItem = (item, index) => {
    const optIcon = name => {
      switch (name) {
        case 'Huobi Global':
          return require('asset/management/exchange/huobi.png');
        case 'Binance':
          return require('asset/management/exchange/binance.png');
        case 'Gate.io':
          return require('asset/management/exchange/gate.png');
        case 'OKEx':
          return require('asset/management/exchange/okex.png');
        default:
          return require('asset/management/exchange/ETH.png');
      }
    };
    const icon = optIcon(item.name);
    return (
      <ListItem
        key={index}
        style={styles.item.container}
        icon={icon}
        title={`${item.name}（创建于${item.created}）`}
        titleStyle={styles.item.title}
        subtitle={item.lastSync || '暂未同步'}
        onPress={this.handleItemPress({ item, icon })}
      />
    );
  };

  renderSeparator = () => <View style={styles.separator} />;

  renderEmpty = () => (
    <View style={styles.empty.container}>
      <Image
        style={styles.empty.image}
        source={require('asset/management/guard.png')}
      />
      <Text style={styles.empty.title}>尚未添加Key，立即去添加吧</Text>
      <AuthButton
        disabled={false}
        style={styles.empty.button}
        title="立即添加"
        onPress={this.handleAddPress}
      />
    </View>
  );

  render() {
    const { modalVisible, data } = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          back
          gradient
          title="Key 管家"
          renderRight={() => {
            if (data && data.length === 0) {
              return null;
            }
            return this.renderNavBarRight();
          }}
        />
        {data && data.length > 0 ? (
          <ScrollView>
            {this.renderHeader()}
            {data.map(this.renderItem)}
          </ScrollView>
        ) : (
          this.renderEmpty()
        )}
        <Modal
          style={styles.modal}
          isVisible={modalVisible}
          onBackdropPress={this.toggleVisible}
        >
          <Display {...this.props} />
        </Modal>
      </View>
    );
  }
}

export default KeyManagement;
