import React, { Component } from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Header from './header';
import ExchangeableList from './index';
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
        >
          <ExchangeableList {...this.props} rank="profits" />
          <ExchangeableList {...this.props} rank="roi" />
          <ExchangeableList {...this.props} rank="increase" />
          <ExchangeableList {...this.props} rank="cost" />
        </ScrollableTabView>
      </View>
    );
  }
}

export default Wrapper;
