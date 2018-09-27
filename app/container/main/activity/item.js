import React from 'react';
import { View, Text, Image } from 'react-native';
import R from 'ramda';
import moment from 'moment';

import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';

const meetingItem = ({ data, onPress }) => {
  const pic_url = R.pathOr('', ['thumbnail_pic'])(data);
  const title = R.pathOr('', ['title'])(data);
  const address = R.pathOr('', ['address'])(data);
  const start_time = moment(R.pathOr('', ['start_time'])(data)).format(
    'MM月DD日',
  );
  const end_time = moment(R.pathOr('', ['end_time'])(data)).format('MM月DD日');
  return (
    <Touchable foreground onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: pic_url }} />
        <View style={styles.bottom.container}>
          <Text style={styles.bottom.title}>{title}</Text>
        </View>
        <View style={styles.bottom.subtitle.container}>
          <Text
            style={[styles.bottom.subtitle.text, { flex: 1 }]}
            numberOfLines={1}
          >
            <Icon name="pin" />
            {'  '}
            {address}
          </Text>
          <Text style={styles.bottom.subtitle.text}>
            {start_time}至{end_time}
          </Text>
        </View>
      </View>
    </Touchable>
  );
};

const styles = {
  container: {
    paddingHorizontal: 20,
  },
  image: {
    height: 150,
    borderRadius: 2,
  },
  bottom: {
    container: {
      marginTop: 9,
    },
    title: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.83)',
      fontWeight: 'bold',
      lineHeight: 20,
    },
    subtitle: {
      container: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      text: {
        fontSize: 11,
        color: 'rgba(0, 0, 0, 0.45)',
      },
    },
  },
};

export default meetingItem;
