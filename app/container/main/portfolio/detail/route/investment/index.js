import React, { PureComponent } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

import styles from './style';
import Header from './header';
import BaseInfo from './baseInfo';
import InvestmentInfo from './investment';

@connect(({ loading }) => ({
  loading: loading.effects['portfolio/get'],
}))
class Investment extends PureComponent {
  render() {
    const { loading, portfolio } = this.props;
    if (loading || R.isNil(portfolio)) {
      return <ActivityIndicator style={{ marginTop: 10 }} />;
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Header {...this.props} />
          <BaseInfo {...this.props} />
          <InvestmentInfo {...this.props} />
        </ScrollView>
      </View>
    );
  }
}

export default Investment;
