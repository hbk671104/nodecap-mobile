import React, { PureComponent } from 'react';
import { View, ActivityIndicator } from 'react-native';
import R from 'ramda';
// import NewsItem from './item';

import Empty from '../empty';
import styles from './style';

export default class Financing extends PureComponent {
  renderContent = () => null;

  render() {
    const { portfolio, loading, unmatched } = this.props;

    if (loading) {
      return <ActivityIndicator style={styles.indicator} />;
    }

    if (unmatched) {
      return (
        <Empty
          title="项目暂未匹配"
          subtitle="通过上方立即匹配后即可查看募资信息"
        />
      );
    }

    const finance_info = R.pathOr({}, ['finance_info'])(portfolio);
    const empty = R.isEmpty(finance_info);

    return (
      <View style={styles.container}>
        {empty ? <Empty title="暂无募资信息" /> : this.renderContent()}
      </View>
    );
  }
}
