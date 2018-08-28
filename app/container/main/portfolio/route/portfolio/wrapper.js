import React, { Component } from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import TabBar from '../tabbar';
import ProjectList from './index';
import styles from './style';

class Wrapper extends Component {
  renderHeader = () => <TabBar />;

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          locked
          scrollWithoutAnimation
          renderTabBar={this.renderHeader}
          contentProps={{ style: { marginTop: 5 } }}
        >
          <ProjectList {...this.props} tabLabel="已上所" canCalculate />
          <ProjectList {...this.props} tabLabel="未上所" canCalculate={false} />
        </ScrollableTabView>
      </View>
    );
  }
}

export default Wrapper;
