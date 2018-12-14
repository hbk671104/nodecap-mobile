import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import NavBar from 'component/navBar';
import Header from 'component/hotnode_index/header';
import OtherIndex from './otherIndex';
import styles from './style';

@global.bindTrack({
  page: 'Hotnode指数',
  name: 'App_HotnodeIndexOperation',
})
@connect(({ hotnode_index, loading }) => ({
  data: R.pathOr([], ['category'])(hotnode_index),
  global: R.pathOr({}, ['overall', 'global'])(hotnode_index),
  loading: loading.effects['hotnode_index/fetchCategory'],
}))
class HotnodeIndex extends PureComponent {
  componentDidMount() {
    this.props.track('进入');
  }

  renderHeader = () => (
    <View>
      <Header {...this.props} />
      <View style={styles.divider} />
      <OtherIndex {...this.props} />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          wrapperStyle={styles.navBar}
          barStyle="dark-content"
          title="Hotnode 指数"
        />
        <ScrollView>{this.renderHeader()}</ScrollView>
      </View>
    );
  }
}

export default HotnodeIndex;
