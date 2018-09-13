import React, { Component } from 'react';
import { View, Animated, Platform } from 'react-native';
import { connect } from 'react-redux';
import { TabView, TabBar } from 'react-native-tab-view';
import R from 'ramda';
import { compose, withState } from 'recompose';
import JPush from 'jpush-react-native';

import NavBar from 'component/navBar';
import Empty from 'component/empty';
import FundWrapper from './wrapper';
import styles from './style';
import { handleOpen } from '../../../utils/jpush_handler';

@global.bindTrack({
  page: '基金管理',
  name: 'App_FundManagementOperation',
})
@connect(({ fund }) => ({
  routes: R.pipe(
    R.pathOr([], ['funds']),
    R.map(f => ({
      key: `${f.id}`,
      title: f.name,
    })),
  )(fund),
}))
@compose(withState('index', 'setIndex', 0))
class Fund extends Component {
  state = {
    isIOS: Platform.OS === 'ios',
  };

  componentDidMount() {
    if (this.state.isIOS) {
      JPush.getLaunchAppNotification(this.handleOpenLaunchNotification);
    }
  }

  handleOpenLaunchNotification = result => {
    if (R.isNil(result)) {
      return;
    }

    setTimeout(() => {
      const { extras } = result;
      handleOpen(extras);
    }, 500);
  };

  handleIndexChange = index => {
    this.props.setIndex(index, () => {
      this.props.track('Tab切换', { subModuleName: index });
    });
  };

  renderBarLabel = props => ({ route }) => {
    const {
      position,
      navigationState: { index, routes },
    } = props;

    const currentIndex = routes.indexOf(route);
    const inputRange = [-1, ...routes.map((x, i) => i)];
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

  renderHeader = props => (
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

  renderScene = ({ route }) => {
    // if (Math.abs(this.state.index - this.state.routes.indexOf(route)) > 1) {
    //   return null;
    // }
    return <FundWrapper fid={route.key} />;
  };

  render() {
    const { index, routes } = this.props;

    if (R.isEmpty(routes)) {
      return (
        <View style={styles.container}>
          <NavBar gradient />
          <Empty title="暂无基金查看权限" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <TabView
          initialLayout={styles.initialLayout}
          navigationState={{
            index,
            routes,
          }}
          renderScene={this.renderScene}
          renderTabBar={this.renderHeader}
          onIndexChange={this.handleIndexChange}
        />
      </View>
    );
  }
}

export default Fund;
