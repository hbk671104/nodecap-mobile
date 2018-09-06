import React, { Component } from 'react';
import { View, ActivityIndicator, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import NewsItem from './item';

import Empty from '../empty';
import styles from './style';

@connect(({ loading, portfolio }) => ({
  portfolio: R.pathOr({}, ['current'])(portfolio),
  loadingTrend: loading.effects['portfolio/projectTrend'],
}))
export default class Trend extends Component {
  componentWillMount() {
    this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    const checkExist = R.pipe(
      R.path(['portfolio', 'news', 'data']),
      R.isNil,
      R.not
    );
    if (!checkExist(this.props) && checkExist(nextProps)) {
      InteractionManager.runAfterInteractions(() => {
        this.loadData();
      });
    }
  }


  loadData = () => {
    const { portfolio } = this.props;
    this.props.dispatch({
      type: 'portfolio/projectTrend',
      id: R.path(['coin', 'id'])(portfolio),
    });
  };

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
    const { portfolio, loadingTrend } = this.props;
    const trends = R.pathOr([], ['news', 'data'])(portfolio);
    const empty = R.isEmpty(trends);

    if (loadingTrend) {
      return <ActivityIndicator style={styles.indicator} />;
    }
    return (
      <View style={styles.container}>
        {empty ? (
          <Empty
            title="暂无动态"
          />
        ) : (
          R.addIndex(R.map)((i, index) => (
            <NewsItem
              key={index}
              data={i}
              onPress={this.handleItemPress}
            />
))(
            trends,
          )
        )}
      </View>
    );
  }
}
