import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  InteractionManager,
  Alert,
  Clipboard,
} from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import Communications from 'react-native-communications';
import { Toast } from 'antd-mobile';

import { hasPermission } from 'component/auth/permission/lock';
import NavBar from 'component/navBar';
import Avatar from 'component/uikit/avatar';
import Loading from 'component/uikit/loading';
import Touchable from 'component/uikit/touchable';
import ListItem from 'component/listItem';
import styles from './style';
import { isMoment } from 'moment';

@global.bindTrack({
  page: '我的同事详情',
  name: 'App_ColleagueDetailOperation',
})
@connect(({ colleague, loading }) => ({
  data: R.pathOr(null, ['current'])(colleague),
  loading: loading.effects['colleague/get'],
}))
class ColleagueDetail extends Component {
  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.loadData();
    });
  }

  componentWillUnmount() {
    this.clearData();
  }

  loadData = () => {
    const item = this.props.navigation.getParam('item');
    if (item && item.id) {
      this.props.dispatch({ type: 'colleague/get', payload: item.id });
    }
  };

  goBack = () => {
    this.props.dispatch(NavigationActions.back());
  };

  clearData = () => {
    this.props.dispatch({ type: 'colleague/clearCurrent' });
  };

  confirmDelete = () => {
    const item = this.props.navigation.getParam('item');
    if (item && item.id) {
      this.props.track('删除');
      Toast.loading('正在删除...', 0);
      this.props.dispatch({
        type: 'colleague/delete',
        payload: item.id,
        callback: () => {
          Toast.hide();
          this.goBack();
        },
      });
    }
  };

  handleEditPress = () => {
    const { data } = this.props;
    this.props.track('编辑');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ResourceAdd',
        params: {
          default: data,
        },
      }),
    );
  };

  handleDeletePress = () => {
    const { data } = this.props;
    Alert.alert('提示', `确认删除同事 「${data.realname}」 吗？`, [
      { text: '确认', onPress: this.confirmDelete },
      { text: '取消', style: 'cancel' },
    ]);
  };

  renderContent = content => (
    <View style={styles.item.content.container}>
      <Text
        style={[
          styles.item.content.text,
          !content && { color: 'rgba(0, 0, 0, 0.45)' },
        ]}
      >
        {content || '未填写'}
      </Text>
    </View>
  );

  renderNavBarRight = () => (
    <View style={styles.navBar.right.container}>
      {hasPermission('user-delete') && (
        <Touchable
          style={styles.navBar.right.group.container}
          onPress={this.handleDeletePress}
        >
          <Text style={styles.navBar.right.group.title}>删除</Text>
        </Touchable>
      )}
      {hasPermission('user-update') && (
        <Touchable
          style={styles.navBar.right.group.container}
          onPress={this.handleEditPress}
        >
          <Text style={styles.navBar.right.group.title}>编辑</Text>
        </Touchable>
      )}
    </View>
  );

  renderNavBarBottom = () => {
    const item = this.props.navigation.getParam('item');
    return (
      <View style={styles.navBar.bottom.container}>
        <Avatar
          raised={false}
          resizeMode="cover"
          source={{ uri: item.avatar_url }}
          size={84}
          innerRatio={0.94}
        />
        <View style={styles.navBar.bottom.title.container}>
          <Text style={styles.navBar.bottom.title.text}>{item.realname}</Text>
        </View>
      </View>
    );
  };

  render() {
    const { data, loading } = this.props;
    const invalid = R.isNil(data) || loading;
    return (
      <View style={styles.container}>
        <NavBar
          gradient
          back
          renderRight={() => {
            if (invalid) {
              return null;
            }
            return this.renderNavBarRight();
          }}
          renderBottom={this.renderNavBarBottom}
        />
        {invalid ? (
          <Loading />
        ) : (
          <ScrollView>
            <ListItem
              disablePress
              title="角色"
              titleStyle={styles.item.title}
              renderContent={() => this.renderContent(data.role)}
            />
            <ListItem
              disablePress={!data.mobile}
              title="手机号"
              titleStyle={styles.item.title}
              renderContent={() => this.renderContent(data.mobile)}
              onPress={() => Communications.phonecall(data.mobile, false)}
            />
            <ListItem
              disablePress={!data.email}
              title="账号"
              titleStyle={styles.item.title}
              renderContent={() => this.renderContent(data.email)}
              onPress={() =>
                Communications.email(
                  data.email,
                  null,
                  null,
                  'From Hotnode',
                  null,
                )
              }
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

export default ColleagueDetail;
