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

@connect(({ login, favored }) => ({
  logged_in: !!login.token,
  data: R.pathOr([{ id: 1 }, { id: 2 }, { id: 3 }], ['list', 'data'])(favored),
  pagination: R.pathOr(null, ['list', 'pagination'])(favored),
}))
class Favored extends Component {
  requestData = (page, size) => {
    // this.props.dispatch({
    //   type: 'portfolio/index',
    //   payload: {
    //     currentPage: page,
    //     pageSize: size,
    //   },
    // });
  };

  handleLoginPress = () => {
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

  renderItem = ({ item }) => <FavoredItem data={item} />;

  renderSeparator = () => <View style={styles.separator} />;

  renderList = () => {
    const { data, pagination } = this.props;
    return (
      <List
        itemHeight={itemHeight}
        contentContainerStyle={styles.listContent}
        action={this.requestData}
        // loading={loading}
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
