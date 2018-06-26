import React, { Component } from 'react';
import { View, Text, ActivityIndicator, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import { TabView, TabBar } from 'react-native-tab-view';
import { compose, withState } from 'recompose';

import NavBar from 'component/navBar';
import Market from './route/market';
import Investment from './route/investment';
import Holdings from './route/holdings';
import styles from './style';

@compose(withState('portfolio', 'setPortfolio', {}))
@connect(({ global, loading }) => ({
  constants: global.constants,
  loading: loading.effects['portfolio/get'],
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
        callback: this.handleResponse,
      });
    }
  }

  handleResponse = (res) => {
    const { setPortfolio } = this.props;
    InteractionManager.runAfterInteractions(() => {
      setPortfolio(res);
    });
  };

  handleIndexChange = index => this.setState({ index });

  renderNavBar = (bottom) => {
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
        renderBottom={() => bottom}
      />
    );
  };

  renderHeader = (displayTab = true) => (props) => {
    let component;
    if (displayTab) {
      component = (
        <TabBar
          {...props}
          style={styles.tabBar.container}
          labelStyle={styles.tabBar.label}
          indicatorStyle={styles.tabBar.indicator}
        />
      );
    }

    return this.renderNavBar(component);
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
    const { loading } = this.props;
    const item = this.props.navigation.getParam('item');
    const displayTab = item && item.can_calculate;
    return (
      <View style={styles.container}>
        {loading ? (
          <View style={styles.container}>
            {this.renderNavBar(null)}
            <ActivityIndicator style={{ marginTop: 10 }} />
          </View>
        ) : (
          <TabView
            initialLayout={styles.initialLayout}
            navigationState={{
              index: this.state.index,
              routes: displayTab ? this.state.routes : [{ key: 'investment', title: '投资信息' }],
            }}
            renderScene={this.renderScene}
            tabBarPosition="top"
            renderTabBar={this.renderHeader(displayTab)}
            onIndexChange={this.handleIndexChange}
          />
        )}
      </View>
    );
  }
}
