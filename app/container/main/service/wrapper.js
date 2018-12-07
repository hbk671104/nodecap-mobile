import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';

import NavBar from 'component/navBar';

import ServiceList from './index';
import styles from './style';

@global.bindTrack({
  page: '找服务',
  name: 'App_ServiceOperation',
})
@connect(({ global }) => ({
  type: R.pipe(
    R.pathOr([], ['constants', 'industry_type']),
    R.filter(t => !R.contains(t.value)([3, 7, 8, 1, 6, 2])),
  )(global),
}))
export default class Service extends Component {
  componentDidMount() {
    this.props.track('进入');
  }

  renderTabBar = () => (
    <ScrollableTabBar
      style={styles.tabBar.container}
      tabStyle={styles.tabBar.tab}
      textStyle={styles.tabBar.text}
      activeTextColor="#1890FF"
      inactiveTextColor="rgba(0, 0, 0, 0.65)"
      underlineStyle={styles.tabBar.underline}
      renderTab={this.renderTab}
    />
  );

  render() {
    const { type } = this.props;
    return (
      <View style={styles.container}>
        <NavBar back gradient title="找服务" />
        <ScrollableTabView
          renderTabBar={this.renderTabBar}
          prerenderingSiblingsNumber={Infinity}
          onChangeTab={({ i }) => {
            this.props.track('tab 滑动', { tabIndex: `${i}` });
          }}
        >
          {R.map(t => (
            <ServiceList key={t.value} type={t.value} tabLabel={t.name} />
          ))(type)}
        </ScrollableTabView>
      </View>
    );
  }
}
