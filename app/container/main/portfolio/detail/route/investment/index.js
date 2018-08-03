import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

import styles from './style';
import Header from './header';
import BaseInfo from './baseInfo';
import InvestmentInfo from './investment';
import Loading from 'component/uikit/loading';
import Lock from 'component/auth/permission/lock';

@global.bindTrack({
  subModuleName: '投资信息',
})
@connect(({ loading }) => ({
  loading: loading.effects['portfolio/get'],
}))
class Investment extends PureComponent {
  render() {
    const { loading, item } = this.props;
    if (loading || R.or(R.isNil(item), R.isEmpty(item))) {
      return <Loading />;
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Header {...this.props} />
          <BaseInfo {...this.props} />
          <Lock name="invest-view">
            <InvestmentInfo {...this.props} />
          </Lock>
        </ScrollView>
      </View>
    );
  }
}

export default Investment;
