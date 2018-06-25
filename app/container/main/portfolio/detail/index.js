import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { TabView, TabBar } from 'react-native-tab-view';
import { compose, withState } from 'recompose';

import NavBar from 'component/navBar';
import Market from './route/market';
import Investment from './route/investment';
import Holdings from './route/holdings';
import styles from './style';

@compose(withState('offsetY', 'setOffsetY', 0))
@connect(({ portfolio, global }) => ({
  portfolio: portfolio.current,
  constants: global.constants,
}))
export default class PortfolioDetail extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'market', title: '项目行情' },
      { key: 'investment', title: '投资信息' },
      { key: 'holdings', title: '持仓记录' },
    ],
  };

  componentWillMount() {
    const item = this.props.navigation.getParam('item');
    if (item && item.id) {
      this.props.dispatch({
        type: 'portfolio/get',
        payload: item.id,
      });
    }
  }

  handleIndexChange = index => this.setState({ index });

  handleOnScroll = ({ nativeEvent: { contentOffset } }) => {
    this.props.setOffsetY(contentOffset.y);
  };

  renderHeader = (props) => {
    const { offsetY, navigation } = this.props;
    const item = navigation.getParam('item');
    return (
      <NavBar
        hidden={offsetY > 0}
        gradient
        back
        renderTitle={() => (
          <View style={styles.searchBar.container}>
            <Text style={styles.searchBar.title}>{item.name}</Text>
          </View>
        )}
        renderBottom={() => (
          <TabBar
            {...props}
            style={styles.tabBar.container}
            labelStyle={styles.tabBar.label}
            indicatorStyle={styles.tabBar.indicator}
          />
        )}
      />
    );
  };

  renderScene = ({ route }) => {
    const item = this.props.portfolio;
    const { id } = this.props.navigation.getParam('item');
    switch (route.key) {
      case 'market':
        return <Market id={id} item={item} onScroll={this.handleOnScroll} />;
      case 'investment':
        return <Investment {...this.props} item={item} onScroll={this.handleOnScroll} />;
      case 'holdings':
        return <Holdings item={item} onScroll={this.handleOnScroll} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TabView
          initialLayout={styles.initialLayout}
          navigationState={{ index: this.state.index, routes: this.state.routes }}
          renderScene={this.renderScene}
          tabBarPosition="top"
          renderTabBar={this.renderHeader}
          onIndexChange={this.handleIndexChange}
        />
      </View>
    );
  }
}
