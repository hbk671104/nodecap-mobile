import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { connect } from 'react-redux';
import { TabView, TabBar } from 'react-native-tab-view';
import R from 'ramda';

import NavBar from 'component/navBar';
import styles from './style';
import ReportItem from './components/reportItem';

@global.bindTrack({
  page: '基金管理',
  name: 'App_FundManagementOperation',
})
@connect(({ fund }) => ({
  fund: R.pathOr([], ['funds', 'data'])(fund),
}))
class Fund extends Component {
  state = {
    index: 0,
    routes: this.props.fund.map(f => ({
      key: `${f.id}`,
      title: f.name,
    })),
  };

  handleIndexChange = index => {
    this.setState({ index }, () => {
      this.props.track('Tab切换', { subModuleName: index });
    });
  };

  renderBarLabel = props => ({ route }) => {
    const {
      position,
      navigationState: { index, routes },
    } = props;

    const currentIndex = routes.indexOf(route);
    const inputRange = routes.map((x, i) => i);
    const outputRange = inputRange.map(i => (i === currentIndex ? 17 / 14 : 1));
    const scale = position.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });
    return (
      <Animated.Text
        style={[
          styles.tabBar.label,
          {
            transform: [{ scale }],
            fontWeight: index === currentIndex ? 'bold' : 'normal',
          },
        ]}
      >
        {route.title}
      </Animated.Text>
    );
  };

  renderHeader = props => {
    return (
      <NavBar
        hidden
        gradient
        renderBottom={() => (
          <TabBar
            {...props}
            scrollEnabled
            style={styles.tabBar.container}
            tabStyle={styles.tabBar.tab}
            indicatorStyle={styles.tabBar.indicator}
            renderLabel={this.renderBarLabel(props)}
          />
        )}
      />
    );
  };

  renderScene = ({ route }) => {
    if (Math.abs(this.state.index - this.state.routes.indexOf(route)) > 2) {
      return null;
    }
    return <ReportItem />;
  };

  render() {
    return (
      <View style={styles.container}>
        <TabView
          initialLayout={styles.initialLayout}
          navigationState={{
            index: this.state.index,
            routes: this.state.routes,
          }}
          renderScene={this.renderScene}
          tabBarPosition="top"
          renderTabBar={this.renderHeader}
          onIndexChange={this.handleIndexChange}
        />
      </View>
    );
  }
}

export default Fund;
