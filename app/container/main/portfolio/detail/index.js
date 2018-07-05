import React, { Component } from 'react';
import { View, Text, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import { TabView, TabBar } from 'react-native-tab-view';
import { compose, withState } from 'recompose';

import SafeAreaView from 'component/uikit/safeArea';
import NavBar from 'component/navBar';
import Market from './route/market';
import Investment from './route/investment';
import Holdings from './route/holdings';
import styles, { deviceWidth, indicatorWidth } from './style';
import { hasPermission } from 'component/auth/permission/lock';

@connect(({ global, portfolio }) => ({
  constants: global.constants,
  portfolio: portfolio.current,
}))
export default class PortfolioDetail extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'market', title: '项目行情' },
      { key: 'investment', title: '投资信息' },
      // { key: 'holdings', title: '持仓记录' },
    ],
  };

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.loadDetail();
    });
  }

  componentWillUnmount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch({
        type: 'portfolio/clearDetail',
      });
    });
  }

  loadDetail = () => {
    const item = this.props.navigation.getParam('item');
    if (item && item.id) {
      this.props.dispatch({
        type: 'portfolio/get',
        payload: item.id,
      });
    }
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

  renderHeader = displayTab => (props) => {
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
        renderBottom={() => {
          if (!displayTab) return null;
          return (
            <TabBar
              {...props}
              style={styles.tabBar.container}
              labelStyle={styles.tabBar.label}
              indicatorStyle={[
                styles.tabBar.indicator,
                { left: (deviceWidth / this.state.routes.length - indicatorWidth) / 2 },
              ]}
            />
          );
        }}
      />
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
    const displayTab = item && item.can_calculate && hasPermission('project-statistic');
    return (
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    );
  }
}
