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
@connect(({ institution, loading }, props) => {
  const item = props.navigation.getParam('item');
  return {
    data: R.pathOr([], ['report', 'data'])(institution),
    pagination: R.pathOr({}, ['report', 'pagination'])(institution),
    loading: loading.effects['institution/fetchReports'],
    institution: item,
  };
})
export default class InstitutionReport extends Component {
  componentWillUnmount() {
    this.props.dispatch({
      type: 'institution/clearReport',
    });
  }

  requestData = (page, size) => {
    this.props.dispatch({
      type: 'institution/fetchReports',
      payload: {
        currentPage: page,
        pageSize: size,
      },
      id: this.props.institution.id,
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
        },
      }),
    );
  };

  renderItem = ({ item }) => (
    <InstitutionReportItem
      data={item}
      institution={this.props.institution}
      onPress={this.handleItemPress}
    />
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { data, loading, pagination, institution } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient back title={institution.name} />
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
