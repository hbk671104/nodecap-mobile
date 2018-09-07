import React, { PureComponent } from 'react';
import { View, ActivityIndicator } from 'react-native';
import R from 'ramda';

import PairItem from './item';
import Empty from '../empty';
import styles from './style';

export default class Pairs extends PureComponent {
  render() {
    const { portfolio, loading, unmatched } = this.props;

    if (loading) {
      return <ActivityIndicator style={styles.indicator} />;
    }

    if (unmatched) {
      return (
        <Empty title="项目暂未匹配" subtitle="通过上方立即匹配后即可查看" />
      );
    }

    const symbols = R.pathOr([], ['symbols'])(portfolio);
    const empty = R.isEmpty(symbols);

    return (
      <View style={styles.container}>
        {empty ? (
          <Empty title="项目暂未上所" />
        ) : (
          R.addIndex(R.map)((i, index) => <PairItem key={index} data={i} />)(
            symbols,
          )
        )}
      </View>
    );
  }
}
