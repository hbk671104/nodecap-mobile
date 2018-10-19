import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import InstitutionReportItem from 'component/public_project/report_item';

import styles from './style';

@global.bindTrack({
  page: '项目公海机构报告',
  name: 'App_PublicProjectInstitutionReportOperation',
})
@connect(({ institution, loading }) => {
  return {
    data: R.pathOr([], ['report', 'data'])(institution),
    pagination: R.pathOr(null, ['report', 'pagination'])(institution),
    loading: loading.effects['institution/fetchReports'],
  };
})
export default class InstitutionReport extends Component {
  requestData = (page, size) => {
    this.props.dispatch({
      type: 'institution/fetchReports',
      payload: {
        currentPage: page,
        pageSize: size,
      },
    });
  };

  handleItemPress = item => {
    this.props.track('点击进入详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'InstitutionReportDetail',
        params: {
          pdf_url: item.pdf_url,
          title: item.title,
          id: item.id,
        },
      }),
    );
  };

  renderItem = ({ item }) => (
    <InstitutionReportItem data={item} onPress={this.handleItemPress} />
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { data, loading, pagination } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient back title="研报" />
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
