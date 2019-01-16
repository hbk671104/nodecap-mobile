import React, { Component } from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import styles from './style';
import List from './list';
import MarketCapList from './marketCapList';
import CommitList from './otherList/commit';
import HolderList from './otherList/holder';

@global.bindTrack({
  page: '榜单',
  name: 'App_RankOperation',
})
@connect(({ rank, loading }) => ({
  upList: R.pathOr([], ['list', 'up', 'data'])(rank),
  upPagination: R.path(['list', 'up', 'pagination'])(rank),
  upLoading: loading.effects['rank/upFetch'],
  downList: R.pathOr([], ['list', 'down', 'data'])(rank),
  downPagination: R.path(['list', 'down', 'pagination'])(rank),
  downLoading: loading.effects['rank/downFetch'],
  marketCapList: R.pathOr([], ['list', 'marketCap'])(rank),
  marketCapPagination: R.path(['list', 'marketCap', 'pagination'])(rank),
  marketCapLoading: loading.effects['rank/marketCapFetch'],
  commitList: R.pathOr([], ['list', 'commit'])(rank),
  commitPagination: R.path(['list', 'commit', 'pagination'])(rank),
  commitLoading: loading.effects['rank/commitFetch'],
  holderList: R.pathOr([], ['list', 'holder'])(rank),
  holderPagination: R.path(['list', 'holder', 'pagination'])(rank),
  holderLoading: loading.effects['rank/holderFetch'],
}))
class Rank extends Component {
  requestData = quotation => page => {
    this.props.dispatch({
      type: `rank/${quotation}Fetch`,
      payload: {
        quotation,
        currentPage: page,
        pageSize: 50,
      },
    });
  };

  toCoinDetail = id => {
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
  };

  renderTab = (name, page, isTabActive, onPressHandler, onLayoutHandler) => {
    const textColor = isTabActive ? 'rgba(0, 0, 0, 0.85)' : '#B8CBDD';
    return (
      <View key={`${name}_${page}`} onLayout={onLayoutHandler}>
        <Touchable onPress={() => onPressHandler(page)}>
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
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <NavBar
          back
          barStyle="dark-content"
          title="榜单"
          wrapperStyle={styles.navBar}
        />
        <ScrollableTabView
          renderTabBar={this.renderTabBar}
          prerenderingSiblingsNumber={Infinity}
          onChangeTab={({ i }) => {
            this.props.track('tab 滑动', { tabIndex: `${i}` });
          }}
        >
          <List
            action={this.requestData('up')}
            data={this.props.upList}
            loading={this.props.upLoading}
            pagination={this.props.upPagination}
            type="up"
            toCoinDetail={this.toCoinDetail}
            tabLabel="涨幅榜"
          />
          <List
            action={this.requestData('down')}
            data={this.props.downList}
            loading={this.props.downLoading}
            pagination={this.props.downPagination}
            type="down"
            toCoinDetail={this.toCoinDetail}
            tabLabel="跌幅榜"
          />
          <MarketCapList
            tabLabel="市值榜"
            data={this.props.marketCapList}
            pagination={this.props.marketCapPagination}
            loading={this.props.marketCapLoading}
            action={this.requestData('marketCap')}
          />
          <CommitList
            tabLabel="代码更新榜"
            data={this.props.commitList}
            pagination={this.props.commitPagination}
            loading={this.props.commitLoading}
            action={this.requestData('commit')}
          />
          <HolderList
            tabLabel="富豪榜"
            data={this.props.holderList}
            pagination={this.props.holderPagination}
            loading={this.props.holderLoading}
            action={this.requestData('holder')}
          />
        </ScrollableTabView>
      </View>
    );
  }
}

Rank.propTypes = {};
Rank.defaultProps = {};

export default Rank;
