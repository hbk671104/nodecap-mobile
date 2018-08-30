import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';

const notificationItem = ({ data, onPress }) => (
  <Touchable foreground onPress={onPress}>
    <View style={styles.container}>
      <Avatar size={50} />
      <View style={styles.content.container}>
        <View style={styles.content.top.container}>
          <View style={styles.content.top.title.container}>
            <Text style={styles.content.top.title.text}>
              Zilliqa近日上线币安
            </Text>
          </View>
          <Text style={styles.content.top.date}>02-12 14:21</Text>
        </View>
        <View style={styles.content.tag.wrapper}>
          <View
            style={[
              styles.content.tag.container,
              { backgroundColor: '#E5F3FF' },
            ]}
          >
            <Text style={[styles.content.tag.title, { color: '#1890FF' }]}>
              Zilliqa
            </Text>
          </View>
          <View
            style={[
              styles.content.tag.container,
              { backgroundColor: '#FFE9D6' },
            ]}
          >
            <Text style={[styles.content.tag.title, { color: '#FF7600' }]}>
              上币公告
            </Text>
          </View>
        </View>
        <View style={styles.content.subtitle.container}>
          <Text numberOfLines={2} style={styles.content.subtitle.text}>
            「上币早知道」两日后Zilliqa即将登陆币安，Zilliqa作为基础链，旨在解决交易速度和扩展性的问题。哈哈哈哈哈哈哈
          </Text>
        </View>
      </View>
    </View>
  </Touchable>
);

const styles = {
  container: {
    padding: 12,
    flexDirection: 'row',
  },
  content: {
    container: {
      marginLeft: 15,
      flex: 1,
    },
    top: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      title: {
        container: {
          flex: 1,
        },
        text: {
          color: 'rgba(0, 0, 0, 0.85)',
          fontWeight: 'bold',
          fontSize: 14,
        },
      },
      date: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.45)',
      },
    },
    tag: {
      wrapper: {
        marginTop: 6,
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      container: {
        height: 19,
        paddingHorizontal: 3,
        borderRadius: 2,
        marginRight: 8,
        justifyContent: 'center',
      },
      title: {
        fontSize: 11,
      },
    },
    subtitle: {
      container: {
        marginTop: 10,
      },
      text: {
        fontSize: 12,
        lineHeight: 18,
        color: 'rgba(0, 0, 0, 0.45)',
      },
    },
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
