import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import searchable from 'component/searchableList';
import InstitutionItem from 'component/institution/item';
import { NavigationActions } from 'react-navigation';

import ServiceList from './index';
import styles from './style';

@global.bindTrack({
  page: '找服务',
  name: 'App_ServiceOperation',
})
@connect(({ global, service, loading }, { navigation }) => {
  return ({
    type: R.pipe(
      R.pathOr([], ['constants', 'industry_type']),
      R.find(t => t.value === navigation.getParam('type')),
    )(global),
    searchData: R.pathOr([], ['search', String(navigation.getParam('type')), 'data'])(service),
    searchPagination: R.pathOr(null, ['search', String(navigation.getParam('type')), 'pagination'])(service),
    searchLoading: loading.effects['service/search'],
  });
})
@searchable((props) => ({
  name: R.path(['type', 'name'])(props),
  data: props.searchData,
  pagination: props.searchPagination,
  loading: props.searchLoading,
  action: ({ page, size, searchText }) => {
    if (!searchText) {
      props.dispatch({
        type: 'service/clearSearch',
        payload: {
          type: R.path(['type', 'value'])(props),
        },
      });
    } else {
      props.dispatch({
        type: 'service/search',
        payload: {
          type: R.path(['type', 'value'])(props),
          q: searchText,
          page,
          'per-page': size,
        },
      });
    }
  },
  renderItem: ({ item }) => {
    const handleItemPress = () => {
      props.track('点击进入详情');
      props.dispatch(
        NavigationActions.navigate({
          routeName: 'InstitutionDetail',
          params: {
            id: item.id,
          },
          key: `InstitutionDetail_${item.id}`,
        }),
      );
    };

    return (
      <InstitutionItem key={item.id} data={item} onPress={handleItemPress} />
    );
  },
}))
export default class ServiceSinglePage extends Component {
  componentDidMount() {
    this.props.track(`进入${R.path(['type', 'name'])(this.props)}`);
  }
  render() {
    return (
      <View style={styles.container}>
        <ServiceList
          type={R.path(['type', 'value'])(this.props)}
        />
      </View>
    );
  }
}
