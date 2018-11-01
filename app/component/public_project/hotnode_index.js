import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';

const hotnode_index = ({ data, onInvitedPress }) => {
  const views = R.pathOr('0', ['view'])(data);
  const stars = R.pathOr('0', ['stars'])(data);
  const comments_count = R.pathOr('0', ['comments_count'])(data);
  const heat = R.pathOr('+0.00', ['heat'])(data);

  return (
    <View style={styles.container}>
      <View style={styles.top.container}>
        <View style={styles.top.title.container}>
          <Image
            style={{ marginRight: 8 }}
            source={require('asset/public_project/hotnode_index.png')}
          />
          <Text style={styles.top.title.text}>Hotnode 指数</Text>
        </View>
        <Touchable borderless onPress={onInvitedPress}>
          <Text style={styles.top.invite}>
            邀请点评 <Icon name="arrow-forward" />
          </Text>
        </Touchable>
      </View>
      <View style={styles.content.container}>
        <View style={styles.content.group.container}>
          <Text style={styles.content.group.title}>{views}</Text>
          <Text style={styles.content.group.subtitle}>查看</Text>
        </View>
        <View style={styles.content.group.container}>
          <Text style={styles.content.group.title}>{stars}</Text>
          <Text style={styles.content.group.subtitle}>关注</Text>
        </View>
        <View style={styles.content.group.container}>
          <Text style={styles.content.group.title}>{comments_count}</Text>
          <Text style={styles.content.group.subtitle}>点评</Text>
        </View>
        <View style={styles.content.group.container}>
          <Text style={[styles.content.group.title, { color: '#09AC32' }]}>
            {heat}
          </Text>
          <Text style={styles.content.group.subtitle}>热度</Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
  },
  top: {
    container: {
      height: 42,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
    },
    title: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      text: {
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: 'bold',
      },
    },
    invite: {
      color: 'rgba(0, 0, 0, 0.65)',
      fontSize: 12,
    },
  },
  content: {
    container: {
      flexDirection: 'row',
      height: 78,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#E9E9E9',
    },
    group: {
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 18,
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: 'bold',
      },
      subtitle: {
        marginTop: 10,
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.45)',
      },
    },
  },
};

export default hotnode_index;
