import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

import PairItem from './item';
import Empty from '../empty';
import styles from './style';

@connect(({ loading }) => ({
  loading: loading.effects['portfolio/projectSymbol'],
}))
export default class Pairs extends Component {
  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    const { project_id } = this.props;
    this.props.dispatch({
      type: 'portfolio/projectSymbol',
      id: project_id,
    });
  };

  render;
  render() {
    const { portfolio, loading } = this.props;
    const symbols = R.pathOr([], ['symbols'])(portfolio);
    const empty = R.isEmpty(symbols);

    if (loading) {
      return <ActivityIndicator style={styles.indicator} />;
    }
    return (
      <View style={styles.container}>
        {empty ? (
          <Empty
            title="项目暂未匹配"
            subtitle="通过上方立即匹配后即可查看项目动态"
          />
        ) : (
          R.addIndex(R.map)((i, index) => <PairItem key={index} data={i} />)(
            symbols,
          )
        )}
      </View>
    );
  }
}
