import React, { PureComponent } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import NewsItem from './item';

import Empty from '../empty';
import styles from './style';

@connect()
export default class Trend extends PureComponent {
  handleItemPress = id => () => {
    this.props.track('点击进入详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'NotificationDetail',
        params: {
          id,
        },
      }),
    );
  };

  render() {
    const { portfolio, loading } = this.props;
    const trends = R.pathOr([], ['news', 'data'])(portfolio);
    const empty = R.isEmpty(trends);

    if (loading) {
      return <ActivityIndicator style={styles.indicator} />;
    }
    return (
      <View style={styles.container}>
        {empty ? (
          <Empty title="暂无动态" />
        ) : (
          R.addIndex(R.map)((i, index) => (
            <NewsItem key={index} data={i} onPress={this.handleItemPress} />
          ))(trends)
        )}
      </View>
    );
  }
}
