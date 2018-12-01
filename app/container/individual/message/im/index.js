import React, { PureComponent } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { compose, withState, withProps } from 'recompose';
import { Flex } from 'antd-mobile';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import moment from 'moment';

import NavBar from 'component/navBar';
import Chat from 'component/chat';
import SafeArea from 'component/uikit/safeArea';
import { formatMessage } from 'utils/nim';
import { RouterEmitter, getCurrentScreen } from '../../../../router';
import styles from './style';
import { hideRealMobile } from '../../../../utils/utils';

@global.bindTrack({
  page: '聊天页',
  name: 'App_IMPageOperation',
})
@connect(({ user, message_center, router, loading }, { navigation }) => {
  const id = navigation.getParam('id');
  return {
    id,
    user: R.path(['currentUser'])(user),
    target: R.path(['chat_user', id])(message_center),
    loading: loading.effects['message_center/getUserById'],
    connected: message_center.connected,
    isCurrent: getCurrentScreen(router) === 'IMPage',
  };
})
@compose(
  withState('data', 'setData', []),
  withState('inLastPage', 'setInLastPage', false),
  withProps(({ user, target }) => ({
    user_im_id: R.path(['im_info', 'im_id'])(user),
    target_im_id: R.path(['im_info', 'im_id'])(target),
  })),
)
class IMPage extends PureComponent {
  componentWillMount() {
    this.handleOnMessage();
    if (this.props.connected) {
      this.loadTargetInfo();
    }
  }

  componentDidMount() {
    this.props.track('进入');
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.connected && nextProps.connected) {
      this.loadTargetInfo();
    }
  }

  loadTargetInfo = () => {
    if (this.props.target) {
      this.loadHistory();
      return;
    }
    this.props.dispatch({
      type: 'message_center/getUserById',
      id: this.props.id,
      callback: () => {
        this.loadHistory();
      },
    });
  };

  loadHistory = () => {
    const { target_im_id } = this.props;
    global.nim.resetSessionUnread(`p2p-${target_im_id}`);
    global.nim.getLocalMsgs({
      // scene: 'p2p',
      // to: target_im_id,
      sessionId: `p2p-${target_im_id}`,
      desc: true,
      limit: 50,
      done: (error, res) => {
        if (!error) {
          const { user, target } = this.props;
          const msgs = R.pathOr([], ['msgs'])(res);
          if (!R.isEmpty(msgs)) {
            this.props.setData(
              R.map(m => {
                const is_target = R.path(['from'])(m) === target_im_id;
                return formatMessage(m, {
                  name: R.path(['realname'])(is_target ? target : user),
                  avatar: R.path(['avatar_url'])(is_target ? target : user),
                });
              })(msgs),
            );
          }
        } else {
          console.log('get history error', error);
        }
      },
    });
  };

  loadEarlierHistory = () => {
    const { target_im_id, data } = this.props;
    const last_time = R.pipe(
      R.last,
      R.path(['createdAt']),
    )(data);

    global.nim.getLocalMsgs({
      // scene: 'p2p',
      // to: target_im_id,
      sessionId: `p2p-${target_im_id}`,
      desc: true,
      end: moment(last_time).valueOf(),
      limit: 50,
      done: (error, res) => {
        if (!error) {
          const { user, target } = this.props;
          const msgs = R.pathOr([], ['msgs'])(res);
          if (!R.isEmpty(msgs)) {
            this.props.setData(
              R.concat(
                data,
                R.map(m => {
                  const is_target = R.path(['from'])(m) === target_im_id;
                  return formatMessage(m, {
                    name: R.path(['realname'])(is_target ? target : user),
                    avatar: R.path(['avatar_url'])(is_target ? target : user),
                  });
                })(msgs),
              ),
            );
          } else {
            this.props.setInLastPage(true);
          }
        }
      },
    });
  };

  isCloseToTop({ layoutMeasurement, contentOffset, contentSize }) {
    const paddingToTop = 120;
    return (
      contentSize.height - layoutMeasurement.height - paddingToTop <=
      contentOffset.y
    );
  }

  handleOnMessage = () => {
    RouterEmitter.addListener('onmsg', msg => {
      const { data, target, target_im_id, isCurrent } = this.props;
      if (msg.from !== target_im_id) {
        return;
      }
      if (isCurrent) {
        global.nim.resetSessionUnread(`p2p-${target_im_id}`);
      }
      this.props.setData(
        R.concat([
          formatMessage(msg, {
            name: R.path(['realname'])(target),
            avatar: R.path(['avatar_url'])(target),
          }),
        ])(data),
      );
    });
  };

  handleSend = ([message]) => {
    const { data, target_im_id } = this.props;
    const { text } = message;
    this.props.setData([message].concat(data));

    global.nim.sendText({
      scene: 'p2p',
      to: target_im_id,
      text,
      done: (error, res) => {
        // const { data, user } = this.props;
        if (!error) {
          // this.props.setData(
          //   R.concat([
          //     formatMessage(res, {
          //       name: R.path(['realname'])(user),
          //       avatar: R.path(['avatar_url'])(user),
          //     }),
          //   ])(data),
          // );
        }
      },
    });
  };

  renderNavBar = () => (
    <NavBar
      gradient
      back
      renderTitle={() => {
        if (this.props.loading) {
          return <ActivityIndicator color="white" />;
        }

        const { target } = this.props;
        const realname = R.path(['realname'])(target);
        const company = R.path(['company'])(target);
        const title = R.path(['title'])(target);
        return (
          <View style={styles.navBar.title.container}>
            <Text style={styles.navBar.title.text} numberOfLines={1}>
              {hideRealMobile(realname || '')}
            </Text>
            {(!!company || !!title) && (
              <Flex justify="center">
                <Flex style={{ flex: 1 }} justify="flex-end">
                  <Text style={styles.navBar.title.subtext} numberOfLines={1}>
                    {company}
                  </Text>
                </Flex>
                <Text style={styles.navBar.title.subtext}>
                  {'  '}|{'  '}
                </Text>
                <Flex style={{ flex: 1 }}>
                  <Text style={styles.navBar.title.subtext} numberOfLines={1}>
                    {title}
                  </Text>
                </Flex>
              </Flex>
            )}
          </View>
        );
      }}
    />
  );

  render() {
    const { data, user, user_im_id, inLastPage } = this.props;
    return (
      <SafeArea style={styles.container}>
        {this.renderNavBar()}
        <Chat
          loadEarlier
          renderLoadEarlier={p => {
            if (inLastPage) {
              return null;
            }
            if (R.length(data) < 50) {
              return null;
            }
            return (
              <View style={{ marginVertical: 12 }}>
                <ActivityIndicator />
              </View>
            );
          }}
          bottomOffset={getBottomSpace()}
          user={{
            _id: user_im_id,
            name: R.path(['realname'])(user),
            avatar: R.path(['avatar_url'])(user),
          }}
          messages={data}
          showAvatarForEveryMessage
          onSend={this.handleSend}
          listViewProps={{
            scrollEventThrottle: 400,
            onScroll: ({ nativeEvent }) => {
              if (this.isCloseToTop(nativeEvent)) this.loadEarlierHistory();
            },
          }}
        />
      </SafeArea>
    );
  }
}

export default IMPage;
