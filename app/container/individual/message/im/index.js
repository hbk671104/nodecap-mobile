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
import { RouterEmitter } from '../../../../router';
import styles from './style';

@global.bindTrack({
  page: '聊天页',
  name: 'App_IMPageOperation',
})
@connect(({ user, message_center, loading }, { navigation }) => {
  const id = navigation.getParam('id');
  return {
    id,
    user: R.path(['currentUser'])(user),
    target: R.path(['chat_user', id])(message_center),
    loading: loading.effects['message_center/getUserById'],
  };
})
@compose(
  withState('data', 'setData', []),
  withProps(({ user, target }) => ({
    user_im_id: R.path(['im_info', 'im_id'])(user),
    target_im_id: R.path(['im_info', 'im_id'])(target),
  })),
)
class IMPage extends PureComponent {
  componentWillMount() {
    this.loadTargetInfo();
    this.handleOnMessage();
  }

  componentDidMount() {
    this.props.track('进入');
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
          }
        }
      },
    });
  };

  handleOnMessage = () => {
    RouterEmitter.addListener('onmsg', msg => {
      const { data, target, target_im_id } = this.props;
      if (msg.to !== target_im_id) {
        return;
      }
      global.nim.resetSessionUnread(`p2p-${target_im_id}`);
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
              {realname}
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
    const { data, user, user_im_id } = this.props;
    return (
      <SafeArea style={styles.container}>
        {this.renderNavBar()}
        <Chat
          loadEarlier
          onLoadEarlier={this.loadEarlierHistory}
          bottomOffset={getBottomSpace()}
          user={{
            _id: user_im_id,
            name: R.path(['realname'])(user),
            avatar: R.path(['avatar_url'])(user),
          }}
          messages={data}
          showAvatarForEveryMessage
          onSend={this.handleSend}
        />
      </SafeArea>
    );
  }
}

export default IMPage;
