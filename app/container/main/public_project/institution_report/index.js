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
@connect(({ public_project, loading }) => ({
  data: R.pathOr([{ id: 0 }, { id: 1 }, { id: 2 }], ['report'])(public_project),
  // loading: loading.effects['notification/fetch'],
}))
export default class InstitutionReport extends Component {
  requestData = (page, size, callback) => {
    this.props.dispatch({
      type: 'notification/fetch',
    });
  };

  handleItemPress = id => () => {
    this.props.track('点击进入详情');
    // this.props.dispatch(
    //   NavigationActions.navigate({
    //     routeName: 'NotificationDetail',
    //     params: {
    //       id,
    //     },
    //   }),
    // );
  };

  renderItem = ({ item }) => <InstitutionReportItem data={item} />;

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { data, loading } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient back title="火币研究院" />
        <List
          contentContainerStyle={styles.list.content}
          // action={this.requestData}
          loading={loading}
          data={data}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}
