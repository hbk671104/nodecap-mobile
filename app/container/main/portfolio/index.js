import React, { Component } from 'react';
import { Text, View, Image, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { compose, withState } from 'recompose';

import NavBar from 'component/navBar';
import NodeCapIcon from 'component/icon/nodecap';
import SearchBarDisplay from 'component/searchBar/display';
import Exchangeable from './route/exchangeable';
import Unexchangeable from './route/unexchangeable';
import styles from './style';

@compose(withState('offsetY', 'setOffsetY', 0))
@connect()
export default class Portfolio extends Component {
  state = {
    index: 0,
    routes: [{ key: 'exchangeable', title: '已上所' }, { key: 'unexchangeable', title: '未上所' }],
  };

  handleIndexChange = index => this.setState({ index });

  handleOnScroll = ({ nativeEvent: { contentOffset } }) => {
    this.props.setOffsetY(contentOffset.y);
    LayoutAnimation.easeInEaseOut();
  };

  renderHeader = (props) => {
    const { offsetY } = this.props;
    return (
      <NavBar
        gradient
        renderTitle={() => (
          <Text style={styles.navBar.title}>
            节点
            <NodeCapIcon name="xiala" />
          </Text>
        )}
        renderBottom={() => {
          return (
            <View>
              {offsetY <= 0 && (
                <View style={styles.searchBar.container}>
                  <SearchBarDisplay />
                </View>
              )}
              <TabBar
                {...props}
                style={styles.tabBar.container}
                labelStyle={styles.tabBar.label}
                indicatorStyle={styles.tabBar.indicator}
              />
            </View>
          );
        }}
      />
    );
  };

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'exchangeable':
        return <Exchangeable onScroll={this.handleOnScroll} />;
      case 'unexchangeable':
        return <Unexchangeable onScroll={this.handleOnScroll} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TabViewAnimated
          initialLayout={styles.initialLayout}
          navigationState={{ index: this.state.index, routes: this.state.routes }}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          onIndexChange={this.handleIndexChange}
        />
      </View>
    );
  }
}
