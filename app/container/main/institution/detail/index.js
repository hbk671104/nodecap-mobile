import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Clipboard,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { Toast } from 'antd-mobile';
import { NavigationActions } from 'react-navigation';
import { compose, withState } from 'recompose';
import request from 'utils/request';
import runtimeConfig from 'runtime/index';
import Base64 from 'utils/base64';
import DeviceInfo from 'react-native-device-info';
import * as WeChat from 'react-native-wechat';

import NavBar from 'component/navBar';
import FavorItem from 'component/favored/item';
import Touchable from 'component/uikit/touchable';
import ActionAlert from 'component/action_alert';
import shareModal from 'component/shareModal';
import Member from 'component/institution/member_item';

import Group from './partials/group';
import Header from './header';
import Bottom from './bottom';
import styles from './style';

@global.bindTrack({
  page: '机构详情',
  name: 'App_InstitutionDetailOperation',
})
@connect(({ user, institution, login, loading }, props) => {
  const id = props.navigation.getParam('id');
  return {
    id,
    data: R.pathOr({}, ['current', id])(institution),
    user: R.pathOr({}, ['currentUser'])(user),
    logged_in: !!login.token,
    in_individual: login.in_individual,
    loading: loading.effects['institution/get'],
  };
})
@compose(
  withState('showInviteModal', 'toggleInviteModal', false),
  withState('showModal', 'setShowModal', false),
  withState('currentMember', 'setCurrentMember', ({ data }) =>
    R.pathOr({}, ['members', 0])(data),
  ),
)
@shareModal
export default class InstitutionDetail extends Component {
  componentWillMount() {
    this.loadDetail();
  }

  componentDidMount() {
    this.props.track('进入');
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'institution/clearCurrent',
      id: this.props.id,
    });
  }

  onPressClaimCoin = member => {
    this.props.track('点击入驻按钮');
    if (!this.props.logged_in) {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      );
      return;
    }
    if (member) {
      this.props.dispatch({
        type: 'institution_create/resetOwner',
        payload: {
          owner_name: R.path(['name'])(member),
          owner_mobile: R.path(['mobile'])(member),
          owner_title: R.path(['title'])(member),
          owner_wechat: R.path(['wechat'])(member),
        },
      });
    }
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ClaimMyInstitution',
        params: {
          id: this.props.id,
        },
      }),
    );
  };

  loadDetail = () => {
    this.props.dispatch({
      type: 'institution/get',
      payload: this.props.id,
    });
  };

  handleLinkPress = uri => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'WebPage',
        params: {
          title: R.pathOr('机构主页', ['data', 'name'])(this.props),
          uri,
        },
      }),
    );
  };

  goToMemberDetail = data => {
    this.props.track('点击进入成员主页');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'UserProfile',
        params: {
          data,
        },
      }),
    );
  };

  handleSharePress = () => {
    const { data, navigation } = this.props;
    this.props.openShareModal({
      types: [
        {
          type: 'timeline',
          webpageUrl: `${runtimeConfig.MOBILE_SITE}/industry-investments?id=${
            data.id
          }`,
          title: `推荐给你「${R.path(['name'])(data)}」`,
          description: '来 Hotnode 找全球区块链服务机构！',
          thumbImage: R.pathOr(
            'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/big_logo%403x.png',
            ['logo_url'],
          )(data),
        },
        {
          type: 'session',
          webpageUrl: `${runtimeConfig.MOBILE_SITE}/industry-investments?id=${
            data.id
          }`,
          title: `推荐给你「${R.path(['name'])(data)}」`,
          description: '来 Hotnode 找全球区块链服务机构！',
          thumbImage: R.pathOr(
            'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/big_logo%403x.png',
            ['logo_url'],
          )(data),
        },
        {
          type: 'link',
          url: `${runtimeConfig.MOBILE_SITE}/industry-investments?id=${
            data.id
          }`,
        },
      ],
    });
  };

  handleInviteJoinPress = () => {
    const { id } = this.props;
    const cryptID = Base64.btoa(`${id}`);
    const UniqueID = DeviceInfo.getUniqueID().slice(0, 5);
    Clipboard.setString(
      `邀请您入驻「${R.path(['data', 'name'])(
        this.props,
      )}」，复制整段文字 ^*${UniqueID}$${cryptID}*^ 到 Hotnode 中打开`,
    );
    this.props.toggleInviteModal(true);
  };

  renderNavBar = () => (
    <NavBar
      back
      gradient
      renderBottom={() => (
        <Header {...this.props} onLinkPress={this.handleLinkPress} />
      )}
    />
  );

  render() {
    const { data, in_individual, showInviteModal } = this.props;
    const desc = R.pathOr('', ['description'])(data);
    const members = R.pathOr([], ['members'])(data);
    const coins = R.pathOr([], ['coins'])(data);
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView>
          {R.not(R.isEmpty(desc)) && (
            <Group title="机构简介">
              <View style={styles.desc.container}>
                <Text style={styles.desc.text}>{desc}</Text>
              </View>
            </Group>
          )}
          {R.not(R.isEmpty(members)) && (
            <Group title="机构成员">
              {R.map(m => (
                <Member
                  key={m.id}
                  data={m}
                  onPrivacyItemPress={() => {
                    this.props.setCurrentMember(m);
                    this.props.setShowModal(true);
                  }}
                  onPress={() => this.goToMemberDetail(m)}
                  onClaimPress={() => this.onPressClaimCoin(m)}
                />
              ))(members)}
            </Group>
          )}
          {R.not(R.isEmpty(coins)) && (
            <Group title="已投项目">
              {R.addIndex(R.map)((m, index) => (
                <FavorItem
                  style={{ paddingHorizontal: 0 }}
                  institutionId={this.props.id}
                  key={m.id}
                  data={m}
                  showTopBorder={index !== 0}
                />
              ))(coins)}
            </Group>
          )}
        </ScrollView>
        <Bottom
          openShareModal={this.handleSharePress}
          onInviteJoinPress={this.handleInviteJoinPress}
        />
        {in_individual && (
          <Touchable
            style={styles.claim.container}
            onPress={this.onPressClaimCoin}
          >
            <Image source={require('asset/project/detail/claim.png')} />
          </Touchable>
        )}
        <ActionAlert
          visible={showInviteModal}
          title="邀请入驻"
          content="邀请口令已复制，快去粘贴吧"
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 18 }}
          actionTitle="分享至微信"
          action={async () => {
            this.props.toggleInviteModal(false);
            try {
              // await Linking.canOpenURL('wechat://');
              // await Linking.openURL('wechat://');
              WeChat.openWXApp();
            } catch (e) {
              console.log(e);
            }
          }}
          onBackdropPress={() => this.props.toggleInviteModal(false)}
        />
        <ActionAlert
          visible={this.props.showModal}
          title="联系Ta"
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 18 }}
          actionTitle="帮我联系"
          action={() => {
            this.props.setShowModal(false);
            const project_name = R.path(['name'])(this.props.data);
            const contact_name = R.path(['name'])(this.props.currentMember);
            const mobile = R.pathOr('未知', ['mobile'])(this.props.user);
            request
              .post(`${runtimeConfig.NODE_SERVICE_URL}/feedback`, {
                content: `想要联系「${project_name} - ${contact_name}」`,
                mobile,
              })
              .then(() => {
                Toast.success('您的反馈已提交');
              });
          }}
          onBackdropPress={() => this.props.setShowModal(false)}
        />
      </View>
    );
  }
}
