import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { Flex } from 'antd-mobile';

import NavBar from 'component/navBar';
import Chat from 'component/chat';
import styles from './style';

@global.bindTrack({
  page: '聊天页',
  name: 'App_IMPageOperation',
})
@connect(({ message_center, loading }, { type }) => ({}))
class IMPage extends PureComponent {
  componentDidMount() {
    this.props.track('进入');
  }

  renderNavBar = () => (
    <NavBar
      gradient
      back
      renderTitle={() => (
        <View style={styles.navBar.title.container}>
          <Text style={styles.navBar.title.text} numberOfLines={1}>
            Kevin
          </Text>
          <Flex>
            <Flex style={{ flex: 1 }} justify="flex-end">
              <Text style={styles.navBar.title.subtext} numberOfLines={1}>
                Hotnode
              </Text>
            </Flex>
            <Text style={styles.navBar.title.subtext}>
              {'  '}|{'  '}
            </Text>
            <Flex style={{ flex: 1 }}>
              <Text style={styles.navBar.title.subtext} numberOfLines={1}>
                设计总监
              </Text>
            </Flex>
          </Flex>
        </View>
      )}
    />
  );

  render() {
    const { data, pagination, loading } = this.props;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <Chat
          messages={[
            {
              _id: '1',
              text: '您好，我是 Hotnode 的凯文老师',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
          ]}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}

export default IMPage;
