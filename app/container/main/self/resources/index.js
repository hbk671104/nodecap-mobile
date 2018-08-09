import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import NavBar from 'component/navBar';
import styles from './style';

@connect()
class Resources extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavBar gradient back title="我的人脉" />
      </View>
    );
  }
}

export default Resources;
