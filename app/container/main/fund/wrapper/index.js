import React, { Component } from 'react';
import { View } from 'react-native';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';

import Holdings from '../holdings';
import styles from './style';

class FundWrapper extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          prerenderingSiblingsNumber={Infinity}
          renderTabBar={() => (
            <DefaultTabBar
              style={styles.tabBar.container}
              tabStyle={styles.tabBar.tab}
              textStyle={styles.tabBar.text}
              activeTextColor="#1890FF"
              inactiveTextColor="rgba(0, 0, 0, 0.65)"
              underlineStyle={styles.tabBar.underline}
            />
          )}
        >
          <View tabLabel="整体情况" />
          <View tabLabel="投资报表" />
          <Holdings tabLabel="持仓分析" />
        </ScrollableTabView>
      </View>
    );
  }
}

export default FundWrapper;
