import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';

import { hasPermission } from 'component/auth/permission/lock';
import List from 'component/uikit/list';
import ResourceItem from 'component/resources/item';

@global.bindTrack({
  page: '人脉资源库',
  name: 'App_HumanResourceOperation',
})
@connect(({ resource, loading }, { type }) => ({
  data: R.pathOr(null, ['list', type, 'index', 'data'])(resource),
  pagination: R.pathOr(null, ['list', type, 'index', 'pagination'])(resource),
  params: R.pathOr(null, ['list', type, 'params'])(resource),
  loading: loading.effects['resource/index'],
}))
export default class ResourceList extends Component {
  requestData = (page, size) => {
    const { type } = this.props;
    this.props.dispatch({
      type: 'resource/index',
      payload: {
        type,
        currentPage: page,
        pageSize: size,
      },
    });
  };

  handleItemPress = item => () => {
    if (!hasPermission('resource-view')) {
      return;
    }
    this.props.track('项目卡片', { subModuleName: this.props.type });
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ResourceDetail',
        params: {
          item,
        },
      }),
    );
  };

  renderItem = ({ item }) => (
    <ResourceItem data={item} onPress={this.handleItemPress(item)} />
  );

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <View style={styles.container}>
        <List
          action={this.requestData}
          data={data}
          pagination={pagination}
          loading={loading}
          renderItem={this.renderItem}
          onMomentumScrollBegin={this.props.onMomentumScrollBegin}
          onMomentumScrollEnd={this.props.onMomentumScrollEnd}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
};
