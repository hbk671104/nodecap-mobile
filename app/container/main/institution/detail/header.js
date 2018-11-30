import React from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';

import Avatar from 'component/uikit/avatar';
import Shimmer from 'component/shimmer';

const header = ({ style, data, loading, onLinkPress }) => {
  const name = R.pathOr('--', ['name'])(data);
  const site_url = R.pathOr('', ['site_url'])(data);
  const logo = R.pathOr('', ['logo_url'])(data);

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
        <Avatar size={50} source={{ uri: logo }} innerRatio={0.9} />
      </View>
    </View>
  );
};

const styles = {
  container: {
    height: 64,
    paddingHorizontal: 12,
  },
  content: {
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
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
