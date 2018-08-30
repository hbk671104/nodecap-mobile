import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import Communications from 'react-native-communications';

import NavBar from 'component/navBar';
import Loading from 'component/uikit/loading';
import WebView from 'component/uikit/webview';
import Header from './header';
import styles from './style';

@connect(({ notification, loading }) => ({
  detail: R.pathOr({}, ['current'])(notification),
  loading: loading.effects['notification/get'],
}))
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
    Communications.web(link);
  };

  renderContent = () => {
    const { detail } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header data={detail} onLinkPress={this.handleLinkPress} />
        <WebView
          scalesPageToFit={false}
          style={{ paddingLeft: 12 }}
          source={{ html: detail.content }}
        />
      </View>
    );
  };

  render() {
    const { loading } = this.props;
    return (
      <View style={styles.container}>
        <NavBar back gradient title="上币公告" />
        {loading ? <Loading /> : this.renderContent()}
      </View>
    );
  }
}
