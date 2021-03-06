import React from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';
import { hideRealMobile } from '../../../utils/utils';
import Avatar from 'component/uikit/avatar';
import Shimmer from 'component/shimmer';

const header = ({ style, data, loading, onLinkPress }) => {
  const name = R.pathOr('--', ['name'])(data);
  const orgInfo = R.pathOr([], ['orgInfo'])(data);
  const coinInfo = R.pathOr([], ['coinInfo'])(data);

  const logo = R.path(['profile_pic'])(data) || R.path(['avatar_url'])(data);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content.wrapper}>
        <View style={styles.content.container}>
          <Text style={styles.content.title}>{hideRealMobile(name)}</Text>
          <Text
            style={styles.content.subtitle}
          >
            {orgInfo.map((i, idx) => ((orgInfo.length - 1 === idx) && (!coinInfo.length) ? `${i.name} ${i.title}` : `${i.name} ${i.title} | `))}
            {coinInfo.map((i, idx) => ((coinInfo.length - 1 === idx) ? `${i.name} ${i.title}` : `${i.name} ${i.title} | `))}
          </Text>
        </View>
        <Avatar size={50} source={{ uri: logo }} innerRatio={0.9} />
      </View>
    </View>
  );
};

const styles = {
  container: {
    paddingHorizontal: 12,
    paddingBottom: 10,
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
