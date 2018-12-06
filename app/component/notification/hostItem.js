import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Flex } from 'antd-mobile';
import R from 'ramda';
import moment from 'moment';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';
import Icon from 'component/uikit/icon';

const notificationItem = ({ data, onPress, onPressShare }) => {
  if (R.isEmpty(data) || R.isNil(data)) {
    return null;
  }
  const title = R.pathOr('--', ['title'])(data);
  const user_name = R.pathOr('--', ['user_name'])(data);
  const user_id = R.pathOr('--', ['user_id'])(data);
  const subtitle = R.pathOr('--', ['subtitle'])(data);
  const push_at = R.pathOr(null, ['push_at'])(data);
  const source = R.pathOr('', ['source'])(data);
  const logo_url = R.pathOr('', ['logo'])(data);

  return (
    <Flex style={styles.container} justify="between">
      <Flex align="start">
        <View>
          <Avatar
            resizeMode="cover"
            raised={false}
            size={52}
            source={{ uri: data.user_avatar }}
            innerRatio={1}
            style={styles.avatar}
            imageStyle={styles.avatar}
          />
        </View>
        <View>
          <Text style={styles.name}>{user_name}</Text>
          <Text style={styles.date}>{moment.unix(data.created_at).fromNow()}入驻</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Flex>
      <Touchable onPress={() => onPress(user_id)}>
        <Flex align="center">
          <Text style={styles.contact}>联系 Ta</Text>
          <Icon name="arrow-forward" size={16} color="#1890FF" />
        </Flex>
      </Touchable>
    </Flex>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    marginRight: 10,
    borderRadius: 1,
  },
  header: {
    flex: 1,
    height: 35,
    paddingHorizontal: 12,
    borderBottomColor: '#e9e9e9',
    borderBottomWidth: 0.5,
  },
  sourceName: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.85)',
    letterSpacing: 0.16,
    fontFamily: 'PingFangSC-Medium',
  },
  date: { fontSize: 11, color: 'rgba(0,0,0,0.45)' },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  title: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.65)',
    marginTop: 5,
  },
  name: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
  },
  contact: { fontSize: 13, color: '#1890FF', marginRight: 5, marginBottom: 1 },
  subtitle: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.65)',
    letterSpacing: 0.16,
    lineHeight: 19,
    marginTop: 5,
  },
  footer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  coinName: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: '#eaeaea',
    borderRadius: 1,
  },
  coinNameText: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.45)',
    letterSpacing: 0.13,
    textAlign: 'justify',
  },
  share: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.45)',
    letterSpacing: 0.17,
    lineHeight: 19,
    marginLeft: 5,
  },
};

notificationItem.propTypes = {
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

notificationItem.defaultProps = {
  onPress: () => null,
};

export default notificationItem;
