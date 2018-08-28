import React, { Component } from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import TabBar from '../tabbar';
import ProjectList from './index';
import styles from './style';

class Wrapper extends Component {
  renderTabBar = () => <TabBar />;

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          locked
          scrollWithoutAnimation
          renderTabBar={this.renderTabBar}
          contentProps={{ style: { marginTop: 5 } }}
        >
          <ProjectList {...this.props} tabLabel="全部" status="0,1,2,3,4,5,6" />
          <ProjectList {...this.props} tabLabel="待初筛" status="0" />
          <ProjectList {...this.props} tabLabel="待上会" status="1" />
          <ProjectList {...this.props} tabLabel="已Pass" status="2" />
          <ProjectList {...this.props} tabLabel="待跟进" status="3" />
          <ProjectList {...this.props} tabLabel="确定意向" status="4" />
          <ProjectList {...this.props} tabLabel="待打币" status="5" />
          <ProjectList {...this.props} tabLabel="已打币" status="6" />
        </ScrollableTabView>
      </View>
    );
  }
}

export default Wrapper;
