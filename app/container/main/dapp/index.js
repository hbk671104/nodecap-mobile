import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import NavBar from '../../../component/navBar';
import styles from './style';
import { TabView, TabBar } from 'react-native-tab-view';
import { withState, compose } from 'recompose';
import * as R from 'ramda';
import List from '../../../component/uikit/list';
import Touchable from '../../../component/uikit/touchable';
import bind from 'lodash-decorators/bind';
import { Flex } from 'antd-mobile';
import { SolidAvatar } from '../../../component/uikit/avatar';

@global.bindTrack({
  page: 'DApp',
  name: 'App_DAppOperation',
})
@connect(({ dapp, loading }) => ({
  types: R.pathOr([], ['types'])(dapp),
  loading: loading.effects['dapp/fetchListData'],
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

  @bind
  renderItem({ item }) {
    const tags = R.pathOr([], ['tags'])(item);
    return (
      <Touchable>
        <Flex align="start" style={styles.itemContainer}>
          <View style={styles.avatar}>
            <SolidAvatar
              raised={false}
              innerRatio={1}
              source={{ uri: item.logo }}
              imageStyle={{
                 borderRadius: 0,
               }}
            />
          </View>
          <View style={styles.right}>
            <Text style={styles.title}>{item.title}</Text>
            <Flex>
              {tags.map(i => (
                <View key={i.name} style={styles.tag}>
                  <Text style={styles.tagText}>{i.name}</Text>
                </View>
              ))}
            </Flex>
            <Text style={styles.desc} numberOfLines={1}>{item.description}</Text>
          </View>
        </Flex>
      </Touchable>
    );
  }

  @bind
  renderScene({ route }) {
    const data = R.pathOr([], ['dapp', 'list', route.key, 'data'])(this.props);
    const pagination = R.pathOr([], ['dapp', 'list', route.key, 'pagination'])(this.props);
    return (
      <View tabLabel={route.title}>
        <List
          action={this.requestData(route.key)}
          loading={this.props.loading}
          data={data}
          pagination={pagination}
          renderItem={this.renderItem}
        />
      </View>
    );
  }

  render() {
    const { index, routes } = this.props;

    return (
      <View style={styles.container}>
        <NavBar
          back
          barStyle="dark-content"
          title="DAPP"
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

DappIndex.propTypes = {};
DappIndex.defaultProps = {};

export default DappIndex;
