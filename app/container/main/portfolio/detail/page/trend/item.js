import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import R from 'ramda';
import moment from 'moment';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';

const notificationItem = ({ data: trend, onPress }) => {
  const title = R.pathOr('--', ['title'])(trend);
  const project_name = R.pathOr('--', ['project_name'])(trend);
  const type = R.pathOr('--', ['type'])(trend);
  const subtitle = R.pathOr('--', ['subtitle'])(trend);
  const push_at = R.pathOr('--', ['release_at'])(trend);

  return (
    <Touchable foreground onPress={onPress(trend.id)}>
      <View style={styles.container}>
        <View style={styles.content.container}>
          <View style={styles.content.top.container}>
            <View style={styles.content.top.title.container}>
              <Text style={styles.content.top.title.text} numberOfLines={2}>
                {title}
              </Text>
            </View>
            <Text style={styles.content.top.date}>
              {moment(push_at).format('MM-DD HH:ss')}
            </Text>
          </View>
          <View style={styles.content.tag.wrapper}>
            <View
              style={[
                styles.content.tag.container,
                { backgroundColor: '#FFE9D6' },
              ]}
            >
              <Text style={[styles.content.tag.title, { color: '#FF7600' }]}>
                {type}
              </Text>
            </View>
          </View>
          <View style={styles.content.subtitle.container}>
            <Text numberOfLines={2} style={styles.content.subtitle.text}>
              {subtitle}
            </Text>
          </View>
        </View>
      </View>
    </Touchable>
  );
};

const styles = {
  container: {
    paddingVertical: 12,
    paddingRight: 12,
    paddingLeft: 0,
    marginLeft: 22,
    flexDirection: 'row',
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1,
  },
  content: {
    container: {
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
