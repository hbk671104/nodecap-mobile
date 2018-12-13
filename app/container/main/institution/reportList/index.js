import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import InstitutionReportItem from '../../../../component/public_project/report_item';
import styles from '../../public_project/institution_report/style';
import List from '../../../../component/uikit/list';
import Header from '../detail/header';
import Touchable from '../../../../component/uikit/touchable';
import NavBar from '../../../../component/navBar';

@global.bindTrack({
  page: '研报机构报告列表',
  name: 'App_InstitutionReportListOperation',
})
@connect(({ institution, loading }, props) => {
  const id = props.navigation.getParam('id');
  return {
    data: R.pathOr([], ['current', id, 'reports', 'data'])(institution),
    pagination: R.pathOr(null, ['current', id, 'reports', 'pagination'])(institution),
    loading: loading.effects['institution/fetchReportsByInstitutionID'],
  };
})
class InstitutionReportsList extends Component {
  requestData = (page, size) => {
    this.props.dispatch({
      type: 'institution/fetchReportsByInstitutionID',
      id: this.props.navigation.getParam('id'),
      payload: {
        currentPage: page,
        pageSize: size,
      },
    });
  };

  handleItemPress = item => {
    this.props.track('点击进入详情');
    this.props.dispatch({
      type: 'institution/setReportRead',
      id: item.id,
    });
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'InstitutionReportDetail',
        params: {
          id: item.id,
        },
      }),
    );
  };

  renderItem = ({ item }) => {
    return (
      <InstitutionReportItem
        isRead={false}
        data={item}
        onPress={this.handleItemPress}
      />
    );
  };

  render() {
    const { data, loading, pagination } = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          back
          title="全部研报"
        />
        <List
          contentContainerStyle={styles.list.content}
          action={this.requestData}
          loading={loading}
          data={data}
          pagination={pagination}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

InstitutionReportsList.propTypes = {};
InstitutionReportsList.defaultProps = {};

export default InstitutionReportsList;
