import React from 'react';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';
import R from 'ramda';
import moment from 'moment';
import { hideRealMobile } from '../../utils/utils';
import Avatar from 'component/uikit/avatar';
import Touchable from 'component/uikit/touchable';
import Badge from 'component/badge';

import styles from './style';

const item = ({ data, onPress }) => {
  const realname = hideRealMobile(R.pathOr('--', ['sender', 'realname'])(data));
  const company = R.path(['sender', 'company'])(data);
  const avatar_url = R.path(['sender', 'avatar_url'])(data);
  const content = R.pathOr('', ['content'])(data);
  const is_read_item = R.pathOr(true, ['is_read_item'])(data);
  const created_at = R.path(['created_at'])(data);

  return (
    <Touchable onPress={() => onPress(data)}>
      <Flex style={styles.container} align="flex-start">
        <Avatar
          resizeMode="cover"
          source={{ uri: avatar_url }}
          raised={false}
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
                {!!company && <Text style={styles.content.from}>{company}</Text>}
              </Text>
            </View>
            <Text style={styles.content.time}>
              {moment.unix(created_at).format('HH:mm')}
            </Text>
          </Flex>
          <Flex style={styles.bottom}>
            <View style={{ flex: 1 }}>
              <Text style={styles.content.text}>{content.replace(/([0-9]){11}/, hideRealMobile)}</Text>
            </View>
            {!is_read_item && <Badge style={styles.badge} size={8} />}
          </Flex>
        </View>
      </Flex>
    </Touchable>
  );
};

export default item;
