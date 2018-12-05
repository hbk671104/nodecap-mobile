import React from 'react';
import { View, Text, Image } from 'react-native';
import R from 'ramda';
import { Flex } from 'antd-mobile';

import Avatar from 'component/uikit/avatar';
import Shimmer from 'component/shimmer';

const header = ({ style, data, loading, onLinkPress }) => {
  const name = R.pathOr('--', ['name'])(data);
  const site_url = R.pathOr('', ['site_url'])(data);
  const logo = R.pathOr('', ['logo_url'])(data);
  const is_vip = R.path(['is_vip'])(data);
  const is_owned = R.path(['is_owned'])(data);
  const is_reachable = R.path(['is_reachable'])(data);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content.wrapper}>
        <View style={styles.content.container}>
          <Shimmer animating={loading}>
            <Text style={styles.content.title}>{name}</Text>
          </Shimmer>
          <Flex style={{ marginTop: 8 }}>
            {!!is_vip && (
              <Image
                source={require('asset/institution/institution_vip_detail.png')}
              />
            )}
            {!!is_owned && (
              <Image
                style={{ marginLeft: 5 }}
                source={require('asset/institution/is_owned_detail.png')}
              />
            )}
            {!!is_reachable && (
              <Image
                style={{ marginLeft: 4 }}
                source={require('asset/institution/reachable.png')}
              />
            )}
          </Flex>
          {!R.isEmpty(site_url) && (
            <Text
              style={styles.content.subtitle}
              onPress={() => onLinkPress(site_url)}
              numberOfLines={1}
            >
              {site_url}
            </Text>
          )}
        </View>
        <Avatar
          style={styles.avatar}
          size={54}
          source={{ uri: logo }}
          innerRatio={0.9}
          raised={false}
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    // height: 64,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  avatar: {
    borderRadius: 1,
  },
  content: {
    wrapper: {
      flexDirection: 'row',
      // alignItems: 'center',
    },
    container: {
      flex: 1,
      marginRight: 20,
      // justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 12,
      color: 'white',
      marginLeft: 2,
      marginTop: 8,
    },
  },
};

export default header;
