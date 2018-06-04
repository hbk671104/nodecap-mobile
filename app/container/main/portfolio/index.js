import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import NavBar from 'component/navBar';
import Exchangeable from './route/exchangeable';
import styles from './style';

@connect()
export default class Portfolio extends Component {
  state = {}


  renderHeader = props => (
    <View>
      <NavBar />
      <TabBar {...props} />
    </View>
  )

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'exchangeable':
        return <Exchangeable />;
      default:
        return <Exchangeable />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TabViewAnimated
          initialLayout={styles.initialLayout}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          onIndexChange={this.handleIndexChange}
        />
      </View>
    );
  }
}
