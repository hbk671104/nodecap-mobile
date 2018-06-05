import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import NavBar from 'component/navBar';
import NodeCapIcon from 'component/icon/nodecap';
import SearchBarDisplay from 'component/searchBar/display';
import Exchangeable from './route/exchangeable';
import Unexchangeable from './route/unexchangeable';
import styles from './style';

@connect()
export default class Portfolio extends Component {
  state = {
    // index: 0,
    // routes: [
    //   { key: 'exchangeable', title: '已上所' },
    //   { key: 'unexchangeable', title: '未上所' },
    // ],
  }

  // handleIndexChange = index => this.setState({ index })

  renderHeader = props => (
    <NavBar
      style={styles.navBar.container}
      renderTitle={() => (
        <Text style={styles.navBar.title}>
          节点
          <NodeCapIcon name="xiala" />
        </Text>
      )}
      renderBottom={() => (
        <View>
          <View style={styles.searchBar.container}>
            <SearchBarDisplay />
          </View>
          <TabBar
            {...props}
            style={styles.tabBar.container}
            labelStyle={styles.tabBar.label}
            indicatorStyle={styles.tabBar.indicator}
          />
        </View>
      )}
    />
  )

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'exchangeable':
        return <Exchangeable />;
      case 'unexchangeable':
        return <Unexchangeable />;
      default:
        return null;
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
