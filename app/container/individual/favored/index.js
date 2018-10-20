import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import Empty from 'component/empty';
import List from 'component/uikit/list';
import FavoredItem, { itemHeight } from 'component/favored/item';

import styles from './style';

@connect(({ login, favored, loading }) => ({
  logged_in: !!login.token,
  data: R.pathOr([], ['list', 'data'])(favored),
  pagination: R.pathOr(null, ['list', 'pagination'])(favored),
  loading: loading.effects['favored/fetch'],
}))
@global.bindTrack({
  page: '已关注列表',
  name: 'App_FavoredOperation',
})
class Favored extends Component {
  requestData = (page, size) => {
    this.props.dispatch({
      type: 'favored/fetch',
      payload: {
        currentPage: page,
        pageSize: size,
      },
    });
  };

  handleLoginPress = () => {
    this.props.track('点击登录按钮');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Login',
      }),
    );
  };

  renderLogin = () => (
    <Empty
      image={require('asset/empty/unlogged_in.png')}
      title="登录后可查看我关注的项目"
      action={this.handleLoginPress}
    />
  );

  renderItem = ({ item }) => (
    <FavoredItem
      data={{
        ...item,
        is_focused: true,
      }}
    />
  );

  renderSeparator = () => <View style={styles.separator} />;

  renderList = () => {
    const { data, pagination, loading } = this.props;
    return (
      <List
        itemHeight={itemHeight}
        contentContainerStyle={styles.listContent}
        action={this.requestData}
        loading={loading}
        pagination={pagination}
        data={data}
        renderItem={this.renderItem}
        renderSeparator={this.renderSeparator}
      />
    );
  };

  render() {
    const { logged_in } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient title="关注" />
        {logged_in ? this.renderList() : this.renderLogin()}
      </View>
    );
  }
}

export default Favored;
