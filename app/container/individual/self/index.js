import React, { Component } from 'react';
import {
  View,
  Alert,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Clipboard,
} from 'react-native';
import { Flex, Toast } from 'antd-mobile';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import * as WeChat from 'react-native-wechat';
import Communications from 'react-native-communications';

import NavBar from 'component/navBar';
import Item, { StaticItem } from 'component/self/item';
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
@connectActionSheet
class Self extends Component {
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

  handleShare = () => {
    this.props.showActionSheetWithOptions(
      {
        options: ['分享至朋友圈', '分享至微信', '取消'],
        cancelButtonIndex: 2,
      },
      index => {
        const request = {
          type: 'news',
          webpageUrl:
            'http://a.app.qq.com/o/simple.jsp?pkgname=com.nodecap.hotnode',
          title: '推荐「Hotnode」给你',
          description:
            '找项目，上 Hotnode！Hotnode 是一款为区块链项目方和服务方提供数据服务的综合性平台。',
          thumbImage:
            'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/logo_200x200.png',
        };
        switch (index) {
          case 0:
            WeChat.shareToTimeline(request);
            break;
          case 1:
            WeChat.shareToSession(request);
            break;
          default:
            break;
        }
      },
    );
  };

  renderNavBar = () => (
    <NavBar
      gradient
      title="我的"
      renderBottom={() => <View style={styles.navBar.bottom} />}
    />
  );

  renderWechat() {
    return (
      <Flex>
        <Text style={styles.wechatNumber}>ladh2857</Text>
        <TouchableWithoutFeedback
          hitSlop={{
            top: 20,
            left: 20,
            bottom: 20,
            right: 20,
          }}
          onPress={() => {
            Clipboard.setString('ladh2857');
            Toast.show('已复制', Toast.SHORT, false);
          }}
        >
          <View>
            <Text style={styles.wechatCopy}>复制</Text>
          </View>
        </TouchableWithoutFeedback>
      </Flex>
    );
  }

  render() {
    const { isLogin, loading } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView contentContainerStyle={styles.scroll.content}>
          <Item
            icon={require('asset/mine/my_project.png')}
            title="我的项目"
            onPress={this.handleMyProjectPress}
          />
          <Item
            icon={require('asset/mine/institution_join.png')}
            title="机构入驻通道"
            onPress={this.handleInstitutionJoinPress}
          />
          <View style={styles.scroll.divider} />
          <Item
            icon={require('asset/mine/favored.png')}
            title="我的关注"
            onPress={this.handleFavoredPress}
          />
          <Item
            icon={require('asset/mine/feedback.png')}
            title="意见反馈"
            onPress={this.handleFeedbackPress}
          />
          <View style={styles.scroll.divider} />
          <StaticItem
            icon={require('asset/mine/wechat.png')}
            title="加微信群"
            renderRight={this.renderWechat()}
          />
          <Item
            icon={require('asset/mine/share_hotnode.png')}
            title="分享 Hotnode"
            onPress={this.handleShare}
          />
          <View style={styles.scroll.divider} />
          {isLogin && (
            <Item
              loading={loading}
              icon={require('asset/mine/switch_end.png')}
              title="切换至机构版"
              subtitle="若您是机构投资人，可管理机构项目及工作流协作"
              onPress={this.handleSwitchEndPress}
            />
          )}
          <Item
            icon={require('asset/mine/settings.png')}
            title="设置"
            onPress={this.handleSettingsPress}
          />
        </ScrollView>
        <Header
          {...this.props}
          style={styles.header}
          onPress={this.handleHeaderPress}
        />
      </View>
    );
  }
}

export default Self;
