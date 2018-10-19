import React from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';
import moment from 'moment';

import Touchable from 'component/uikit/touchable';
import common_styles from './style';

const item = ({ data, onAnnouncementItemPress }) => {
  const title = R.pathOr('--', ['title'])(data);
  const date = R.pathOr('--', ['push_at'])(data);
  const institution = R.pathOr('--', ['project_name'])(data);
  return (
    <Touchable key={data.id} onPress={() => onAnnouncementItemPress(data)}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.bottom.container}>
          <Text style={styles.bottom.subtitle}>
            {institution}
            {'   '}
            {moment(date * 1000).format('MM-DD')}
            {'   '}
            <Text style={{ color: '#1890FF' }}>查看公告详情</Text>
          </Text>
        </View>
      </View>
    </Touchable>
  );
};

const Announcement = ({
  announcement,
  onAnnouncementPress,
  onAnnouncementItemPress,
}) => {
  return (
    <View>
      {!R.isEmpty(announcement) &&
        R.pipe(
          R.take(3),
          R.map(r => item({ data: r, onAnnouncementItemPress })),
        )(announcement)}
      <Touchable onPress={onAnnouncementPress}>
        <View style={styles.button.container}>
          <Text style={styles.button.title}>查看全部上所公告</Text>
        </View>
      </Touchable>
    </View>
  );
};

const styles = {
  ...common_styles,
  container: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  bottom: {
    container: {
      marginTop: 10,
    },
    subtitle: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.45)',
    },
  },
  button: {
    container: {
      marginTop: 6,
      height: 40,
      backgroundColor: '#F8F8F8',
      borderRadius: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#1890FF',
    },
  },
};

export default Announcement;
