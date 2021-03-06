import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import HtmlWrapper from '../../../../services/htmlWraper';
import NavBar from 'component/navBar';
import Loading from 'component/uikit/loading';
import WebView from 'component/uikit/webview';
import shareModal from 'component/shareModal';
import FavorItem from 'component/favored/notification';
import ShareNews from '../../announcement/shareAnnouncement';
import Header from './header';
import styles from './style';

@global.bindTrack({
  page: '通知详情',
  name: 'App_NotificationDetailOperation',
})
@connect(({ notification, loading }) => ({
  detail: R.pathOr({}, ['current'])(notification),
  loading: loading.effects['notification/get'],
}))
@shareModal
export default class NotificationDetail extends Component {
  componentWillMount() {
    this.loadDetail();
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'notification/clearCurrent',
    });
  }

  loadDetail = () => {
    const id = this.props.navigation.getParam('id');
    this.props.dispatch({
      type: 'notification/get',
      payload: id,
    });
  };

  handleLinkPress = link => () => {
    this.props.track('查看原文');
    const { detail } = this.props;
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'NotificationDetailRaw',
        params: {
          uri: link,
          title: detail.title,
        },
      }),
    );
  };

  openShareModal = () => {
    this.props.openShareModal({
      types: [
        {
          type: 'picture',
        },
      ],
    });
  };

  renderContent = () => {
    const { detail } = this.props;
    const coin_detail = R.path(['coin_detail'])(detail);
    return (
      <View style={{ flex: 1 }}>
        <Header data={detail} onLinkPress={this.handleLinkPress} />
        <WebView
          scalesPageToFit={false}
          source={{ html: HtmlWrapper(detail.content) }}
        />
        {!!coin_detail && (
          <View style={{ paddingBottom: getBottomSpace() }}>
            <View style={{ paddingHorizontal: 12, paddingTop: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'rgba(0, 0, 0, 0.85)',
                }}
              >
                相关项目
              </Text>
            </View>
            <FavorItem data={R.pathOr({}, ['coin_detail'])(detail)} />
          </View>
        )}
      </View>
    );
  };

  render() {
    const { loading, detail } = this.props;
    const invalid = loading || R.isEmpty(detail);
    const type = R.pathOr('', ['type'])(detail);
    return (
      <View style={styles.container}>
        <NavBar
          back
          gradient
          title={type}
          renderRight={() => (
            <TouchableWithoutFeedback onPress={this.openShareModal}>
              <View>
                <Text style={{ fontSize: 14, color: '#FFFFFF' }}>分享</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
        {invalid ? <Loading /> : this.renderContent()}
        <ShareNews
          visible={this.props.showSharePictureModal}
          news={this.props.detail}
          onClose={() => {
            this.props.toggleSharePictureModal(false);
          }}
        />
      </View>
    );
  }
}
