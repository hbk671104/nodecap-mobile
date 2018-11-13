import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../style';
import List from 'component/uikit/list';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import R from 'ramda';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import WeeklyReportItem from './item';

@global.bindTrack({
  page: '周报管理',
  name: 'App_WeeklyReportsOperation',
})
@connect(({ project_create, loading }) => ({
  data: R.pathOr([], ['list', 'data'])(project_create),
  pagination: R.pathOr(null, ['list', 'pagination'])(project_create),
  loading: loading.effects['project_create/fetch'],
}))
class ReportList extends Component {
  handleCreatePress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'CreateWeeklyReport',
      }),
    );
  }
  requestData = (page, size) => {
    this.props.dispatch({
      type: 'project_create/fetch',
      payload: {
        page,
        'per-page': size,
      },
    });
  };
  renderNavBar = () => (
    <NavBar
      back
      gradient
      title="我的项目"
      renderRight={() => (
        <Touchable borderless onPress={this.handleCreatePress}>
          <Text style={styles.navBar.right}>发布新周报</Text>
        </Touchable>
      )}
    />
  );

  renderItem = ({ item }) => (
    <WeeklyReportItem
      data={item}
    />
  );

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <List
          loading={loading}
          action={this.requestData}
          pagination={pagination}
          data={[{}, {}]}
          renderItem={this.renderItem}
          style={styles.container}
        />
      </View>
    );
  }
}

ReportList.propTypes = {};
ReportList.defaultProps = {};

export default ReportList;
