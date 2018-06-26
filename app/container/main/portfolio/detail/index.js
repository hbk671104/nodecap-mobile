import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { TabView, TabBar } from 'react-native-tab-view';
import { compose, withState } from 'recompose';

import NavBar from 'component/navBar';
import Market from './route/market';
import Investment from './route/investment';
import Holdings from './route/holdings';
import styles from './style';

@compose(withState('portfolio', 'setPortfolio', {}))
@connect(({ global }) => ({
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
    const { setPortfolio } = this.props;
    if (item && item.id) {
      this.props.dispatch({
        type: 'portfolio/get',
        payload: item.id,
        callback: (res) => {
          setPortfolio(res);
        },
      });
    }
  }

  handleIndexChange = index => this.setState({ index });

  renderHeader = (props) => {
    const item = this.props.navigation.getParam('item');
    return (
      <NavBar
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

  renderInvestment = () => {
    const item = this.props.navigation.getParam('item');
    return (
      <View style={styles.container}>
        <NavBar
          gradient
          back
          renderTitle={() => (
            <View style={styles.searchBar.container}>
              <Text style={styles.searchBar.title}>{item.name}</Text>
            </View>
          )}
        />
        <Investment {...this.props} item={this.props.portfolio} />;
      </View>
    );
  };

  renderScene = ({ route }) => {
    const { portfolio } = this.props;
    const { id } = this.props.navigation.getParam('item');
    switch (route.key) {
      case 'market':
        return <Market {...this.props} id={id} item={portfolio} />;
      case 'investment':
        return <Investment {...this.props} item={portfolio} />;
      case 'holdings':
        return <Holdings {...this.props} item={portfolio} />;
      default:
        return null;
    }
  };

  render() {
    const item = this.props.navigation.getParam('item');
    return (
      <View style={styles.container}>
        {item && item.can_calculate ? (
          <TabView
            initialLayout={styles.initialLayout}
            navigationState={{ index: this.state.index, routes: this.state.routes }}
            renderScene={this.renderScene}
            tabBarPosition="top"
            renderTabBar={this.renderHeader}
            onIndexChange={this.handleIndexChange}
          />
        ) : (
          this.renderInvestment()
        )}
      </View>
    );
  }
}
