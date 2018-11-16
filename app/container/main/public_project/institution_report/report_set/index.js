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

import Config from '../../../../../runtime';
import styles from './style';
import * as Wechat from 'react-native-wechat';

@global.bindTrack({
  page: '研报集',
  name: 'App_InstitutionReportSetOperation',
})
@connect(({ institution, loading }, props) => {
  const id = props.navigation.getParam('id');
  return {
    id,
    title: R.pipe(
      R.pathOr([], ['banner', 'data']),
      R.find(i => Number(i.id) === Number(id)),
      R.pathOr('', ['name']),
    )(institution),
    data: R.pathOr([], ['report_set', id, 'data'])(institution),
    pagination: R.pathOr(null, ['report', id, 'pagination'])(institution),
    loading: loading.effects['institution/fetchReportSet'],
  };
})
@connectActionSheet
export default class InstitutionReportSet extends Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'institution/fetchReports',
      refreshLastCount: true,
    });
  }

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
        const request = {
          type: 'news',
          webpageUrl: `${Config.MOBILE_SITE}/report-set?id=${this.props.id}`,
          title: `「研报集」${this.props.title}`,
          description: '来 Hotnode, 发现最新最热研报集！',
          thumbImage:
            'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/pdf.png',
        };

        switch (buttonIndex) {
          case 0:
            Wechat.shareToTimeline(request);
            break;
          case 1:
            Wechat.shareToSession(request);
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
