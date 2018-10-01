import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import R from 'ramda';

import Avatar from 'component/uikit/avatar';
import Icon from 'component/uikit/icon';
import { shadow } from '../../../utils/style';

const header = ({ user, isLogin, style, onPress }) => {
  const title = isLogin ? user.realname : '立即登录';
  return (
    <TouchableHighlight
      underlayColor="white"
      style={[styles.wrapper, style]}
      onPress={onPress}
    >
      <View style={styles.container}>
        <View style={styles.group}>
          {isLogin ? (
            <Avatar
              size={50}
              innerRatio={1}
              source={{ uri: user.avatar_url }}
              resizeMode="cover"
            />
          ) : (
            <Image
              style={{ height: 50, width: 50 }}
              source={require('asset/default_avatar.png')}
            />
          )}
          <View style={styles.content.container}>
            <Text style={styles.content.title}>{title}</Text>
          </View>
        </View>
        <Icon name="arrow-forward" size={20} color="rgba(0, 0, 0, 0.25)" />
      </View>
    </TouchableHighlight>
  );
};

export const headerHeight = 100;

const styles = {
  wrapper: {
    backgroundColor: 'white',
    borderRadius: 2,
    ...shadow,
  },
  container: {
    height: headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 15,
  },
  group: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    container: {
      flex: 1,
      marginHorizontal: 15,
      alignItems: 'flex-start',
    },
    title: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    company: {
      container: {
        marginTop: 6,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        backgroundColor: '#1890FF',
      },
      title: {
        color: 'white',
        fontSize: 11,
        paddingHorizontal: 4,
      },
    },
  },
};

header.defaultProps = {
  onPress: () => null,
  onCompanyPress: () => null,
};

header.propTypes = {
  user: PropTypes.object,
  onPress: PropTypes.func,
  onCompanyPress: PropTypes.func,
};

export default header;
