import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import { Flex } from 'antd-mobile';
import R from 'ramda';
import moment from 'moment';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';

const notificationItem = ({ data, onPress, onPressShare }) => {
  if (R.isEmpty(data) || R.isNil(data)) {
    return null;
  }
  const title = R.pathOr('--', ['title'])(data);
  const project_name = R.pathOr('--', ['project_name'])(data);
  const subtitle = R.pathOr('--', ['subtitle'])(data);
  const push_at = R.pathOr(null, ['push_at'])(data);
  const source = R.pathOr('', ['source'])(data);
  const logo_url = R.pathOr('', ['logo'])(data);

  return (
    <Touchable foreground onPress={onPress(data.id)}>
      <View style={styles.container}>
        <Flex justify="between" style={styles.header}>
          <Flex align="center">
            <Avatar
              raised={false}
              innerRatio={1}
              size={20}
              style={styles.avatar}
              source={{ uri: logo_url }}
            />
            <Text style={styles.sourceName}>{source}</Text>
          </Flex>
          <Text style={styles.pushAt}>
            {push_at ? moment.unix(push_at).format('M/D HH:mm') : null}
          </Text>
        </Flex>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Flex style={styles.footer} justify="between">
          <View>
            <View style={styles.coinName}>
              <Text style={styles.coinNameText}>{project_name}</Text>
            </View>
          </View>
          <Touchable foreground onPress={() => onPressShare(data)}>
            <Flex align="center">
              <Image
                style={{ width: 11, height: 11 }}
                source={require('asset/project/detail/share.png')}
              />
              <Text style={styles.share}>分享</Text>
            </Flex>
          </Touchable>
        </Flex>
      </View>
    </Touchable>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
  },
  avatar: {
    marginRight: 10,
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
  pushAt: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.45)',
    letterSpacing: 0.18,
    lineHeight: 19,
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  title: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: 'rgba(0,0,0,0.85)',
    letterSpacing: 0.18,
    lineHeight: 22,
  },
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
