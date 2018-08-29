import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import ProjectList from './list';
import styles from './style';

class FundProject extends Component {
  renderHeader = () => (
    <ScrollableTabBar
      style={styles.tab.container}
      underlineStyle={styles.tab.underline}
      renderTab={(name, page, isTabActive, onPressHandler, onLayoutHandler) => (
        <Touchable
          key={`${name}_${page}`}
          style={styles.tab.item.container}
          onPress={() => onPressHandler(page)}
          onLayout={onLayoutHandler}
        >
          <Text
            style={[
              styles.tab.item.title,
              isTabActive && styles.tab.item.highlight,
            ]}
          >
            {name}
          </Text>
        </Touchable>
      )}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <NavBar back gradient title="项目清单" />
        <ScrollableTabView renderTabBar={this.renderHeader}>
          <ProjectList tabLabel="全部" />
          <ProjectList tabLabel="已上所" />
          <ProjectList tabLabel="未上所" />
          <ProjectList tabLabel="未卖出" />
          <ProjectList tabLabel="部分卖出" />
          <ProjectList tabLabel="完全卖出" />
        </ScrollableTabView>
      </View>
    );
  }
}

export default FundProject;
