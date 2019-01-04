import React, { Component } from 'react';
import { View } from 'react-native';
import R from 'ramda';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { TabView, TabBar } from 'react-native-tab-view';
import { NavigationActions } from 'react-navigation';
import NavBar from 'component/navBar';
import styles from './style';
import List from './list';
import bind from 'lodash-decorators/bind';

@global.bindTrack({
  page: '榜单',
  name: 'App_RankOperation',
})
@compose(
  withState('index', 'setIndex', 0),
  withState('routes', 'setRoutes', [
    { key: 'up', title: '涨幅榜' },
    { key: 'down', title: '跌幅榜' },
  ]),
)
@connect(({ rank, loading }) => ({
  upList: R.pathOr([], ['list', 'up', 'data'])(rank),
  upPagination: R.pathOr([], ['list', 'up', 'pagination'])(rank),
  upLoading: loading.effects['rank/upFetch'],
  downList: R.pathOr([], ['list', 'down', 'data'])(rank),
  downPagination: R.pathOr([], ['list', 'down', 'pagination'])(rank),
  downLoading: loading.effects['rank/downFetch'],
}))
class Rank extends Component {
  handleIndexChange = index => {
    this.props.setIndex(index, () => {
      this.props.track('Tab切换', { subModuleName: index });
    });
  };

  requestData = (quotation) => (page, size) => {
    this.props.dispatch({
      type: `rank/${quotation}Fetch`,
      payload: {
        quotation,
        currentPage: page,
        pageSize: 50,
      },
    });
  }

  toCoinDetail = (id) => {
    this.props.track('点击进入详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PublicProjectDetail',
        params: {
          id,
        },
        key: `PublicProjectDetail_${id}`,
      }),
    );
  }

  @bind
  renderScene({ route }) {
    switch (route.key) {
      case 'up':
        return (
          <List
            action={this.requestData('up')}
            data={this.props.upList}
            loading={this.props.upLoading}
            pagination={this.props.upPagination}
            type="up"
            toCoinDetail={this.toCoinDetail}
          />
);
      case 'down':
        return (
          <List
            action={this.requestData('down')}
            data={this.props.downList}
            loading={this.props.downLoading}
            pagination={this.props.downPagination}
            type="down"
            toCoinDetail={this.toCoinDetail}
          />
);
      default:
        return null;
    }
  }

  render() {
      const { index, routes } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <NavBar
          back
          barStyle="dark-content"
          title="涨跌幅"
          wrapperStyle={styles.navBar}
        />
        <TabView
          initialLayout={styles.initialLayout}
          navigationState={{
            index,
            routes,
          }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              useNativeDriver
              style={styles.tabBar.container}
              tabStyle={styles.tabBar.tab}
              indicatorStyle={styles.tabBar.indicator}
              labelStyle={styles.tabBar.label}
            />
          )}
          renderScene={this.renderScene}
          onIndexChange={this.handleIndexChange}
        />
      </View>
    );
  }
}

Rank.propTypes = {};
Rank.defaultProps = {};

export default Rank;
