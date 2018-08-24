import React, { Component } from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Header from './header';
import ProjectList from './index';
import styles from './style';

class Wrapper extends Component {
  renderHeader = props => <Header {...props} />;

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          locked
          prerenderingSiblingsNumber={Infinity}
          renderTabBar={this.renderHeader}
          contentProps={{ style: { marginTop: 5 } }}
        >
          <ProjectList {...this.props} canCalculate />
          <ProjectList {...this.props} canCalculate={false} />
        </ScrollableTabView>
      </View>
    );
  }
}

export default Wrapper;
