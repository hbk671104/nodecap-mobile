import React, { Component } from 'react';
import { View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';

import styles from './style';

@connect()
class Scanner extends Component {
  goBack = () => {
    this.props.dispatch(NavigationActions.back());
  };

  render() {
    const onComplete = this.props.navigation.getParam('onComplete');
    return (
      <View style={styles.container}>
        <NavBar back gradient title="扫一扫" />
        <RNCamera
          style={{ flex: 1 }}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={onComplete}
        />
      </View>
    );
  }
}

export default Scanner;
