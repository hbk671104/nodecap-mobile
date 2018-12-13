import React from 'react';
import { View, Text, Image } from 'react-native';
import R from 'ramda';
import { Flex } from 'antd-mobile';

import Avatar from 'component/uikit/avatar';
import Shimmer from 'component/shimmer';

const header = ({ style, data, loading, onLinkPress }) => {
  const name = R.pathOr('--', ['title'])(data);
  const site_url = R.pathOr('', ['homepage'])(data);
  const logo = R.pathOr('', ['logo'])(data);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content.wrapper}>
        <View style={styles.content.container}>
          <Shimmer animating={loading}>
            <Text style={styles.content.title}>{name}</Text>
          </Shimmer>
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
      fontSize: 25,
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
