import React, { Component } from 'react';
import { View, Alert, ScrollView, Text, Clipboard } from 'react-native';
import { Flex, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import * as WeChat from 'react-native-wechat';
import Communications from 'react-native-communications';
import Config from 'runtime/index';
import shareModal from 'component/shareModal';

import NavBar from 'component/navBar';
import Item from 'component/self/item';
import Header from './header';
import styles from './style';

@global.bindTrack({
  page: '我的模块',
  name: 'App_MineOperation',
})
@connect(({ user, login, loading }) => ({
  user: user.currentUser,
  isLogin: !!login.token,
  loading: loading.effects['login/switch'],
}))
@shareModal
class Self extends Component {
  onPressShare = () => {
    const request = {
      webpageUrl:
        'http://a.app.qq.com/o/simple.jsp?pkgname=com.nodecap.hotnode',
      title: '推荐「Hotnode」给你',
      description:
        '找项目，上 Hotnode！Hotnode 是一款为区块链项目方和服务方提供数据服务的综合性平台。',
      thumbImage:
        'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/logo_200x200.png',
    };

    this.props.openShareModal({
      types: [{
        type: 'timeline',
        ...request,
      }, {
        type: 'session',
        ...request,
      }],
      onOpen: () => {
        this.props.navigation.dispatch(
          NavigationActions.setParams({
            params: { tabBarVisible: false },
            key: 'Self',
          }),
        );
      },
      onClose: () => {
        this.props.navigation.dispatch(
          NavigationActions.setParams({
            params: { tabBarVisible: true },
            key: 'Self',
          }),
        );
      },
    });
  }

  handleSettingsPress = () => {
    this.props.track('设置');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Settings',
      }),
    );
  };

  handleHeaderPress = () => {
    if (this.props.isLogin) {
      this.props.track('个人信息卡片');
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'MyProfile',
        }),
      );
    } else {
      this.props.track('登录');
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      );
    }
  };

  handleFeedbackPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Feedback',
      }),
    );
  };

  handleMyProjectPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: this.props.isLogin ? 'MyProject' : 'Login',
      }),
    );
  };

  handleInstitutionJoinPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: this.props.isLogin ? 'MyInstitution' : 'Login',
      }),
    );
  };

  handleFavoredPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: this.props.isLogin ? 'Favored' : 'Login',
      }),
    );
  };

  handleSwitchEndPress = () => {
    if (
      R.pipe(
        R.pathOr({}, ['user', 'companies']),
        R.isEmpty,
      )(this.props)
    ) {
      Alert.alert('您尚未加入任何机构', '入驻请联系 18500193244', [
        {
          text: '拨打',
          onPress: () => Communications.phonecall('185-0019-3244', false),
        },
        {
          text: '取消',
          style: 'cancel',
        },
      ]);
      return;
    }

    Alert.alert('提示', '是否切换至「机构版」？', [
      {
        text: '切换',
        onPress: () => this.props.dispatch({ type: 'login/switch' }),
      },
      {
        text: '取消',
        style: 'cancel',
      },
    ]);
  };

  handleWechatPress = () => {
    Clipboard.setString('ladh2857');
    Toast.show('已复制', Toast.SHORT, false);
  };

  renderWechat() {
    return (
      <Flex>
        <Text style={styles.wechatNumber}>ladh2857</Text>
        <Text style={styles.wechatCopy}>复制</Text>
      </Flex>
    );
  }

  render() {
    const { isLogin, loading } = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          hidden
          barStyle="dark-content"
          renderBottom={() => (
            <View>
              <Header {...this.props} onPress={this.handleHeaderPress} />
              <View style={styles.divider} />
            </View>
          )}
        />
        <ScrollView contentContainerStyle={styles.scroll.content}>
          <Item
            icon={require('asset/mine/my_project.png')}
            title="我的项目"
            titleStyle={styles.item.title}
            onPress={this.handleMyProjectPress}
          />
          <Item
            icon={require('asset/mine/my_institution.png')}
            title="我的机构"
            titleStyle={styles.item.title}
            onPress={this.handleInstitutionJoinPress}
          />
          <View style={styles.scroll.divider} />
          <Item
            icon={require('asset/mine/favored.png')}
            title="我的关注"
            titleStyle={styles.item.title}
            onPress={this.handleFavoredPress}
          />
          <Item
            icon={require('asset/mine/feedback.png')}
            title="意见反馈"
            titleStyle={styles.item.title}
            onPress={this.handleFeedbackPress}
          />
          <View style={styles.scroll.divider} />
          <Item
            icon={require('asset/mine/share_hotnode.png')}
            title="分享 Hotnode"
            titleStyle={styles.item.title}
            onPress={this.onPressShare}
          />
          <Item
            icon={require('asset/mine/wechat.png')}
            title="加微信群"
            titleStyle={styles.item.title}
            renderRight={this.renderWechat}
            onPress={this.handleWechatPress}
          />
          <View style={styles.scroll.divider} />
          {isLogin && (
            <Item
              loading={loading}
              icon={require('asset/mine/switch_end.png')}
              title="切换至机构版"
              titleStyle={styles.item.title}
              onPress={this.handleSwitchEndPress}
            />
          )}
          <Item
            icon={require('asset/mine/settings.png')}
            title="设置"
            titleStyle={styles.item.title}
            onPress={this.handleSettingsPress}
          />
        </ScrollView>
      </View>
    );
  }
}

export default Self;
