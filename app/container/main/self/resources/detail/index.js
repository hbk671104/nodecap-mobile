import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  InteractionManager,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import Communications from 'react-native-communications';
import { Toast } from 'antd-mobile';

import { hasPermission } from 'component/auth/permission/lock';
import NavBar from 'component/navBar';
import Loading from 'component/uikit/loading';
import Touchable from 'component/uikit/touchable';
import ListItem from 'component/listItem';
import styles from './style';

@global.bindTrack({
  page: '人脉资源详情',
  name: 'App_HumanResourceDetailOperation',
})
@connect(({ resource, loading }) => ({
  data: R.pathOr(null, ['current'])(resource),
  loading: loading.effects['resource/get'],
}))
class ResourceDetail extends Component {
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
      this.props.dispatch({ type: 'resource/get', payload: item.id });
    }
  };

  goBack = () => {
    this.props.dispatch(NavigationActions.back());
  };

  clearData = () => {
    this.props.dispatch({ type: 'resource/clearCurrent' });
  };

  confirmDelete = () => {
    const item = this.props.navigation.getParam('item');
    if (item && item.id) {
      this.props.track('删除');
      Toast.loading('正在删除...', 0);
      this.props.dispatch({
        type: 'resource/delete',
        id: item.id,
        payload: item,
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
    Alert.alert('提示', `确认删除人脉 [${data.name}] 吗？`, [
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
      {hasPermission('resource-delete') && (
        <Touchable
          style={styles.navBar.right.group.container}
          onPress={this.handleDeletePress}
        >
          <Text style={styles.navBar.right.group.title}>删除</Text>
        </Touchable>
      )}
      {hasPermission('resource-update') && (
        <Touchable
          style={styles.navBar.right.group.container}
          onPress={this.handleEditPress}
        >
          <Text style={styles.navBar.right.group.title}>编辑</Text>
        </Touchable>
      )}
    </View>
  );

  render() {
    const item = this.props.navigation.getParam('item');
    const { data, loading } = this.props;
    const invalid = R.isNil(data) || loading;
    return (
      <View style={styles.container}>
        <NavBar
          gradient
          back
          title={item.name}
          renderRight={() => {
            if (invalid) {
              return null;
            }
            return this.renderNavBarRight();
          }}
        />
        {invalid ? (
          <Loading />
        ) : (
          <ScrollView>
            <ListItem
              disablePress
              title="姓名"
              titleStyle={styles.item.title}
              renderContent={() => this.renderContent(data.name)}
            />
            <ListItem
              disablePress
              title="类别"
              titleStyle={styles.item.title}
              renderContent={() => {
                if (R.isEmpty(data.types)) {
                  return this.renderContent(null);
                }
                return (
                  <View style={styles.typesContainer}>
                    {data.types.map(t => (
                      <View key={t.id} style={{ marginRight: 8 }}>
                        {this.renderContent(t.name)}
                      </View>
                    ))}
                  </View>
                );
              }}
            />
            <ListItem
              disablePress
              title="机构"
              titleStyle={styles.item.title}
              renderContent={() => this.renderContent(data.org)}
            />
            <ListItem
              disablePress
              title="职位"
              titleStyle={styles.item.title}
              renderContent={() => this.renderContent(data.title)}
            />
            <ListItem
              disablePress={!data.mobile}
              title="手机"
              titleStyle={styles.item.title}
              renderContent={() => this.renderContent(data.mobile)}
              onPress={() => Communications.phonecall(data.mobile, false)}
            />
            <ListItem
              disablePress
              title="微信"
              titleStyle={styles.item.title}
              renderContent={() => this.renderContent(data.wechat)}
            />
            <ListItem
              disablePress={!data.email}
              title="邮箱"
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
            <ListItem
              disablePress
              title="常驻地"
              titleStyle={styles.item.title}
              renderContent={() => this.renderContent(data.address)}
            />
            <ListItem
              disablePress
              title="备注"
              titleStyle={styles.item.title}
              renderContent={() => this.renderContent(data.comment)}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

export default ResourceDetail;
