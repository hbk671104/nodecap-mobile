import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './style';
import Header from './header';
import BaseInfo from './baseInfo';
import InvestmentInfo from './investment';

class Investment extends PureComponent {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Header {...this.props} />
        <BaseInfo {...this.props} />
        <InvestmentInfo {...this.props} />
      </ScrollView>
    );
  }
}

export default Investment;
