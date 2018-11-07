import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import NavBar from 'component/navBar';
import Empty from 'component/empty';
import List from 'component/uikit/list';
import FavoredItem from 'component/favored/item';

import styles from './style';

@connect(({ favored, loading }) => ({
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
    return (
      <View style={styles.container}>
        <NavBar back gradient title="我的关注" />
        {this.renderList()}
      </View>
    );
  }
}

export default Favored;
