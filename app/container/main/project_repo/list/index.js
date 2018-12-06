import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { EventEmitter } from 'fbemitter';
import debounce from 'lodash-decorators/debounce';
import bind from 'lodash-decorators/bind';

import List from 'component/uikit/list';
import FavorItem from 'component/favored/item';

import { handleSelection as selection } from 'utils/utils';
import Header from './header';
import styles from '../style';

export const emitter = new EventEmitter();

@global.bindTrack({
  page: '项目大全列表',
  name: 'App_ProjectRepoListOperation',
})
@connect(({ public_project, loading }) => ({
  data: R.pathOr([], ['list', 'index', 'data'])(public_project),
  pagination: R.pathOr(null, ['list', 'index', 'pagination'])(public_project),
  count: R.pathOr(0, ['list', 'count'])(public_project),
  params: R.pathOr({}, ['list', 'params'])(public_project),
  loading: loading.effects['public_project/fetch'],
}))
export default class ProjectList extends Component {
  componentWillMount() {
    emitter.addListener('shouldScroll', () => {
      if (this.listRef) {
        this.listRef.scrollToOffset({ offset: 0, animated: false });
      }
    });
  }

  requestData = (page, size) => {
    const { params } = this.props;
    this.props.dispatch({
      type: 'public_project/fetch',
      params: {
        ...params,
        currentPage: page,
        pageSize: size,
      },
    });
  };

  @bind()
  @debounce(150)
  handleSelection({ value, name, key }) {
    const { params, track } = this.props;
    track('筛选项点击', { name });
    this.props.dispatch({
      type: 'public_project/fetch',
      params: {
        ...params,
        [key]: selection(params, { key, value }),
      },
    });
  }

  handleMiscSelection = ({ value, key, name }) => {
    this.props.track('筛选项点击', { name });
    this.props.dispatch({
      type: 'public_project/fetch',
      params: {
        ...this.props.params,
        [key]: value,
      },
    });
  };

  handleItemPress = item => () => {
    this.props.track('点击进入详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PublicProjectDetail',
        params: {
          id: item.id,
        },
      }),
    );
  };

  handleFilterPress = () => {
    this.props.drawerRef.openDrawer();
  };

  renderItem = ({ item }) => (
    <FavorItem data={item} onPress={this.handleItemPress(item)} />
  );

  renderSeparator = () => <View style={styles.separator} />;

  renderHeader = () => {
    return (
      <Header
        {...this.props}
        selection={this.props.params}
        onFilterPress={this.handleFilterPress}
        onSelect={this.handleMiscSelection}
      />
    );
  };

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <List
          listRef={ref => {
            this.listRef = ref;
          }}
          contentContainerStyle={styles.listContainer}
          action={this.requestData}
          data={data}
          pagination={pagination}
          loading={loading}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}
