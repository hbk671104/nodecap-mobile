import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import PublicProjectItem from 'component/public_project/item';

import Header from './header';
import styles from './style';

@global.bindTrack({
  page: '项目公海',
  name: 'App_PublicProjectOperation',
})
@connect(({ public_project, institution, loading }) => ({
  data: R.pathOr([], ['list'])(public_project),
  institution: R.pathOr([], ['list', 'data'])(institution),
  loading: loading.effects['public_project/fetch'],
}))
export default class PublicProject extends Component {
  requestData = (page, size) => {
    this.props.dispatch({
      type: 'public_project/fetch',
      payload: {
        currentPage: page,
        pageSize: size,
      },
    });
  };

  handleItemPress = id => () => {
    this.props.track('点击进入详情');
    // this.props.dispatch(
    //   NavigationActions.navigate({
    //     routeName: 'NotificationDetail',
    //     params: {
    //       id,
    //     },
    //   }),
    // );
  };

  handleInstitutionItemPress = item => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'InstitutionReport',
        params: {
          item,
        },
      }),
    );
  };

  renderItem = ({ item }) => (
    <PublicProjectItem
      style={styles.item}
      data={item}
      onPress={this.handleItemPress}
    />
  );

  renderHeader = () => (
    <Header
      style={styles.header}
      data={this.props.institution}
      onItemPress={this.handleInstitutionItemPress}
    />
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { data, loading } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient title="项目公海" />
        <List
          style={styles.list}
          contentContainerStyle={styles.listContent}
          action={this.requestData}
          loading={loading}
          data={data}
          renderItem={this.renderItem}
          renderHeader={this.renderHeader}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}
