import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import Swiper from 'react-native-swiper';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import Touchable from 'component/uikit/touchable';
import InstitutionReportItem from 'component/public_project/report_item';
import PaginationIndicator from 'component/pagination_indicator';

import styles from './style';

@global.bindTrack({
  page: '项目公海机构报告',
  name: 'App_PublicProjectInstitutionReportOperation',
})
@connect(({ institution, loading }) => {
  return {
    data: R.pathOr([], ['report', 'data'])(institution),
    pagination: R.pathOr(null, ['report', 'pagination'])(institution),
    banner: R.pathOr([], ['banner', 'data'])(institution),
    loading: loading.effects['institution/fetchReports'],
    hasReadReports: R.pathOr([], ['has_read_reports'])(institution),
  };
})
export default class InstitutionReport extends Component {
  requestData = (page, size) => {
    this.props.dispatch({
      type: 'institution/fetchReports',
      refreshLastCount: true,
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
          pdf_url: item.pdf_url,
          title: item.title,
          id: item.id,
        },
      }),
    );
  };

  handleBannerPress = item => () => {
    this.props.track('Banner 点击');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'InstitutionReportSet',
        params: {
          id: item.id,
        },
      }),
    );
  };

  renderItem = ({ item }) => {
    const isRead = R.contains(item.id)(this.props.hasReadReports);
    return (
      <InstitutionReportItem
        isRead={isRead}
        data={item}
        onPress={this.handleItemPress}
      />
    );
  };

  renderSeparator = () => <View style={styles.separator} />;

  renderHeader = () => {
    const { banner } = this.props;
    if (R.isEmpty(banner)) {
      return null;
    }
    return (
      <View style={styles.swiper.container}>
        <Swiper
          paginationStyle={styles.swiper.pagination}
          dotColor="rgba(255, 255, 255, 0.4)"
          activeDotColor="white"
          autoplay
          height={65}
          renderPagination={(index, total) => (
            <PaginationIndicator index={index} total={total} />
          )}
          removeClippedSubviews={false}
        >
          {R.map(i => (
            <Touchable
              key={i.id}
              style={styles.swiper.item.container}
              onPress={this.handleBannerPress(i)}
            >
              <Image
                style={styles.swiper.item.image}
                source={{ uri: i.banner }}
              />
            </Touchable>
          ))(banner)}
        </Swiper>
      </View>
    );
  };

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
          renderHeader={this.renderHeader}
          extraData={this.props.hasReadReports}
        />
      </View>
    );
  }
}
