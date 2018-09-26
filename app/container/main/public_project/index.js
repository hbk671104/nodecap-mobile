import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { connect } from 'react-redux';
import { compose, withState, withProps } from 'recompose';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import NewsItem from 'component/news';

import List from './components/list';
import Header from './header';
import styles from './style';

const AnimatedList = Animated.createAnimatedComponent(List);

@global.bindTrack({
  page: '项目公海',
  name: 'App_PublicProjectOperation',
})
@connect(({ public_project, news, loading }) => ({
  news: R.pathOr([], ['news'])(news),
  lastNewsID: R.pathOr(null, ['payload'])(news),
  data: R.pathOr([], ['list', 'index', 'data'])(public_project),
  pagination: R.pathOr(null, ['list', 'index', 'pagination'])(public_project),
  loading: loading.effects['news/index'],
}))
@compose(
  withState('animateY', 'setAnimatedY', new Animated.Value(0)),
  withProps(({ animateY }) => ({
    navBarOpacityRange: animateY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  })),
)
export default class PublicProject extends Component {
  requestData = isRefresh => {
    this.props.dispatch({
      type: 'news/index',
      payload: isRefresh ? null : this.props.lastNewsID,
    });
  };

  handleItemPress = item => () => {
    this.props.track('点击进入详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PublicProjectDetail',
        params: {
          item,
        },
      }),
    );
  };

  renderItem = ({ item }) => <NewsItem data={item} />;

  renderHeader = () => (
    <Header
      {...this.props}
      onItemPress={this.handleInstitutionItemPress}
      onFilterPress={this.handleFilterPress}
    />
  );

  renderSeparator = () => <View style={styles.separator} />;

  renderNavBar = () => (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        opacity: this.props.navBarOpacityRange,
      }}
    >
      <NavBar gradient title="首页" />
    </Animated.View>
  );

  render() {
    const { news, loading } = this.props;
    return (
      <View style={styles.container}>
        <AnimatedList
          contentContainerStyle={styles.listContent}
          action={this.requestData}
          loading={loading}
          data={news}
          renderItem={this.renderItem}
          renderHeader={this.renderHeader}
          renderSeparator={this.renderSeparator}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: this.props.animateY },
                },
              },
            ],
            {
              useNativeDriver: true,
            },
          )}
        />
        {this.renderNavBar()}
      </View>
    );
  }
}
