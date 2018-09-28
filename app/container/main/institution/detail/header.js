import React from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';

import Avatar from 'component/uikit/avatar';
import Shimmer from 'component/shimmer';
import { realBarHeight } from 'component/navBar';

const header = ({ style, data, loading }) => {
  const name = R.pathOr('--', ['name'])(data);
  const site_url = R.pathOr('--', ['site_url'])(data);
  const logo = R.pathOr('', ['logo_url'])(data);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content.container}>
        <Shimmer animating={loading}>
          <Text style={styles.content.title}>{name}</Text>
        </Shimmer>
        <Shimmer animating={loading} style={{ marginTop: 8 }}>
          <Text style={styles.content.subtitle}>{site_url}</Text>
        </Shimmer>
      </View>
      <Avatar size={50} source={{ uri: logo }} innerRatio={0.9} />
    </View>
  );
};

const styles = {
  container: {
    height: 129 - realBarHeight,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  content: {
    container: {
      flex: 1,
      marginRight: 20,
    },
    title: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 12,
      color: 'white',
    },
  },
};

export default header;
