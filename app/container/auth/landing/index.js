import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import AuthButton from 'component/auth/button';
import StatusBar from 'component/uikit/statusBar';
import styles from './style';

@connect()
class Landing extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ScrollView>
          <Animatable.Image
            animation="fadeInDownBig"
            delay={250}
            style={styles.logo}
            source={require('asset/big_logo.png')}
          />
          <AuthButton
            disabled={false}
            style={styles.button}
            onPress={this.handleOnSubmit}
          />
          <AuthButton
            disabled={false}
            style={styles.button}
            onPress={this.handleOnSubmit}
          />
        </ScrollView>
      </View>
    );
  }
}

export default Landing;
