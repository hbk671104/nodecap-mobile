import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import styles from './style';
import { TabView, TabBar } from 'react-native-tab-view';
import { withState, compose } from 'recompose';
import * as R from 'ramda';
import List from '../../../component/uikit/list';
import bind from 'lodash-decorators/bind';
import { NavigationActions } from 'react-navigation';
import searchable from '../../../component/searchableList';
import InstitutionReportItem from '../../../component/public_project/report_item';
import Item from './item';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Touchable from '../../../component/uikit/touchable';

@global.bindTrack({
  page: 'DApp',
  name: 'App_DAppOperation',
})
@connect(({ dapp, loading }) => ({
  types: R.pathOr([], ['types'])(dapp),
  loading: loading.effects['dapp/fetchListData'],
  searchData: R.pathOr([], ['search', 'data'])(dapp),
  searchPagination: R.pathOr(null, ['search', 'pagination'])(dapp),
  searchLoading: loading.effects['dapp/search'],
  dapp,
}))
@compose(
  withState('index', 'setIndex', 0),
  withState('routes', 'setRoutes', (props) => {
    return R.compose(
      R.map(i => ({
        key: i.id,
        title: String(i.name).toUpperCase(),
      })),
      R.pathOr([], ['types'])
    )(props);
  }),
)
@searchable((props) => ({
  name: 'Dapp',
  data: props.searchData,
  pagination: props.searchPagination,
  loading: props.searchLoading,
  action: ({ page, size, searchText }) => {
    if (!searchText) {
      props.dispatch({
        type: 'dapp/clearSearch',
        payload: {
          type: R.path(['type', 'value'])(props),
        },
      });
    } else {
      props.dispatch({
        type: 'dapp/search',
        payload: {
          q: searchText,
          page,
          'per-page': size,
        },
      });
    }
  },
  renderItem: ({ item }) => {
    const handleItemPress = () => {
      props.track('点击进入详情');
      props.dispatch(
        NavigationActions.navigate({
          routeName: 'DappDetail',
          params: {
            id: item.id,
          },
        }),
      );
    };

    return (
      <Item key={item.id} item={item} onPress={handleItemPress} />
    );
  },
}))
class DappIndex extends Component {
  handleIndexChange = (index) => {
    this.props.setIndex(index, () => {
      this.props.track('Tab切换', { subModuleName: index });
    });
  }

  requestData = (topic_id) => (page, size) => {
    this.props.dispatch({
      type: 'dapp/fetchListData',
      payload: {
        topic_id,
        currentPage: page,
        pageSize: size,
      },
    });
  };

  handleDappItemPress = (item) => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'DappDetail',
        params: {
          id: item.id,
        },
      }),
    );
  }

  @bind
  renderItem({ item }) {
    return (
      <Item item={item} onPress={this.handleDappItemPress} />
    );
  }

  @bind
  renderScene({ route }) {
    const data = R.pathOr([], ['dapp', 'list', route.key, 'data'])(this.props);
    const pagination = R.pathOr([], ['dapp', 'list', route.key, 'pagination'])(this.props);
    return (
      <View style={{ flex: 1 }} tabLabel={route.title}>
        <List
          action={this.requestData(route.key)}
          loading={this.props.loading}
          data={data}
          pagination={pagination}
          renderItem={this.renderItem}
          style={{ flex: 1 }}
        />
      </View>
    );
  }

  renderTab = (name, page, isTabActive, onPressHandler, onLayoutHandler) => {
    const textColor = isTabActive ? 'rgba(0, 0, 0, 0.85)' : '#B8CBDD';
    return (
      <View onLayout={onLayoutHandler}>
        <Touchable key={`${name}_${page}`} onPress={() => onPressHandler(page)}>
          <View style={[styles.tabBar.tab]}>
            <Text
              style={[
                styles.tabBar.text,
                { color: textColor, fontWeight: 'bold' },
              ]}
            >
              {name}
            </Text>
          </View>
        </Touchable>
        {isTabActive && (
          <View style={styles.tabBar.under}>
            <View style={styles.tabBar.underInner} />
          </View>
        )}
      </View>
    );
  };

  renderTabBar = () => (
    <ScrollableTabBar
      style={styles.tabBar.container}
      tabStyle={styles.tabBar.tab}
      textStyle={styles.tabBar.text}
      activeTextColor="rgba(0, 0, 0, 0.85)"
      inactiveTextColor="#B8CBDD"
      underlineStyle={styles.tabBar.underline}
      renderTab={this.renderTab}
    />
  );

  render() {
    const { index, routes } = this.props;

    return (
      <View style={styles.container}>
        <ScrollableTabView
          style={{ flex: 1 }}
          renderTabBar={this.renderTabBar}
        >
          {routes.map((route) => this.renderScene({ route }))}
        </ScrollableTabView>
      </View>
    );
  }
}

DappIndex.propTypes = {};
DappIndex.defaultProps = {};

export default DappIndex;
