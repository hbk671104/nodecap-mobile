import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import R from 'ramda';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import List from 'component/uikit/list';
import InstitutionReportItem from 'component/public_project/report_item';

import styles from './style';

@global.bindTrack({
  page: '研报集',
  name: 'App_InstitutionReportSetOperation',
})
@connect(({ institution, loading }, props) => {
  const { id, name } = props.navigation.getParam('item');
  return {
    id,
    title: name,
    data: R.pathOr([], ['report_set', id, 'data'])(institution),
    pagination: R.pathOr(null, ['report', id, 'pagination'])(institution),
    loading: loading.effects['institution/fetchReportSet'],
  };
})
@connectActionSheet
export default class InstitutionReportSet extends Component {
  requestData = (page, size) => {
    this.props.dispatch({
      type: 'institution/fetchReportSet',
      payload: {
        set_id: this.props.id,
        page,
        'per-page': size,
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

  handleSharePress = () => {
    this.props.showActionSheetWithOptions(
      {
        options: ['分享至朋友圈', '分享至微信', '取消'],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            // this.props.setCurrentItem({ item, icon }, this.toggleVisible);
            break;
          case 1:
            // this.handleResetPress(item);
            break;
          case 2:
            break;
          default:
            break;
        }
      },
    );
  };

  renderItem = ({ item }) => (
    <InstitutionReportItem data={item} onPress={this.handleItemPress} />
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { data, loading, pagination, title } = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          gradient
          back
          title={title}
          renderRight={() => (
            <Touchable onPress={this.handleSharePress}>
              <Text style={styles.right.text}>分享研报集</Text>
            </Touchable>
          )}
        />
        <List
          contentContainerStyle={styles.list.content}
          action={this.requestData}
          loading={loading}
          data={data}
          pagination={pagination}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
          renderHeader={this.renderHeader}
        />
      </View>
    );
  }
}
