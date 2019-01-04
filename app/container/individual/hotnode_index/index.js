import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import NavBar from 'component/navBar';
import Header from '../../main/public_project/header/emotion_index';
import OtherIndex from './otherIndex';
import styles from './style';
import Explanation from '../../../component/explanation';
import { compose, withState } from 'recompose';

@global.bindTrack({
  page: 'Hotnode指数',
  name: 'App_HotnodeIndexOperation',
})
@connect(({ hotnode_index, loading }) => ({
  data: R.pathOr([], ['category'])(hotnode_index),
  global: R.pathOr({}, ['overall', 'global'])(hotnode_index),
  loading: loading.effects['hotnode_index/fetchCategory'],
  market_sentiment: R.pathOr({}, ['market_sentiment'])(hotnode_index),
}))
@compose(
  withState('showExplanation', 'setShowExplanation', false),
)
class HotnodeIndex extends PureComponent {
  componentDidMount() {
    this.props.track('进入');
  }

  renderHeader = () => (
    <View>
      <Header
        {...this.props}
        onTitlePress={() => this.props.setShowExplanation(true)}
      />
      <View style={styles.divider} />
      <OtherIndex {...this.props} />
    </View>
  );

  render() {
    const {
      showExplanation,
    } = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          wrapperStyle={styles.navBar}
          barStyle="dark-content"
          title="Hotnode 指数"
        />
        <ScrollView>{this.renderHeader()}</ScrollView>
        <Explanation
          visible={showExplanation}
          onBackdropPress={() => this.props.setShowExplanation(false)}
          title="市场情绪"
          content="市场情绪是 Hotnode 综合最近8小时全网媒体及自媒体数据 ，进行大数据建模及分析，科学评估市场情绪看多看空动向"
        />
      </View>
    );
  }
}

export default HotnodeIndex;
