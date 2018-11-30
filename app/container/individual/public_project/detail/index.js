import React, { Component } from 'react';
import { View, Animated, Text, Image, Clipboard, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Modal as antModal } from 'antd-mobile';
import { compose, withState, withProps } from 'recompose';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';
import * as WeChat from 'react-native-wechat';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import Base64 from 'utils/base64';
import DeviceInfo from 'react-native-device-info';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import Modal from 'component/modal';
import shareModal from 'component/shareModal';
import Config from 'runtime/index';
import ActionAlert from 'component/action_alert';

// Partials
import Description from './page/description';
import OverallRatings from './page/overall_ratings';
import Trend from './page/trend';
import Return from './page/return';
import Pairs from './page/pairs';
import Chart from './chart';
import Fund from './fund';
import Share from './share';
import Header from './header';
import Selector from './selector';
import Bottom from './bottom';
import styles from './style';

@global.bindTrack({
  page: '项目详情',
  name: 'App_ProjectDetailOperation',
})
@connect(({ public_project, loading, login }, props) => {
  const id = props.navigation.getParam('id');
  const portfolio = R.pathOr({}, ['current', id])(public_project);
  const market = R.pathOr({}, ['market'])(portfolio);
  return {
    id,
    portfolio,
    loading: loading.effects['public_project/get'],
    favor_loading: loading.effects['public_project/favor'],
    can_calculate: R.not(R.isEmpty(market)),
    logged_in: !!login.token,
    base_symbol: R.pathOr('CNY', ['market', 'quote'])(portfolio),
  };
})
@compose(
  withState('showInviteModal', 'toggleInviteModal', false),
  withState('currentScrollY', 'setCurrentScrollY', 0),
  withState('animateY', 'setAnimatedY', new Animated.Value(0)),
  withState('explanationVisible', 'setExplanationVisible', false),
  withState('selectorY', 'setSelectorY', 0),
  withProps(({ animateY, portfolio }) => {
    const investment = R.pathOr({}, ['roi'])(portfolio);
    const symbols = R.pathOr([], ['symbols'])(portfolio);
    const trends = R.pathOr([], ['news', 'data'])(portfolio);
    const overall_rating = R.pathOr({}, ['overall_rating'])(portfolio);
    const chat_member = R.pipe(
      R.pathOr([], ['members']),
      R.find(m => !R.isNil(m.user_id)),
    )(portfolio);
    return {
      chat_member,
      navBarOpacityRange: animateY.interpolate({
        inputRange: [0, 160],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      backgroundOpacityRange: animateY.interpolate({
        inputRange: [0, 160],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      }),
      selectionList: [
        {
          component: Description,
          name: '详情',
        },
        // ...(R.isEmpty(overall_rating)
        //   ? []
        //   : [
        //       {
        //         component: OverallRatings,
        //         name: '综合评级',
        //       },
        //     ]),
        ...(R.isEmpty(trends)
          ? []
          : [
              {
                component: Trend,
                name: '动态',
              },
            ]),
        ...(R.isEmpty(symbols)
          ? []
          : [
              {
                component: Pairs,
                name: '交易所',
              },
            ]),
        ...(R.isEmpty(investment)
          ? []
          : [
              {
                component: Return,
                name: '回报',
              },
            ]),
      ],
    };
  }),
  withState('currentPage', 'setCurrentPage', ({ selectionList }) =>
    R.path([0])(selectionList),
  ),
)
@shareModal
export default class PublicProjectDetail extends Component {
  componentWillMount() {
    this.loadDetail();
    this.markView();
  }

  componentDidMount() {
    this.props.track('进入');
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'public_project/clearCurrent',
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
        type: 'project_create/resetOwner',
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
        routeName: 'ClaimMyProjectWrap',
        params: {
          project_id: this.props.id,
        },
      }),
    );
  };

  markView = () => {
    this.props.dispatch({
      type: 'public_project/view',
      id: this.props.id,
    });
  };

  loadDetail = () => {
    this.props.dispatch({
      type: 'public_project/get',
      id: this.props.id,
    });
  };

  handleFavorPress = () => {
    this.props.track('点击关注按钮');
    if (!this.props.logged_in) {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      );
      return;
    }

    const is_focused = R.pathOr(false, ['is_focused'])(this.props.portfolio);
    this.props.dispatch({
      type: is_focused ? 'public_project/unfavor' : 'public_project/favor',
      payload: this.props.id,
    });
  };

  handleCommentPress = () => {
    this.props.track('点击点评按钮');

    if (!this.props.logged_in) {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      );
      return;
    }

    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'CommentCoin',
        params: {
          coin: this.props.portfolio,
        },
      }),
    );
  };

  handlePageSwitch = page => () => {
    this.props.setCurrentPage(page, () => {
      if (this.props.currentScrollY < this.props.selectorY) {
        return;
      }
      this.scroll
        .getNode()
        .scrollTo({ y: this.props.selectorY, animated: false });
    });
  };

  handleSelectorOnLayout = ({ nativeEvent: { layout } }) => {
    this.props.setSelectorY(layout.y);
  };

  handleInstitutionItemPress = item => {
    this.props.track('点击进入机构详情');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'InstitutionDetail',
        params: {
          id: item.id,
        },
        key: `InstitutionDetail_${item.id}`,
      }),
    );
  };

  handleInvitedPress = item => {
    this.props.track('点击进入邀请点评');
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'InviteComment',
        params: {
          item,
        },
        key: `InviteComment_${item.id}`,
      }),
    );
  };

  handleShare = () => {
    const id = this.props.id;

    this.props.openShareModal({
      types: [
        {
          type: 'timeline',
          webpageUrl: `${Config.MOBILE_SITE}/coin?id=${id}`,
          title: `推荐给你「${R.path(['portfolio', 'name'])(this.props)}」`,
          description: '来 Hotnode 找最新最热项目！',
          thumbImage:
            R.path(['portfolio', 'icon'])(this.props) ||
            'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/big_logo%403x.png',
        },
        {
          type: 'session',
          webpageUrl: `${Config.MOBILE_SITE}/coin?id=${id}`,
          title: `推荐给你「${R.path(['portfolio', 'name'])(this.props)}」`,
          description: '来 Hotnode 找最新最热项目！',
          thumbImage:
            R.path(['portfolio', 'icon'])(this.props) ||
            'https://hotnode-production-file.oss-cn-beijing.aliyuncs.com/big_logo%403x.png',
        },
        {
          type: 'picture',
        },
        {
          type: 'link',
          url: `${Config.MOBILE_SITE}/coin?id=${id}`,
        },
      ],
    });
  };

  handleInviteJoinPress = () => {
    const { id } = this.props;
    const cryptID = Base64.btoa(`${id}`);
    const UniqueID = DeviceInfo.getUniqueID().slice(0, 5);
    Clipboard.setString(
      `邀请您入驻「${R.path(['portfolio', 'name'])(
        this.props,
      )}」，复制整段文字 &*${UniqueID}$${cryptID}*& 到 Hotnode 中打开`,
    );
    this.props.toggleInviteModal(true);
  };

  handleContactPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'IMPage',
        params: {
          id: R.path(['user_id'])(this.props.chat_member),
        },
      }),
    );
  };

  render() {
    const {
      currentPage: Current,
      selectionList,
      portfolio,
      currentScrollY,
      navBarOpacityRange,
      backgroundOpacityRange,
      showInviteModal,
    } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.wrapper, { opacity: backgroundOpacityRange }]}
        />
        <Animated.View
          style={[
            styles.navBar.wrapper,
            { opacity: navBarOpacityRange, zIndex: 50 },
          ]}
        >
          <NavBar
            back
            barStyle={currentScrollY > 80 ? 'dark-content' : 'light-content'}
            style={styles.navBar.container}
            title={R.path(['name'])(portfolio)}
          />
        </Animated.View>
        <Animated.ScrollView
          ref={ref => {
            this.scroll = ref;
          }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          stickyHeaderIndices={[3]}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: this.props.animateY },
                },
              },
            ],
            {
              useNativeDriver: true,
              listener: event => {
                const offsetY = event.nativeEvent.contentOffset.y;
                this.props.setCurrentScrollY(offsetY);
              },
            },
          )}
        >
          <Header
            {...this.props}
            onInvitedPress={() => this.handleInvitedPress(portfolio)}
            onExplanationPress={() => this.props.setExplanationVisible(true)}
          />
          <Fund {...this.props} />
          <Chart {...this.props} />
          <Selector
            onLayout={this.handleSelectorOnLayout}
            list={selectionList}
            page={Current}
            onPress={this.handlePageSwitch}
          />
          <View style={styles.page}>
            <Current.component
              {...this.props}
              onInstitutionItemPress={this.handleInstitutionItemPress}
              onClaimPress={this.onPressClaimCoin}
            />
          </View>
        </Animated.ScrollView>
        <Touchable
          style={styles.claim.container}
          onPress={this.onPressClaimCoin}
        >
          <Image source={require('asset/project/detail/claim.png')} />
        </Touchable>
        <Bottom
          {...this.props}
          openShareModal={this.handleShare}
          onFavorPress={this.handleFavorPress}
          onInvestmentPress={this.handleInvestmentPress}
          onPressComment={this.handleCommentPress}
          onInviteJoinPress={this.handleInviteJoinPress}
          onConnectPress={this.handleContactPress}
        />
        <Share
          onClose={() => this.props.toggleSharePictureModal(false)}
          coin={this.props.portfolio}
          visible={this.props.showSharePictureModal}
        />
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
        <Modal
          useNativeDriver
          hideModalContentWhileAnimating
          isVisible={this.props.explanationVisible}
          style={{
            alignSelf: 'center',
          }}
          onBackdropPress={() => this.props.setExplanationVisible(false)}
        >
          <View style={styles.explanation.container}>
            <View style={styles.explanation.content.container}>
              <Text style={styles.explanation.content.title}>项目得分</Text>
              <Text style={styles.explanation.content.text}>
                主要以该项目信息完整度为考量。内容越丰富得分越高，曝光机会越多。若您是项目成员，入驻后可进行信息完善
              </Text>
            </View>
            <Touchable
              style={styles.explanation.bottom.container}
              onPress={() =>
                this.props.setExplanationVisible(false, this.onPressClaimCoin)
              }
            >
              <Text style={styles.explanation.bottom.text}>入驻并完善</Text>
            </Touchable>
          </View>
        </Modal>
      </View>
    );
  }
}
