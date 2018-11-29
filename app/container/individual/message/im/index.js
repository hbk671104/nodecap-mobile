import React, { PureComponent } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { compose, withState, withProps } from 'recompose';
import { Flex } from 'antd-mobile';

import NavBar from 'component/navBar';
import Chat from 'component/chat';
import { formatMessage } from 'utils/nim';
import { getUserById } from 'services/api';
import styles from './style';

@global.bindTrack({
  page: '聊天页',
  name: 'App_IMPageOperation',
})
@connect(({ user }, { navigation }) => ({
  id: navigation.getParam('id'),
  user: R.path(['currentUser'])(user),
}))
@compose(
  withState('data', 'setData', []),
  withState('target', 'setTarget', {}),
  withState('loading', 'setLoading', false),
  withProps(({ user, target }) => ({
    user_im_id: R.path(['im_info', 'im_id'])(user),
    target_im_id: R.path(['im_info', 'im_id'])(target),
  })),
)
class IMPage extends PureComponent {
  async componentWillMount() {
    await this.loadTargetInfo();
    this.loadHistory();
  }

  componentDidMount() {
    this.props.track('进入');
  }

  loadTargetInfo = async () => {
    this.props.setLoading(true);
    const { data } = await getUserById(this.props.id);
    this.props.setLoading(false);
    if (data) {
      this.props.setTarget(data);
    }
  };

  loadHistory = () => {
    const { target_im_id } = this.props;
    global.nim.getHistoryMsgs({
      scene: 'p2p',
      to: target_im_id,
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

  handleSend = ([message]) => {
    const { target_im_id } = this.props;
    const { text } = message;
    global.nim.sendText({
      scene: 'p2p',
      to: target_im_id,
      text,
      done: (error, res) => {
        const { data, user } = this.props;
        if (!error) {
          this.props.setData(
            R.concat([
              formatMessage(res, {
                name: R.path(['realname'])(user),
                avatar: R.path(['avatar_url'])(user),
              }),
            ])(data),
          );
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
          return <ActivityIndicator />;
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
            <Flex>
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
          </View>
        );
      }}
    />
  );

  render() {
    const { data, user, user_im_id } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <Chat
          user={{
            _id: user_im_id,
            name: R.path(['realname'])(user),
            avatar: R.path(['avatar_url'])(user),
          }}
          messages={data}
          onSend={this.handleSend}
        />
      </View>
    );
  }
}

export default IMPage;
