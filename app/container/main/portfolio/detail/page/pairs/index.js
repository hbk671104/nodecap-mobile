import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

import List from 'component/uikit/list';
import PairItem from './item';
import styles from './style';

@connect(({ loading }) => ({
  loading: loading.effects['portfolio/projectSymbol'],
}))
export default class Pairs extends Component {
  requestData = () => {
    const { project_id } = this.props;
    this.props.dispatch({
      type: 'portfolio/projectSymbol',
      id: project_id,
    });
  };

  renderItem = ({ item }) => <PairItem data={item} />;

  render() {
    const { portfolio, loading, bottomHidden } = this.props;
    const symbols = R.pathOr([], ['symbols'])(portfolio);
    return (
      <View style={styles.container}>
        <List
          scrollEnabled={bottomHidden}
          disableRefresh
          loading={loading}
          action={this.requestData}
          data={symbols}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
