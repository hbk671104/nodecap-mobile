import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import BorderCorner from './borderCorner';
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
          style={styles.camera}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={this.handleOnBarcodeRead}
        >
          <View style={styles.content}>
            <View style={styles.frame}>
              <BorderCorner position="topLeft" />
              <BorderCorner position="topRight" />
              <BorderCorner position="bottomLeft" />
              <BorderCorner position="bottomRight" />
            </View>
            <Text style={styles.title}>对准二维码到框内即可扫描</Text>
          </View>
        </RNCamera>
      </View>
    );
  }
}

export default Scanner;
