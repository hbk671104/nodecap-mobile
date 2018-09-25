import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import NewsItem from 'component/news';

import List from './components/list';
import Header from './header';
import styles from './style';

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

  renderNavBar = () => <NavBar gradient />;

  render() {
    const { news, loading } = this.props;
    return (
      <View style={styles.container}>
        {/* {this.renderNavBar()} */}
        <List
          contentContainerStyle={styles.listContent}
          action={this.requestData}
          loading={loading}
          data={news}
          renderItem={this.renderItem}
          renderHeader={this.renderHeader}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}
