import React, { Component } from 'react';
import { View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';

import styles from './style';

@connect()
class Scanner extends Component {
  constructor(props) {
    super(props);
    this.detected = false;
  }

  goBack = () => {
    this.props.dispatch(NavigationActions.back());
  };

  handleOnBarcodeRead = url => {
    if (!this.detected) {
      this.detected = true;
      const data = R.pathOr('', ['data'])(url);
      if (!R.isEmpty(data)) {
        const onComplete = this.props.navigation.getParam('onComplete');
        onComplete(data, this.goBack);
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <NavBar back gradient title="扫一扫" />
        <RNCamera
          style={{ flex: 1 }}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={this.handleOnBarcodeRead}
        />
      </View>
    );
  }
}

export default Scanner;
