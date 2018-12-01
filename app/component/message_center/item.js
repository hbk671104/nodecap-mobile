import React from 'react';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';
import R from 'ramda';
import moment from 'moment';
import { hideRealMobile } from '../../utils/utils';
import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';
import { NumberBadge } from 'component/badge';

import styles from './style';

const item = ({ data, onPress }) => {
  const realname = hideRealMobile(R.pathOr('--', ['realname'])(data));
  const company = R.path(['company'])(data);
  const avatar_url = R.path(['avatar_url'])(data);
  const unread = R.path(['unread'])(data);
  const lastMsg = R.pathOr('', ['lastMsg', 'text'])(data);
  const lastMsgAt = R.path(['lastMsg', 'time'])(data);

  return (
    <Touchable foreground onPress={onPress}>
      <Flex style={styles.container} align="flex-start">
        <Avatar
          resizeMode="cover"
          raised={false}
          source={{ uri: avatar_url }}
          style={styles.avatar}
          imageStyle={styles.avatar}
          size={52}
          innerRatio={1}
        />
        <View style={styles.content.container}>
          <Flex>
            <View style={{ flex: 1 }}>
              <Text style={styles.content.name}>
                {realname}
                {!!company && (
                  <Text style={{ color: '#E9E9E9', fontWeight: 'normal' }}>
                    {' '}
                    |{' '}
                  </Text>
                )}
                {!!company && (
                  <Text style={styles.content.from}>{company}</Text>
                )}
              </Text>
            </View>
            <Text style={styles.content.time}>
              {moment(lastMsgAt).format('HH:mm')}
            </Text>
          </Flex>
          <Flex style={styles.bottom}>
            <View style={{ flex: 1 }}>
              <Text style={styles.content.text} numberOfLines={1}>
                {lastMsg}
              </Text>
            </View>
            <NumberBadge wrapperStyle={styles.badge} number={unread} />
          </Flex>
        </View>
      </Flex>
    </Touchable>
  );
};

export default item;
