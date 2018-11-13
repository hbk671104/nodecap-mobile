import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import R from 'ramda';
import { Flex } from 'antd-mobile';

import Avatar from 'component/uikit/avatar';
import Icon from 'component/uikit/icon';
import Touchable from 'component/uikit/touchable';

const header = ({ user, isLogin, onPress }) => {
  const realname = R.pathOr('--', ['realname'])(user);
  const avatar_url = R.pathOr('', ['avatar_url'])(user);
  return (
    <Touchable foreground onPress={onPress}>
      <Flex style={styles.container} align="center">
        <View style={styles.content.container}>
          <Text style={styles.content.text}>
            {isLogin ? realname : '立即登录'}
          </Text>
          {!isLogin && (
            <Text style={styles.content.subtitle}>
              登录之后享受更多精彩信息
            </Text>
          )}
        </View>
        <Flex align="center">
          {isLogin ? (
            <Avatar
              source={{ uri: avatar_url }}
              resizeMode="cover"
              style={styles.image}
              size={60}
              innerRatio={0.9}
            />
          ) : (
            <Image
              style={styles.image}
              source={require('asset/mine/avatar_placeholder.png')}
            />
          )}
          <Icon name="arrow-forward" size={16} color="rgba(0, 0, 0, 0.25)" />
        </Flex>
      </Flex>
    </Touchable>
  );
};

const styles = {
  container: {
    height: 110,
    paddingLeft: 12,
    paddingRight: 24,
  },
  content: {
    container: {
      flex: 1,
    },
    text: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    subtitle: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.25)',
      marginTop: 12,
    },
  },
  image: {
    marginRight: 20,
  },
};

header.defaultProps = {
  onPress: () => null,
};

header.propTypes = {
  user: PropTypes.object,
  onPress: PropTypes.func,
};

export default header;
