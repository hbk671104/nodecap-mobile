import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import List from 'component/uikit/list';
import InstitutionItem from 'component/institution/item';

import styles from './style';

@global.bindTrack({
  page: '找服务',
  name: 'App_ServiceOperation',
  subModuleName: '列表',
})
@connect(({ service, loading }, { type }) => {
  return {
    data: R.pathOr([], ['list', type, 'data'])(service),
    pagination: R.pathOr(null, ['list', type, 'pagination'])(service),
    loading: loading.effects['service/fetch'],
  };
})
export default class ServiceList extends Component {
  requestData = (page, size) => {
    this.props.dispatch({
      type: 'service/fetch',
      payload: {
        type: this.props.type,
        page,
        'per-page': size,
      },
    });
  };

  handleItemPress = item => () => {
    this.props.track('点击进入详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'InstitutionDetail',
        params: {
          id: item.id,
        },
        key: `InstitutionDetail_${item.id}`,
      }),
    );
  };

  renderItem = ({ item }) => (
    <InstitutionItem data={item} onPress={this.handleItemPress(item)} />
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { data, loading, pagination } = this.props;
    return (
      <View style={styles.container}>
        <List
          contentContainerStyle={styles.list.content}
          action={this.requestData}
          loading={loading}
          data={data}
          pagination={pagination}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}
