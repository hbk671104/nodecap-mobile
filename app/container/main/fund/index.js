import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

import NavBar from 'component/navBar';
import styles from './style';

@global.bindTrack({
  page: '基金管理',
  name: 'App_FundManagementOperation',
})
@connect(({ fund }) => ({
  fund: R.pathOr([], ['funds', 'data'])(fund),
}))
class Fund extends Component {
  renderNavBar = () => <NavBar gradient title="基金管理" />;

  render() {
    return <View style={styles.container}>{this.renderNavBar()}</View>;
  }
}

export default Fund;
